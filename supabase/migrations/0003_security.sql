-- Security hardening
--   1. Writes require being on an explicit admin list — merely having a
--      Supabase account ("authenticated") is no longer enough, so public
--      signups can't grant site-edit access.
--   2. The uploads bucket gets file-type and size limits.
--   3. donation_receipts records each successful Paystack charge — used by the
--      paystack-webhook function both as a donation log and to de-duplicate
--      webhook retries/replays.

-- ---------------------------------------------------------------------------
-- 1a. Admin allow-list
-- ---------------------------------------------------------------------------
create table if not exists public.admin_users (
  email      text primary key,
  created_at timestamptz not null default now()
);

-- RLS on with no policies: nobody can read or edit the list through the API.
-- Manage it in the SQL editor / Studio (service role bypasses RLS).
alter table public.admin_users enable row level security;

insert into public.admin_users (email)
values ('belloy4606@gmail.com')
on conflict (email) do nothing;

-- security definer so the check works even though admin_users itself is locked
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_users
    where email = auth.jwt() ->> 'email'
  );
$$;

-- ---------------------------------------------------------------------------
-- 1b. Re-scope content write access: authenticated → admin allow-list
-- ---------------------------------------------------------------------------
drop policy if exists "content_items auth read all" on public.content_items;
create policy "content_items admin read all"
  on public.content_items for select
  to authenticated using (public.is_admin());

drop policy if exists "content_items auth write" on public.content_items;
create policy "content_items admin write"
  on public.content_items for all
  to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "site_settings auth write" on public.site_settings;
create policy "site_settings admin write"
  on public.site_settings for all
  to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "uploads auth write" on storage.objects;
create policy "uploads admin write"
  on storage.objects for insert
  to authenticated with check (bucket_id = 'uploads' and public.is_admin());

drop policy if exists "uploads auth delete" on storage.objects;
create policy "uploads admin delete"
  on storage.objects for delete
  to authenticated using (bucket_id = 'uploads' and public.is_admin());

-- ---------------------------------------------------------------------------
-- 2. Uploads bucket: 10 MB cap, images + common document types only
-- ---------------------------------------------------------------------------
update storage.buckets
set file_size_limit    = 10485760, -- 10 MB
    allowed_mime_types = array[
      'image/jpeg', 'image/png', 'image/webp', 'image/gif',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]
where id = 'uploads';

-- ---------------------------------------------------------------------------
-- 3. Donation log / webhook idempotency
-- ---------------------------------------------------------------------------
create table if not exists public.donation_receipts (
  reference   text primary key,          -- Paystack transaction reference
  email       text not null,
  amount      integer not null,          -- in kobo, as reported by Paystack
  designation text,
  paid_at     timestamptz,
  created_at  timestamptz not null default now()
);

alter table public.donation_receipts enable row level security;

-- Only admins may read the log (the webhook writes with the service role,
-- which bypasses RLS). No public access of any kind.
drop policy if exists "donation_receipts admin read" on public.donation_receipts;
create policy "donation_receipts admin read"
  on public.donation_receipts for select
  to authenticated using (public.is_admin());
