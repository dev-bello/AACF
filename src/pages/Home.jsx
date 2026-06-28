import { Link } from 'react-router-dom';
import { useCollection, useSetting } from '../hooks/useContent';
import './Home.css';

export default function Home() {
  const { items: causes }   = useCollection('causes');
  const { items: partners } = useCollection('home_trust');
  const { value: hero }     = useSetting('home_hero');
  const { value: reach }    = useSetting('home_reach');
  const { value: mission }  = useSetting('home_mission');
  const { value: band }     = useSetting('home_impact_band');

  return (
    <>
      {/* HERO */}
      <section className="home-section home-hero-section">
        <div className="home-hero">
          <div>
            <span className="home-eyebrow">
              <span className="home-eyebrow__star">✻</span> {hero.eyebrow}
            </span>
            <h1 className="home-h1">{hero.heading}</h1>
            <p className="home-lede">{hero.lede}</p>
            <div className="home-hero__ctas">
              <Link to="/donate" className="btn btn--dark">
                {hero.cta_primary} <span className="home-eyebrow__star">✻</span>
              </Link>
              <Link to="/get-involved" className="btn btn--outline">
                {hero.cta_secondary}
              </Link>
            </div>
          </div>

          <div className="home-reach-card">
            <span className="home-reach-card__label">Our Reach So Far</span>
            <div className="home-reach-card__big">{reach.total}</div>
            <div className="home-reach-card__caption">{reach.caption}</div>
            <div className="home-reach-card__divider" />
            <div className="home-reach-card__stats">
              <div>
                <div className="home-reach-card__stat-num">{reach.food_packs}</div>
                <div className="home-reach-card__stat-label">Food packs</div>
              </div>
              <div>
                <div className="home-reach-card__stat-num">{reach.women_trained}</div>
                <div className="home-reach-card__stat-label">Women trained</div>
              </div>
              <div>
                <div className="home-reach-card__stat-num">{reach.communities}</div>
                <div className="home-reach-card__stat-label">Communities</div>
              </div>
            </div>
          </div>
        </div>

        <div className="home-trust">
          <span className="home-trust__label">Our partners &amp; supporters</span>
          {partners.map((p) => (
            <span key={p.id ?? p.name} className="home-trust__name">{p.name}</span>
          ))}
        </div>
      </section>

      {/* MISSION */}
      <section className="home-section home-mission-section">
        <div className="home-mission">
          <div>
            <span className="home-kicker">
              <span className="home-kicker__dash" /> Who We Are
            </span>
            <p className="home-mission__statement">{mission.statement}</p>
            <Link to="/about" className="home-mission__link">
              Read our story <span className="home-mission__arrow">→</span>
            </Link>
          </div>
          <div className="home-mission__card">
            <div className="home-mission__card-num">{mission.stat}</div>
            <p className="home-mission__card-text">{mission.stat_text}</p>
          </div>
        </div>
      </section>

      {/* DONATION CARDS */}
      <section className="home-section home-causes-section">
        <div className="home-causes__intro">
          <h2 className="home-h2">Your Donation Means Another Smile</h2>
          <p className="home-causes__sub">
            Choose a cause close to your heart. Every gift moves a family forward.
          </p>
        </div>
        <div className="home-causes">
          {causes.map((c) => (
            <div className="cause-card" key={c.id ?? c.title}>
              <div className="cause-card__img">
                <img src={c.image_url} alt={c.title} />
              </div>
              <div className="cause-card__body">
                <span className="cause-card__tag">{c.tag}</span>
                <h3 className="cause-card__title">{c.title}</h3>
                <div className="cause-card__progress-meta">
                  <span>Raised {c.raised}</span>
                  <span>{c.goal}</span>
                </div>
                <div className="cause-card__progress-track">
                  <div className="cause-card__progress-fill" style={{ width: c.pct }} />
                </div>
                <Link to="/donate" className="cause-card__cta">Donate Now</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DARK IMPACT BAND */}
      <section className="home-impact-band">
        <div className="home-section home-impact">
          <div className="home-impact__head">
            <h2 className="home-impact__title">
              Impactful <span className="home-impact__title-accent">Successes</span>
            </h2>
            <Link to="/programs" className="btn btn--mint">See Our Impact →</Link>
          </div>

          <div className="home-impact__grid">
            <div className="home-impact__photo">
              {band.image_url && <img src={band.image_url} alt="Relief distribution" />}
              <div className="home-impact__photo-overlay" />
              <div className="home-impact__photo-caption">
                <div className="home-impact__photo-num">{band.photo_num}</div>
                <p>{band.photo_caption}</p>
              </div>
            </div>
            <div className="home-impact__side">
              <div className="home-impact__stat-card">
                <div className="home-impact__stat-num">{band.stat1_num}</div>
                <p>{band.stat1_text}</p>
              </div>
              <div className="home-impact__stat-card">
                <div className="home-impact__stat-num">{band.stat2_num}</div>
                <p>{band.stat2_text}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
