import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCollection, useSetting } from '../hooks/useContent';
import '../styles/page-header.css';
import './GetInvolved.css';
import './Contact.css';

export default function GetInvolved() {
  const { items: ways }    = useCollection('involvement_ways');
  const { value: info }    = useSetting('contact_info');
  const { value: content } = useSetting('get_involved_intro');
  const [sent, setSent]       = useState(false);
  const [msgSent, setMsgSent] = useState(false);

  function submit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <>
      <section className="page-title-section">
        <h1 className="page-title">{content.heading}</h1>
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span className="breadcrumb__star">✻</span>
          <span className="breadcrumb__current">Get Involved</span>
        </div>
        <p className="page-subtitle" style={{ maxWidth: 560 }}>
          {content.sub}
        </p>
      </section>

      {/* WAYS TO HELP */}
      <section className="involved-sec involved-ways-sec">
        <div className="involved-3">
          {ways.map((w) => (
            <div className="involved-way-card" key={w.id ?? w.title}>
              <div className="involved-way-card__icon">{w.icon}</div>
              <h3>{w.title}</h3>
              <p>{w.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* VOLUNTEER FORM */}
      <section className="involved-sec involved-form-sec">
        <div className="involved-form-intro">
          <h2>{content.form_heading}</h2>
          <p>{content.form_sub}</p>
        </div>

        <div className="involved-form-card">
          {sent ? (
            <div className="involved-form-sent">
              <div className="involved-form-sent__check">✓</div>
              <h3>Thank you for stepping up!</h3>
              <p>We&rsquo;ve received your details and will reach out shortly about upcoming opportunities.</p>
            </div>
          ) : (
            <form onSubmit={submit}>
              <div className="involved-names">
                <input required placeholder="First name" />
                <input required placeholder="Last name" />
              </div>
              <div className="involved-names involved-names--spaced">
                <input required type="email" placeholder="Email address" />
                <input placeholder="Phone number" />
              </div>
              <select className="involved-select" defaultValue="Food distribution">
                <option>I&rsquo;d like to help with… Food distribution</option>
                <option>Women&rsquo;s empowerment</option>
                <option>Education &amp; mentoring</option>
                <option>Fundraising &amp; events</option>
                <option>Wherever I&rsquo;m needed</option>
              </select>
              <textarea placeholder="A short message (optional)" rows={3} />
              <button type="submit" className="involved-submit">
                Submit Application
              </button>
            </form>
          )}
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact-sec contact-cards-sec">
        <div className="about-values__intro" style={{ paddingBottom: 0 }}>
          <h2>Get in Touch</h2>
          <p style={{ marginTop: 6, color: '#5c6b7a', fontSize: '15px' }}>
            Reach out to partner, volunteer, request assistance, or simply learn more about our work.
          </p>
        </div>
        <div className="contact-3" style={{ marginTop: 32 }}>
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

      <section className="contact-sec contact-form-sec">
        <div className="contact-form-card">
          {msgSent ? (
            <div className="contact-form-sent">
              <div className="contact-form-sent__check">✓</div>
              <h3>Message received</h3>
              <p>Thank you for reaching out. A member of our team will respond as soon as possible.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setMsgSent(true); }}>
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
