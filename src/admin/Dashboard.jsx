import { Link } from 'react-router-dom';
import { COLLECTIONS, SETTINGS } from '../content/schema';
import { isSupabaseConfigured } from '../lib/supabase';

export default function Dashboard() {
  return (
    <div className="admin-page">
      <header className="admin-page__head">
        <h1>Dashboard</h1>
        <p>Manage every editable section of the foundation website.</p>
      </header>

      {!isSupabaseConfigured && (
        <div className="admin-banner">
          You’re viewing default content. Connect Supabase (see <code>supabase/README.md</code>) to
          start saving changes.
        </div>
      )}

      <section className="admin-cards">
        <h2 className="admin-cards__title">Collections</h2>
        <div className="admin-cards__grid">
          {Object.entries(COLLECTIONS).map(([key, cfg]) => (
            <Link key={key} to={`/admin/collections/${key}`} className="admin-card">
              <span className="admin-card__label">{cfg.label}</span>
              <span className="admin-card__desc">{cfg.description}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="admin-cards">
        <h2 className="admin-cards__title">Settings</h2>
        <div className="admin-cards__grid">
          {Object.entries(SETTINGS).map(([key, cfg]) => (
            <Link key={key} to={`/admin/settings/${key}`} className="admin-card">
              <span className="admin-card__label">{cfg.label}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
