import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { SETTINGS } from '../content/schema';
import FormField from './FormField';

// Editor for a singleton settings group (one row in `site_settings`).
export default function SettingsEditor() {
  const { key } = useParams();
  const config = SETTINGS[key];
  if (!config) return <div className="admin-page">Unknown setting.</div>;
  return <Editor key={key} settingKey={key} config={config} />;
}

function Editor({ settingKey, config }) {
  const [values, setValues] = useState(() => config.defaults);
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let active = true;

    (async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', settingKey)
        .maybeSingle();

      if (!active) return;
      if (error) setStatus(error.message);
      setValues({ ...config.defaults, ...(data?.value ?? {}) });
      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [settingKey, config.defaults]);

  async function save(e) {
    e.preventDefault();
    if (!isSupabaseConfigured) {
      setStatus('Connect Supabase to save changes.');
      return;
    }
    setStatus('Saving…');
    const value = Object.fromEntries(config.fields.map((f) => [f.name, values[f.name] ?? '']));
    const { error } = await supabase
      .from('site_settings')
      .upsert({ key: settingKey, value }, { onConflict: 'key' });
    setStatus(error ? error.message : 'Saved.');
  }

  if (loading) return <div className="admin-page admin-loading">Loading…</div>;

  return (
    <div className="admin-page">
      <header className="admin-page__head">
        <h1>{config.label}</h1>
      </header>

      {status && <div className="admin-status">{status}</div>}

      <form className="admin-form" onSubmit={save}>
        {config.fields.map((field) => (
          <FormField
            key={field.name}
            field={field}
            value={values[field.name]}
            onChange={(val) => setValues((p) => ({ ...p, [field.name]: val }))}
          />
        ))}
        <div className="admin-form__actions">
          <button type="submit" className="admin-btn admin-btn--primary">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
