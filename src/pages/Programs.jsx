import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProgramModal from '../components/ProgramModal';
import { useCollection, useSetting } from '../hooks/useContent';
import '../styles/page-header.css';
import './Programs.css';
import './Impact.css';

export default function Programs() {
  const { items: programs }  = useCollection('programs');
  const { items: tiers }     = useCollection('program_tiers');
  const { items: stats }     = useCollection('impact_stats');
  const { value: quote }     = useSetting('impact_quote');
  const { value: feature }   = useSetting('impact_feature');
  const [selected, setSelected] = useState(null);

  return (
    <>
      <section className="page-title-section">
        <h1 className="page-title">What We Do</h1>
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span className="breadcrumb__star">✻</span>
          <span className="breadcrumb__current">Programs</span>
        </div>
        <p className="page-subtitle" style={{ maxWidth: 560 }}>
          Six focus areas, one goal: lasting dignity for every family we reach.
        </p>
      </section>

      {/* PROGRAM GRID */}
      <section className="programs-sec programs-grid-sec">
        <div className="programs-3">
          {programs.map((p) => (
            <div className="program-card" key={p.id ?? p.title}>
              <div className="program-card__img">
                <img src={p.image_url} alt={p.title} />
              </div>
              <div className="program-card__body">
                <span className="program-card__tag">{p.tag}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
                <button
                  className="program-card__more"
                  onClick={() => setSelected(p)}
                >
                  Learn more →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BECOME A HERO */}
      <section className="programs-sec programs-hero-sec">
        <div className="programs-hero">
          <span className="programs-hero__star">✻</span>
          <h2>Become a Hero</h2>
          <p>
            Your support powers every program. Give, volunteer, or partner with us to change a life
            today.
          </p>
          <div className="programs-hero4">
            {tiers.map((t) => (
              <div className="programs-hero4__item" key={t.id ?? t.amt}>
                <div className="programs-hero4__amt">{t.amt}</div>
                <div className="programs-hero4__label">{t.label}</div>
              </div>
            ))}
          </div>
          <Link to="/donate" className="btn btn--dark programs-hero__cta">
            Donate Now <span className="programs-hero__cta-star">✻</span>
          </Link>
        </div>
      </section>

      {/* IMPACT STATS */}
      <section className="impact-sec impact-stats-sec">
        <div className="impact-stats">
          {stats.map((s) => (
            <div className="impact-stat" key={s.id ?? s.label}>
              <div className="impact-stat__num">{s.num}</div>
              <div className="impact-stat__label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* IMPACT FEATURE */}
      <section className="impact-sec impact-feature-sec">
        <div className="impact-feature">
          <div className="impact-feature__img">
            <img src={feature.image_url} alt="Women's empowerment group" />
          </div>
          <div className="impact-feature__body">
            <span className="impact-feature__star">✻</span>
            <h2>{feature.heading}</h2>
            <p>{feature.text}</p>
            <Link to="/donate" className="impact-feature__cta">
              {feature.cta}
            </Link>
          </div>
        </div>
      </section>

      {/* PATRON QUOTE */}
      <section className="impact-sec impact-quote-sec">
        <div className="impact-quote">
          {quote.image_url && <img src={quote.image_url} alt="Royal patron" className="impact-quote__img" />}
          <div className="impact-quote__body">
            <p className="impact-quote__text">&ldquo;{quote.quote}&rdquo;</p>
            <p className="impact-quote__attr">
              {quote.attribution}
              <span>{quote.role}</span>
            </p>
          </div>
        </div>
      </section>

      {/* MODAL */}
      {selected && (
        <ProgramModal program={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
