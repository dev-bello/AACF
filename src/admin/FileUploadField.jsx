import { useRef, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

async function uploadFile(file, folder = 'images') {
  const ext  = file.name.split('.').pop();
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await supabase.storage.from('uploads').upload(path, file);
  if (error) throw error;
  const { data } = supabase.storage.from('uploads').getPublicUrl(path);
  return data.publicUrl;
}

// Single image field — URL input + optional upload
export function ImageUploadField({ field, value, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const ref = useRef();

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!isSupabaseConfigured) { setError('Connect Supabase to upload files.'); return; }
    setUploading(true);
    setError('');
    try {
      const url = await uploadFile(file, 'images');
      onChange(url);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <label className="admin-field">
      <span>{field.label}</span>
      <div className="admin-imagefield">
        <input
          type="text"
          placeholder="https://… or upload below"
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
        />
        <div className="admin-upload-row">
          <button type="button" className="admin-btn admin-btn--ghost"
            onClick={() => ref.current?.click()} disabled={uploading}>
            {uploading ? 'Uploading…' : '↑ Upload image'}
          </button>
          <input ref={ref} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFile} />
        </div>
        {error && <div className="admin-error">{error}</div>}
        {value && <img className="admin-imagefield__preview" src={value} alt="" />}
      </div>
    </label>
  );
}

// Multiple images field — uploads and stores an array of URLs
export function ImagesUploadField({ field, value, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const ref = useRef();
  const urls = Array.isArray(value) ? value : [];

  async function handleFiles(e) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    if (!isSupabaseConfigured) { setError('Connect Supabase to upload files.'); return; }
    setUploading(true);
    setError('');
    try {
      const newUrls = await Promise.all(files.map((f) => uploadFile(f, 'images')));
      onChange([...urls, ...newUrls]);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  }

  function remove(i) {
    onChange(urls.filter((_, idx) => idx !== i));
  }

  return (
    <div className="admin-field">
      <span>{field.label}</span>
      {urls.length > 0 && (
        <div className="admin-imglist">
          {urls.map((url, i) => (
            <div key={i} className="admin-imglist__item">
              <img src={url} alt="" className="admin-imglist__thumb" />
              <button type="button" className="admin-imglist__remove" onClick={() => remove(i)}>✕</button>
            </div>
          ))}
        </div>
      )}
      <div className="admin-upload-row">
        <button type="button" className="admin-btn admin-btn--ghost"
          onClick={() => ref.current?.click()} disabled={uploading}>
          {uploading ? 'Uploading…' : '↑ Upload images'}
        </button>
        <input ref={ref} type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={handleFiles} />
      </div>
      {error && <div className="admin-error">{error}</div>}
    </div>
  );
}

// Reports/documents field — [{name, url}] list
export function ReportsField({ field, value, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const ref = useRef();
  const items = Array.isArray(value) ? value : [];

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!isSupabaseConfigured) { setError('Connect Supabase to upload files.'); return; }
    setUploading(true);
    setError('');
    try {
      const path = `reports/${Date.now()}-${file.name}`;
      const { error: upErr } = await supabase.storage.from('uploads').upload(path, file);
      if (upErr) throw upErr;
      const { data } = supabase.storage.from('uploads').getPublicUrl(path);
      onChange([...items, { name: file.name, url: data.publicUrl }]);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  }

  return (
    <div className="admin-field">
      <span>{field.label}</span>
      {items.length > 0 && (
        <ul className="admin-reports-list">
          {items.map((r, i) => (
            <li key={i} className="admin-reports-item">
              <span className="admin-reports-icon">📄</span>
              <input className="admin-reports-name" value={r.name}
                onChange={(e) => onChange(items.map((x, j) => j === i ? { ...x, name: e.target.value } : x))}
                placeholder="Report name" />
              <a href={r.url} target="_blank" rel="noreferrer"
                className="admin-btn admin-btn--ghost" style={{ padding: '6px 10px', fontSize: 12 }}>View</a>
              <button type="button" className="admin-btn admin-btn--danger"
                style={{ padding: '6px 10px', fontSize: 12 }}
                onClick={() => onChange(items.filter((_, j) => j !== i))}>✕</button>
            </li>
          ))}
        </ul>
      )}
      <div className="admin-upload-row">
        <button type="button" className="admin-btn admin-btn--ghost"
          onClick={() => ref.current?.click()} disabled={uploading}>
          {uploading ? 'Uploading…' : '↑ Upload report / document'}
        </button>
        <input ref={ref} type="file" style={{ display: 'none' }} onChange={handleFile} />
      </div>
      {error && <div className="admin-error">{error}</div>}
    </div>
  );
}
