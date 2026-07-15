import { Link } from 'react-router-dom';
import { useCollection } from '../hooks/useContent';
import DonateWidget from '../components/DonateWidget';
import '../styles/page-header.css';
import './Donate.css';

export default function Donate() {
  const { items: tiers } = useCollection('donate_tiers');

  return (
    <>
      <section className="page-title-section">
        <h1 className="page-title donate-title">Every Single Penny Matters</h1>
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span className="breadcrumb__star">✻</span>
          <span className="breadcrumb__current">Donate</span>
        </div>
      </section>

      <section className="donate-sec">
        <div className="donate-2">
          {/* LEFT: rationale */}
          <div>
            <span className="donate-kicker">
              <span className="donate-kicker__dash" /> Your Gift, Their Lifeline
            </span>
            <h2 className="donate-rationale__title">
              Give with intention — Zakat, Sadaqah or general giving.
            </h2>
            <p className="donate-rationale__p">
              Every contribution goes directly to feeding families, training women and educating
              children, with full accountability.
            </p>

            <div className="donate-tiers">
              {tiers.map((t) => (
                <div className="donate-tier" key={t.id ?? t.amount}>
                  <span>✻</span>
                  <p>
                    <strong>{t.amount}</strong> {t.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: widget */}
          <div className="donate-widget">
            <DonateWidget />
          </div>
        </div>
      </section>
    </>
  );
}
