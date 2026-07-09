import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../assets/images/logo.jpeg';
import './Header.css';

const NAV_LINKS = [
  { label: 'About', to: '/about' },
  { label: 'Programs', to: '/programs' },
  { label: 'Get Involved', to: '/get-involved' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="aacf-header">
      <div className="aacf-header__bar">
        <Link to="/" className="aacf-header__brand" onClick={() => setOpen(false)}>
          <span className="aacf-header__logo">
            <img src={logo} alt="AACF" />
          </span>
          <span className="aacf-header__name">AACF</span>
        </Link>

        <nav className="aacf-header__nav aacf-header__desktop">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                isActive ? 'aacf-header__link aacf-header__link--active' : 'aacf-header__link'
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="aacf-header__desktop">
          <Link to="/donate" className="aacf-header__cta">
            Donate Now <span className="aacf-header__star">✻</span>
          </Link>
        </div>

        <button
          className="aacf-header__burger"
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="aacf-header__mobile">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                isActive
                  ? 'aacf-header__mobile-link aacf-header__mobile-link--active'
                  : 'aacf-header__mobile-link'
              }
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <Link to="/donate" className="aacf-header__mobile-cta" onClick={() => setOpen(false)}>
            Donate Now
          </Link>
        </div>
      )}
    </header>
  );
}
