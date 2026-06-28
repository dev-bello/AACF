-- AACF site content schema
-- Two tables back the entire CMS:
--   content_items  – repeating lists of cards (causes, programs, leaders, …)
--   site_settings  – singleton blocks of named fields (contact info, bank, …)

-- ---------------------------------------------------------------------------
-- Helper: keep updated_at current
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- content_items
-- ---------------------------------------------------------------------------
create table if not exists public.content_items (
  id           uuid primary key default gen_random_uuid(),
  collection   text not null,
  sort_order   integer not null default 0,
  data         jsonb not null default '{}'::jsonb,
  is_published boolean not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index if not exists content_items_collection_order_idx
  on public.content_items (collection, sort_order);

drop trigger if exists content_items_set_updated_at on public.content_items;
create trigger content_items_set_updated_at
  before update on public.content_items
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- site_settings
-- ---------------------------------------------------------------------------
create table if not exists public.site_settings (
  key        text primary key,
  value      jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

drop trigger if exists site_settings_set_updated_at on public.site_settings;
create trigger site_settings_set_updated_at
  before update on public.site_settings
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Row Level Security
--   - Anyone (anon) may READ published content -> the public site.
--   - Only authenticated users may write -> the admin.
-- ---------------------------------------------------------------------------
alter table public.content_items enable row level security;
alter table public.site_settings enable row level security;

drop policy if exists "content_items public read" on public.content_items;
create policy "content_items public read"
  on public.content_items for select
  using (is_published = true);

drop policy if exists "content_items auth read all" on public.content_items;
create policy "content_items auth read all"
  on public.content_items for select
  to authenticated using (true);

drop policy if exists "content_items auth write" on public.content_items;
create policy "content_items auth write"
  on public.content_items for all
  to authenticated using (true) with check (true);

drop policy if exists "site_settings public read" on public.site_settings;
create policy "site_settings public read"
  on public.site_settings for select
  using (true);

drop policy if exists "site_settings auth write" on public.site_settings;
create policy "site_settings auth write"
  on public.site_settings for all
  to authenticated using (true) with check (true);
