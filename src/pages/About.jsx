import { Link } from 'react-router-dom';
import { ContentIcon } from '../lib/icons';
import { useCollection, useSetting } from '../hooks/useContent';
import '../styles/page-header.css';
import './About.css';
import './Leadership.css';

export default function About() {
  const { items: values }  = useCollection('about_values');
  const { items: results } = useCollection('about_stats');
  const { items: leaders } = useCollection('leaders');
  const { value: intro }   = useSetting('about_intro');
  const { value: vm }      = useSetting('about_vm');
  const { value: gov }     = useSetting('about_governance');

  return (
    <>
      <section className="page-title-section">
        <h1 className="page-title">Dedicated to Change</h1>
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span className="breadcrumb__star">✻</span>
          <span className="breadcrumb__current">About</span>
        </div>
      </section>

      {/* INTRO */}
      <section className="about-sec about-intro">
        <div className="about-2">
          <div className="about-intro__img">
            <img src={intro.image_url} alt="Founder Aminatu Abdulkarim" />
          </div>
          <div>
            <span className="about-kicker">
              <span className="about-kicker__dash" /> Our Story
            </span>
            <h2 className="about-intro__title">{intro.title}</h2>
            <p className="about-intro__p">{intro.para1}</p>
            <p className="about-intro__p">{intro.para2}</p>
          </div>
        </div>
      </section>

      {/* VISION / MISSION */}
      <section className="about-sec about-vm-sec">
        <div className="about-2 about-vm">
          <div className="about-vm__card about-vm__card--vision">
            <span className="about-vm__star">✻</span>
            <h3>Our Vision</h3>
            <p>{vm.vision}</p>
          </div>
          <div className="about-vm__card about-vm__card--mission">
            <span className="about-vm__star">✻</span>
            <h3>Our Mission</h3>
            <p>{vm.mission}</p>
          </div>
        </div>
      </section>

      {/* TANGIBLE RESULTS */}
      <section className="about-sec about-results-sec">
        <div className="about-results">
          <div className="about-results__head">
            <h2>Tangible Results</h2>
            <span>Measured impact, community by community.</span>
          </div>
          <div className="about-stats3">
            {results.map((s) => (
              <div className="about-stat-card" key={s.id ?? s.label}>
                <div className="about-stat-card__num">{s.num}</div>
                <div className="about-stat-card__label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="about-sec about-values-sec">
        <div className="about-values__intro">
          <h2>The Values That Guide Us</h2>
        </div>
        <div className="about-vals">
          {values.map((v) => (
            <div className="about-val-card" key={v.id ?? v.title}>
              <div className="about-val-card__icon"><ContentIcon name={v.icon} size={20} /></div>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="about-sec leadership-sec leadership-grid-sec">
        <div className="about-values__intro">
          <h2>Leadership &amp; Governance</h2>
          <p style={{ marginTop: 6, color: '#5c6b7a', fontSize: '15px' }}>
            A registered foundation (RC No. 175798) led with transparency, faith and accountability.
          </p>
        </div>
        <div className="leadership-3">
          {leaders.map((m) => (
            <div className="leader-card" key={m.id ?? m.name}>
              <div className="leader-card__img">
                <img src={m.image_url} alt={m.name} />
              </div>
              <div className="leader-card__body">
                <h3>{m.name}</h3>
                <span>{m.role}</span>
                <p>{m.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="about-sec leadership-sec leadership-note-sec">
        <div className="leadership-note">
          <span className="leadership-note__star">✻</span>
          <p>{gov.text}</p>
        </div>
      </section>
    </>
  );
}
