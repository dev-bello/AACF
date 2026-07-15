import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../assets/images/logo.jpeg';
import DonateModal from './DonateModal';
import './Header.css';

const NAV_LINKS = [
  { label: 'About', to: '/about' },
  { label: 'Programs', to: '/programs' },
  { label: 'Get Involved', to: '/get-involved' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [donateOpen, setDonateOpen] = useState(false);
  const onDonatePage = useLocation().pathname === '/donate';

  // On the Donate page the widget is already on screen, so scroll to it
  // instead of opening the modal. Elsewhere, open the modal.
  function handleDonate() {
    setOpen(false);
    if (onDonatePage) {
      document.querySelector('.donate-widget')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      setDonateOpen(true);
    }
  }

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
          <button type="button" className="aacf-header__cta" onClick={handleDonate}>
            Donate Now <span className="aacf-header__star">✻</span>
          </button>
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
          <button
            type="button"
            className="aacf-header__mobile-cta"
            onClick={handleDonate}
          >
            Donate Now
          </button>
        </div>
      )}

      {donateOpen && !onDonatePage && <DonateModal onClose={() => setDonateOpen(false)} />}
    </header>
  );
}
