import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { COLLECTIONS, SETTINGS } from '../content/schema';

// Public-facing read hooks. Both gracefully fall back to the defaults defined
// in the content schema when Supabase is not configured, while loading, or
// when a collection/setting has no rows yet — so pages always render.

export function useCollection(key) {
  const fallback = COLLECTIONS[key]?.defaults ?? [];
  const [items, setItems] = useState(fallback);
  const [loading, setLoading] = useState(isSupabaseConfigured);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let active = true;

    (async () => {
      const { data, error } = await supabase
        .from('content_items')
        .select('id, data, sort_order')
        .eq('collection', key)
        .eq('is_published', true)
        .order('sort_order', { ascending: true });

      if (!active) return;
      if (error || !data || data.length === 0) {
        setItems(fallback); // keep the site populated on error / empty table
      } else {
        setItems(data.map((row) => ({ id: row.id, ...row.data })));
      }
      setLoading(false);
    })();

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return { items, loading };
}

export function useSetting(key) {
  const fallback = SETTINGS[key]?.defaults ?? {};
  const [value, setValue] = useState(fallback);
  const [loading, setLoading] = useState(isSupabaseConfigured);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let active = true;

    (async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', key)
        .maybeSingle();

      if (!active) return;
      if (error || !data) {
        setValue(fallback);
      } else {
        setValue({ ...fallback, ...data.value });
      }
      setLoading(false);
    })();

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return { value, loading };
}
