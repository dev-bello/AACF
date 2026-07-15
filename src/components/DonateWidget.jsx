import { useState } from 'react';
import { Lock, Check } from 'lucide-react';

const PRESETS = [5000, 10000, 25000, 50000, 100000, 250000];
const DESIGNATIONS = [
  'Where needed most',
  'Ramadan food relief',
  "Women's empowerment",
  'Orphan education',
  'Widows & vulnerable support',
  'Zakat',
];

function fmt(n) {
  n = Number(n) || 0;
  return '₦' + n.toLocaleString('en-NG');
}

// Loads the Paystack inline script once and resolves with PaystackPop.
function loadPaystack() {
  return new Promise((resolve, reject) => {
    if (window.PaystackPop) return resolve(window.PaystackPop);
    const s = document.createElement('script');
    s.src = 'https://js.paystack.co/v1/inline.js';
    s.async = true;
    s.onload = () => resolve(window.PaystackPop);
    s.onerror = () => reject(new Error('Failed to load Paystack.'));
    document.body.appendChild(s);
  });
}

// The reusable donation form. Used on the Donate page and inside the nav modal.
export default function DonateWidget({ onDone }) {
  const [amount, setAmount]   = useState(10000);
  const [custom, setCustom]   = useState('');
  const [desig, setDesig]     = useState('Where needed most');
  const [email, setEmail]     = useState('');
  const [donated, setDonated] = useState(false);
  const [busy, setBusy]       = useState(false);
  const [error, setError]     = useState('');

  const isCustom = custom !== '' && custom != null;
  const effAmount = isCustom
    ? (() => {
        const c = parseInt(String(custom).replace(/[^0-9]/g, ''), 10);
        return isNaN(c) ? 0 : c;
      })()
    : amount;
  const summaryText = `gift of ${fmt(effAmount)} toward ${desig}`;

  async function submit(e) {
    e.preventDefault();
    setError('');

    if (effAmount < 100) {
      setError('Please enter an amount of ₦100 or more.');
      return;
    }

    const key = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

    // No key configured yet — show the confirmation without charging.
    if (!key) {
      setDonated(true);
      return;
    }

    setBusy(true);
    try {
      const Paystack = await loadPaystack();
      const handler = Paystack.setup({
        key,
        email,
        amount: effAmount * 100, // Paystack expects the amount in kobo.
        currency: 'NGN',
        metadata: {
          custom_fields: [
            { display_name: 'Designation', variable_name: 'designation', value: desig },
          ],
        },
        callback: () => setDonated(true),
        onClose: () => setBusy(false),
      });
      handler.openIframe();
    } catch (err) {
      setError(err.message || 'Could not reach the payment gateway.');
      setBusy(false);
    }
  }

  function reset() {
    setDonated(false);
    setBusy(false);
    setError('');
  }

  if (donated) {
    return (
      <div className="donate-widget__done">
        <div className="donate-widget__check"><Check size={30} strokeWidth={3} /></div>
        <h3>Jazākallāhu Khayran!</h3>
        <p>
          Thank you for your generous <strong>{summaryText}</strong>. Your kindness will
          reach a family who needs it most.
        </p>
        <button type="button" onClick={reset} className="donate-widget__reset">
          Make another gift
        </button>
        {onDone && (
          <button type="button" onClick={onDone} className="donate-widget__reset donate-widget__reset--ghost">
            Close
          </button>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={submit}>
      <h3 className="donate-widget__heading">Choose your gift</h3>
      <p className="donate-widget__sub">Support the foundation in a way that suits you.</p>

      <label className="donate-label">Select an amount</label>
      <div className="donate-amts">
        {PRESETS.map((v) => {
          const active = !isCustom && amount === v;
          return (
            <button
              type="button"
              key={v}
              onClick={() => {
                setAmount(v);
                setCustom('');
              }}
              className={active ? 'donate-chip donate-chip--active' : 'donate-chip'}
            >
              {fmt(v)}
            </button>
          );
        })}
      </div>

      <div className="donate-custom">
        <span className="donate-custom__symbol">₦</span>
        <input
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          inputMode="numeric"
          placeholder="Other amount"
        />
      </div>

      <label className="donate-label">Direct my gift to</label>
      <select
        value={desig}
        onChange={(e) => setDesig(e.target.value)}
        className="donate-select"
      >
        {DESIGNATIONS.map((d) => (
          <option key={d}>{d}</option>
        ))}
      </select>

      <label className="donate-label">Your email (for your receipt)</label>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="donate-email"
      />

      <div className="donate-summary">
        <span>Your gift</span>
        <span className="donate-summary__amt">
          {fmt(effAmount)}
        </span>
      </div>

      {error && <p className="donate-error">{error}</p>}

      <button type="submit" className="donate-submit" disabled={busy}>
        {busy ? 'Processing…' : 'Proceed to Give →'}
      </button>
      <p className="donate-secure"><Lock size={13} /> Secure giving via Paystack · A receipt will be sent by email.</p>
    </form>
  );
}
