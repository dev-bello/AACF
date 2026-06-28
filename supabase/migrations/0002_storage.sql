-- Storage bucket for admin-uploaded files (program images, reports, etc.)
insert into storage.buckets (id, name, public)
values ('uploads', 'uploads', true)
on conflict (id) do nothing;

-- Anyone can read public objects
drop policy if exists "uploads public read" on storage.objects;
create policy "uploads public read"
  on storage.objects for select
  using (bucket_id = 'uploads');

-- Only authenticated users can upload / delete
drop policy if exists "uploads auth write" on storage.objects;
create policy "uploads auth write"
  on storage.objects for insert
  to authenticated with check (bucket_id = 'uploads');

drop policy if exists "uploads auth delete" on storage.objects;
create policy "uploads auth delete"
  on storage.objects for delete
  to authenticated using (bucket_id = 'uploads');
