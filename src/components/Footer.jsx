import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaCcPaypal, FaCcVisa, FaCcMastercard, FaBuildingColumns } from 'react-icons/fa6';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="aacf-footer">
      <div className="aacf-footer__bar">
        <div className="aacf-footer__top">
          <div>
            <h2 className="aacf-footer__heading">
              Make a
              <br />
              Kind World
            </h2>
            <Link to="/get-involved" className="aacf-footer__join">
              <span className="aacf-footer__join-icon">✻</span>
              Join the Movement
            </Link>
          </div>

          <div className="aacf-footer__cols">
            <div>
              <h4 className="aacf-footer__col-title">About Us</h4>
              <div className="aacf-footer__col-links">
                <Link to="/about">Our Mission</Link>
                <Link to="/about">Our Story</Link>
                <Link to="/programs">Impact Reports</Link>
                <Link to="/about">Leadership</Link>
              </div>
            </div>
            <div>
              <h4 className="aacf-footer__col-title">Resources</h4>
              <div className="aacf-footer__col-links">
                <Link to="/programs">Programs</Link>
                <Link to="/get-involved">Volunteer</Link>
                <Link to="/donate">Donate</Link>
                <Link to="/get-involved">Contact</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="aacf-footer__mid">
          <div className="aacf-footer__accept">
            <span className="aacf-footer__accept-label">We Accept</span>
            <span className="aacf-footer__pill" title="PayPal"><FaCcPaypal /></span>
            <span className="aacf-footer__pill" title="Visa"><FaCcVisa /></span>
            <span className="aacf-footer__pill" title="Mastercard"><FaCcMastercard /></span>
            <span className="aacf-footer__pill" title="Bank Transfer"><FaBuildingColumns /></span>
          </div>
          <div className="aacf-footer__social">
            <a href="#" className="aacf-footer__social-link" aria-label="Facebook"><FaFacebookF /></a>
            <a href="#" className="aacf-footer__social-link" aria-label="Instagram"><FaInstagram /></a>
            <Link to="/get-involved" className="aacf-footer__subscribe">Subscribe Newsletter</Link>
          </div>
        </div>

        <div className="aacf-footer__bottom">
          <span>© 2026 Aminatu Abdulkarim Charity Foundation. RC No. 175798.</span>
          <span className="aacf-footer__legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
            <a href="#">Refund Policy</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
