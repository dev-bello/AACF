import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { COLLECTIONS, SETTINGS } from '../content/schema';
import './admin.css';

export default function AdminLayout() {
  const { session, signOut } = useAuth();
  const navigate = useNavigate();

  async function handleSignOut() {
    await signOut();
    navigate('/admin/login');
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">AACF Admin</div>

        <nav className="admin-nav">
          <NavLink to="/admin" end className="admin-nav__link">
            Dashboard
          </NavLink>

          <div className="admin-nav__group">Collections</div>
          {Object.entries(COLLECTIONS).map(([key, cfg]) => (
            <NavLink key={key} to={`/admin/collections/${key}`} className="admin-nav__link">
              {cfg.label}
            </NavLink>
          ))}

          <div className="admin-nav__group">Settings</div>
          {Object.entries(SETTINGS).map(([key, cfg]) => (
            <NavLink key={key} to={`/admin/settings/${key}`} className="admin-nav__link">
              {cfg.label}
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar__footer">
          <a href="/" className="admin-nav__link" target="_blank" rel="noreferrer">
            View site ↗
          </a>
          <div className="admin-user">{session?.user?.email}</div>
          <button className="admin-btn admin-btn--ghost" onClick={handleSignOut}>
            Sign out
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
