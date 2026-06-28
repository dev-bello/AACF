import { createClient } from '@supabase/supabase-js';

// Supabase is wired in via env vars. Until both are present (e.g. in a local
// `.env` file — see .env.example), `supabase` is null and the app falls back
// to the bundled default content. This lets the site run today and "light up"
// the moment the database is connected.

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(url && anonKey);

export const supabase = isSupabaseConfigured
  ? createClient(url, anonKey, {
      auth: { persistSession: true, autoRefreshToken: true },
    })
  : null;
