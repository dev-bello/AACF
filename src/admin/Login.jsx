import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { isSupabaseConfigured } from '../lib/supabase';

export default function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError('');
    setBusy(true);
    const { error } = await signIn(email, password);
    setBusy(false);
    if (error) {
      setError(error.message);
    } else {
      navigate('/admin');
    }
  }

  return (
    <div className="admin-auth">
      <form className="admin-auth__card" onSubmit={submit}>
        <h1 className="admin-auth__title">AACF Admin</h1>
        <p className="admin-auth__sub">Sign in to manage site content.</p>

        {!isSupabaseConfigured && (
          <div className="admin-banner">
            Supabase isn’t configured yet. Add <code>VITE_SUPABASE_URL</code> and{' '}
            <code>VITE_SUPABASE_ANON_KEY</code> to a <code>.env</code> file, then create an admin
            user in Supabase Auth.
          </div>
        )}

        <label className="admin-field">
          <span>Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </label>

        <label className="admin-field">
          <span>Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </label>

        {error && <div className="admin-error">{error}</div>}

        <button className="admin-btn admin-btn--primary" type="submit" disabled={busy}>
          {busy ? 'Signing in…' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}
