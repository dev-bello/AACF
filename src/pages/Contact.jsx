import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSetting } from '../hooks/useContent';
import '../styles/page-header.css';
import './Contact.css';

export default function Contact() {
  const { value: info } = useSetting('contact_info');
  const [sent, setSent] = useState(false);

  function submit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <>
      <section className="page-title-section">
        <h1 className="page-title">Get in Touch</h1>
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span className="breadcrumb__star">✻</span>
          <span className="breadcrumb__current">Contact</span>
        </div>
        <p className="page-subtitle">
          Reach out to partner, volunteer, request assistance, or simply learn more about our work.
        </p>
      </section>

      {/* CONTACT CARDS */}
      <section className="contact-sec contact-cards-sec">
        <div className="contact-3">
          <div className="contact-card contact-card--mint">
            <div className="contact-card__icon">✆</div>
            <h3>Call Us</h3>
            <p>
              {info.phone}
              <br />
              {info.hours}
            </p>
          </div>
          <div className="contact-card">
            <div className="contact-card__icon">✉</div>
            <h3>Email Us</h3>
            <p>
              {info.email1}
              <br />
              {info.email2}
            </p>
          </div>
          <div className="contact-card">
            <div className="contact-card__icon">📍</div>
            <h3>Visit Us</h3>
            <p>{info.address}</p>
          </div>
        </div>
      </section>

      {/* FORM */}
      <section className="contact-sec contact-form-sec">
        <div className="contact-form-card">
          {sent ? (
            <div className="contact-form-sent">
              <div className="contact-form-sent__check">✓</div>
              <h3>Message received</h3>
              <p>Thank you for reaching out. A member of our team will respond as soon as possible.</p>
            </div>
          ) : (
            <form onSubmit={submit}>
              <h3 className="contact-form-heading">Send a message</h3>
              <div className="contact-names">
                <input required placeholder="First name" />
                <input required placeholder="Last name" />
              </div>
              <div className="contact-names contact-names--spaced">
                <input required type="email" placeholder="Email address" />
                <input placeholder="Phone number" />
              </div>
              <textarea required placeholder="How can we help?" rows={4} />
              <button type="submit" className="contact-submit">
                Submit
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
