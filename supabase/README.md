# Supabase setup

The site reads its content from Supabase but ships with bundled defaults, so it
runs fully before any database exists. Follow these steps to connect the DB and
enable the admin CRUD at `/admin`.

## 1. Create a project

Create a project at [supabase.com](https://supabase.com). From **Project
Settings → API**, copy the **Project URL** and the **anon public** key.

## 2. Configure the app

```bash
cp .env.example .env
```

Fill in `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`, then restart `npm run dev`.

## 3. Run the migrations

Apply the schema, then (optionally) the seed:

```bash
# Using the Supabase CLI (recommended)
supabase db push                      # applies supabase/migrations/*
psql "$DATABASE_URL" -f supabase/seed.sql   # optional starter content
```

Or paste the contents of `supabase/migrations/0001_init.sql` and
`supabase/seed.sql` into the project's **SQL Editor** and run them.

## 4. Create an admin user

In **Authentication → Users**, click **Add user** and set an email + password.
Sign in with those credentials at `/admin/login`.

> Row Level Security is on: anyone can **read** published content (the public
> site), but only **authenticated** users can write (the admin). Anyone you add
> in Supabase Auth becomes a content editor — there is no public sign-up.

## Schema overview

| Table            | Purpose                                                        |
| ---------------- | ------------------------------------------------------------- |
| `content_items`  | Repeating lists of cards. One row per item. `collection` names the list (`causes`, `programs`, `leaders`, …); `data` holds the fields as JSON; `sort_order` controls order; `is_published` hides drafts. |
| `site_settings`  | Singleton blocks of named fields (`contact_info`, `donate_bank`, …). `key` is the group; `value` holds the fields as JSON. |

The editable sections, their fields, and the defaults all live in
`src/content/schema.js` — add a collection or setting there and it appears in
the admin automatically.

## Images

Seed rows point at `/images/*` (from the app's `public/` folder). For
admin-uploaded images, create a public Storage bucket and paste the file's
public URL into the image field.
