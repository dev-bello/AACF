// Supabase Edge Function: Paystack webhook → donation receipt via Resend.
//
// Paystack calls this endpoint server-to-server whenever a charge succeeds.
// We (1) verify the request really came from Paystack by checking the HMAC
// signature, (2) pull the donor's details out of the event, and (3) send a
// thank-you / receipt email with Resend. Because it's driven by Paystack's
// webhook (not the browser), the email is sent even if the donor closes the tab.
//
// Required function secrets (set with `supabase secrets set …`):
//   PAYSTACK_SECRET_KEY   your sk_live_… / sk_test_… key
//   RESEND_API_KEY        your re_… key
//   DONATION_FROM_EMAIL   verified sender, e.g. "AACF <giving@your-domain.org>"
//                         (optional — falls back to Resend's test sender)

import { createHmac } from 'node:crypto';

const PAYSTACK_SECRET = Deno.env.get('PAYSTACK_SECRET_KEY') ?? '';
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') ?? '';
const FROM_EMAIL = Deno.env.get('DONATION_FROM_EMAIL') ?? 'AACF <onboarding@resend.dev>';

// Auto-injected into every Edge Function by Supabase — no manual secrets needed.
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? '';
const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

const dbHeaders = {
  apikey: SERVICE_KEY,
  Authorization: `Bearer ${SERVICE_KEY}`,
  'Content-Type': 'application/json',
};

// Claim this reference in donation_receipts. Returns 'claimed' if we're first,
// 'duplicate' if a retry/replay already handled it, 'unavailable' if the table
// couldn't be reached (we still send the email — better twice than never).
async function claimReference(row: {
  reference: string; email: string; amount: number; designation: string; paid_at?: string;
}): Promise<'claimed' | 'duplicate' | 'unavailable'> {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/donation_receipts`, {
      method: 'POST',
      headers: { ...dbHeaders, Prefer: 'resolution=ignore-duplicates,return=representation' },
      body: JSON.stringify(row),
    });
    if (!res.ok) {
      console.error('claim failed:', res.status, await res.text());
      return 'unavailable';
    }
    const inserted = await res.json();
    return Array.isArray(inserted) && inserted.length === 0 ? 'duplicate' : 'claimed';
  } catch (err) {
    console.error('claim error:', err);
    return 'unavailable';
  }
}

// Release a claim so Paystack's retry can attempt the email again.
async function releaseReference(reference: string) {
  try {
    await fetch(
      `${SUPABASE_URL}/rest/v1/donation_receipts?reference=eq.${encodeURIComponent(reference)}`,
      { method: 'DELETE', headers: dbHeaders },
    );
  } catch (err) {
    console.error('release error:', err);
  }
}

// All event fields that end up in the email pass through here — customer name
// and metadata are client-controlled, so unescaped values would let an attacker
// inject arbitrary HTML (phishing) into mail sent from our address.
const esc = (v: unknown) =>
  String(v ?? '').replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string),
  );

const naira = (kobo: number) =>
  new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 })
    .format((kobo ?? 0) / 100);

function receiptHtml(rawName: string, amount: string, rawDesignation: string, rawReference: string) {
  const name = esc(rawName);
  const designation = esc(rawDesignation);
  const reference = esc(rawReference);
  return `
  <div style="font-family:system-ui,-apple-system,sans-serif;max-width:520px;margin:0 auto;color:#1c2430">
    <h2 style="color:#2a7d6f;margin:0 0 4px">Jazākallāhu Khayran, ${name}!</h2>
    <p style="margin:0 0 16px;color:#5c6b7a">Thank you for your generous gift to the Aminatu Abdulkarim Charity Foundation.</p>
    <table style="width:100%;border-collapse:collapse;background:#f4f5f7;border-radius:10px;overflow:hidden">
      <tr><td style="padding:12px 16px;color:#5c6b7a">Amount</td><td style="padding:12px 16px;text-align:right;font-weight:700">${amount}</td></tr>
      <tr><td style="padding:12px 16px;color:#5c6b7a">Directed to</td><td style="padding:12px 16px;text-align:right">${designation}</td></tr>
      <tr><td style="padding:12px 16px;color:#5c6b7a">Reference</td><td style="padding:12px 16px;text-align:right;font-family:monospace">${reference}</td></tr>
    </table>
    <p style="margin:16px 0 0;color:#5c6b7a">Your kindness reaches a family who needs it most. This email is your receipt.</p>
  </div>`;
}

Deno.serve(async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  // Read the RAW body — the signature is computed over the exact bytes Paystack sent.
  const raw = await req.text();

  // 1. Verify the signature: HMAC-SHA512 of the body, keyed with your secret key.
  const signature = req.headers.get('x-paystack-signature');
  const expected = createHmac('sha512', PAYSTACK_SECRET).update(raw).digest('hex');
  if (!signature || signature !== expected) {
    return new Response('Invalid signature', { status: 401 });
  }

  const event = JSON.parse(raw);

  // 2. Only act on successful charges; acknowledge everything else with 200.
  if (event?.event !== 'charge.success') {
    return new Response('ignored', { status: 200 });
  }

  const data = event.data ?? {};
  const email = data.customer?.email;
  const name = data.customer?.first_name || (email ? email.split('@')[0] : 'Friend');
  const designation =
    data.metadata?.custom_fields?.find((f: { variable_name: string }) => f.variable_name === 'designation')?.value ??
    'where needed most';

  if (!email) return new Response('no customer email', { status: 200 });

  // 3. Log the donation and de-duplicate: Paystack retries webhooks, and a
  //    valid signature can be replayed — only the first claim sends an email.
  const claim = await claimReference({
    reference: data.reference,
    email,
    amount: data.amount ?? 0,
    designation,
    paid_at: data.paid_at,
  });
  if (claim === 'duplicate') {
    return new Response('already processed', { status: 200 });
  }

  // 4. Send the receipt via Resend.
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: email,
      subject: 'Thank you for your donation — Aminatu Abdulkarim Charity Foundation',
      html: receiptHtml(name, naira(data.amount), designation, data.reference),
    }),
  });

  if (!res.ok) {
    console.error('Resend error:', res.status, await res.text());
    // Release the claim and return 500 so Paystack's retry can try again.
    if (claim === 'claimed') await releaseReference(data.reference);
    return new Response('email send failed', { status: 500 });
  }

  return new Response('ok', { status: 200 });
});
