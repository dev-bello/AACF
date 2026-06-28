import { Link } from 'react-router-dom';
import womenGroup from '../assets/images/women-group.jpeg';
import patronEmir from '../assets/images/patron-emir.jpeg';
import { useCollection, useSetting } from '../hooks/useContent';
import '../styles/page-header.css';
import './Impact.css';

export default function Impact() {
  const { items: stats } = useCollection('impact_stats');
  const { value: quote } = useSetting('impact_quote');

  return (
    <>
      <section className="page-title-section">
        <h1 className="page-title">
          Impactful <span className="page-title__accent">Successes</span>
        </h1>
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span className="breadcrumb__star">✻</span>
          <span className="breadcrumb__current">Impact</span>
        </div>
      </section>

      {/* STATS ROW */}
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

      {/* DARK FEATURE */}
      <section className="impact-sec impact-feature-sec">
        <div className="impact-feature">
          <div className="impact-feature__img">
            <img src={womenGroup} alt="Women's empowerment group" />
          </div>
          <div className="impact-feature__body">
            <span className="impact-feature__star">✻</span>
            <h2>Real change, measured in lives.</h2>
            <p>
              Every donation becomes food on a table, a child in school, or a woman with a trade.
              Since our launch, the foundation&rsquo;s reach has grown steadily — community by
              community.
            </p>
            <Link to="/donate" className="impact-feature__cta">
              Support This Work →
            </Link>
          </div>
        </div>
      </section>

      {/* PATRON QUOTE */}
      <section className="impact-sec impact-quote-sec">
        <div className="impact-quote">
          <img src={patronEmir} alt="Royal patron" className="impact-quote__img" />
          <div className="impact-quote__body">
            <p className="impact-quote__text">&ldquo;{quote.quote}&rdquo;</p>
            <p className="impact-quote__attr">
              {quote.attribution}
              <span>{quote.role}</span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
