import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { COLLECTIONS } from '../content/schema';
import FormField from './FormField';

// Generic create/read/update/delete editor for any collection in the schema.
// One component drives every list of cards on the site. The outer component
// re-keys the inner Editor on `key` so its state resets cleanly between
// collections.
export default function CollectionEditor() {
  const { key } = useParams();
  const config = COLLECTIONS[key];
  if (!config) return <div className="admin-page">Unknown collection.</div>;
  return <Editor key={key} collectionKey={key} config={config} />;
}

function Editor({ collectionKey, config }) {
  const [items, setItems] = useState(() =>
    // Without a database, show the schema defaults read-only.
    isSupabaseConfigured
      ? []
      : config.defaults.map((d, i) => ({ id: `default-${i}`, ...d, _readonly: true })),
  );
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [editing, setEditing] = useState(null); // { id?, ...fields }
  const [status, setStatus] = useState('');
  const [reload, setReload] = useState(0);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let active = true;

    (async () => {
      const { data, error } = await supabase
        .from('content_items')
        .select('id, data, sort_order')
        .eq('collection', collectionKey)
        .order('sort_order', { ascending: true });

      if (!active) return;
      if (error) setStatus(error.message);
      setItems((data ?? []).map((r) => ({ id: r.id, sort_order: r.sort_order, ...r.data })));
      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [collectionKey, reload]);

  const refresh = () => setReload((n) => n + 1);

  function startCreate() {
    setEditing(Object.fromEntries(config.fields.map((f) => [f.name, ''])));
  }

  async function save(e) {
    e.preventDefault();
    if (!isSupabaseConfigured) {
      setStatus('Connect Supabase to save changes.');
      return;
    }
    setStatus('Saving…');

    const data = Object.fromEntries(config.fields.map((f) => [f.name, editing[f.name] ?? '']));

    if (editing.id) {
      const { error } = await supabase.from('content_items').update({ data }).eq('id', editing.id);
      if (error) return setStatus(error.message);
    } else {
      const nextOrder = items.length ? Math.max(...items.map((i) => i.sort_order ?? 0)) + 1 : 0;
      const { error } = await supabase
        .from('content_items')
        .insert({ collection: collectionKey, data, sort_order: nextOrder });
      if (error) return setStatus(error.message);
    }

    setEditing(null);
    setStatus('Saved.');
    refresh();
  }

  async function remove(item) {
    if (!isSupabaseConfigured) return;
    if (!confirm('Delete this item?')) return;
    const { error } = await supabase.from('content_items').delete().eq('id', item.id);
    if (error) return setStatus(error.message);
    refresh();
  }

  async function move(item, dir) {
    const idx = items.findIndex((i) => i.id === item.id);
    const swapWith = items[idx + dir];
    if (!swapWith || !isSupabaseConfigured) return;
    await Promise.all([
      supabase.from('content_items').update({ sort_order: swapWith.sort_order }).eq('id', item.id),
      supabase.from('content_items').update({ sort_order: item.sort_order }).eq('id', swapWith.id),
    ]);
    refresh();
  }

  const titleField = config.fields[0]?.name;
  const secondField = config.fields[1]?.name;

  return (
    <div className="admin-page">
      <header className="admin-page__head">
        <div>
          <h1>{config.label}</h1>
          <p>{config.description}</p>
        </div>
        {!editing && (
          <button className="admin-btn admin-btn--primary" onClick={startCreate}>
            + Add new
          </button>
        )}
      </header>

      {status && <div className="admin-status">{status}</div>}

      {editing ? (
        <form className="admin-form" onSubmit={save}>
          <h2>{editing.id ? 'Edit item' : 'New item'}</h2>
          {config.fields.map((field) => (
            <FormField
              key={field.name}
              field={field}
              value={editing[field.name]}
              onChange={(val) => setEditing((p) => ({ ...p, [field.name]: val }))}
            />
          ))}
          <div className="admin-form__actions">
            <button type="submit" className="admin-btn admin-btn--primary">
              Save
            </button>
            <button
              type="button"
              className="admin-btn admin-btn--ghost"
              onClick={() => setEditing(null)}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : loading ? (
        <div className="admin-loading">Loading…</div>
      ) : items.length === 0 ? (
        <p className="admin-empty">No items yet. Click “Add new” to create one.</p>
      ) : (
        <ul className="admin-list">
          {items.map((item, idx) => (
            <li key={item.id} className="admin-list__row">
              <div className="admin-list__main">
                <span className="admin-list__title">{item[titleField] || '(untitled)'}</span>
                {secondField && <span className="admin-list__sub">{item[secondField]}</span>}
              </div>
              {item._readonly ? (
                <span className="admin-list__badge">default</span>
              ) : (
                <div className="admin-list__actions">
                  <button
                    className="admin-btn admin-btn--icon"
                    disabled={idx === 0}
                    onClick={() => move(item, -1)}
                  >
                    ↑
                  </button>
                  <button
                    className="admin-btn admin-btn--icon"
                    disabled={idx === items.length - 1}
                    onClick={() => move(item, 1)}
                  >
                    ↓
                  </button>
                  <button className="admin-btn admin-btn--ghost" onClick={() => setEditing({ ...item })}>
                    Edit
                  </button>
                  <button className="admin-btn admin-btn--danger" onClick={() => remove(item)}>
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
