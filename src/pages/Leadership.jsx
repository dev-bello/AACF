import { Link } from 'react-router-dom';
import { useCollection } from '../hooks/useContent';
import '../styles/page-header.css';
import './Leadership.css';

export default function Leadership() {
  const { items: leaders } = useCollection('leaders');

  return (
    <>
      <section className="page-title-section">
        <h1 className="page-title leadership-title">Leadership &amp; Governance</h1>
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span className="breadcrumb__star">✻</span>
          <span className="breadcrumb__current">Leadership</span>
        </div>
        <p className="page-subtitle" style={{ maxWidth: 560 }}>
          A registered foundation (RC No. 175798) led with transparency, faith and accountability.
        </p>
      </section>

      <section className="leadership-sec leadership-grid-sec">
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

      {/* GOVERNANCE NOTE */}
      <section className="leadership-sec leadership-note-sec">
        <div className="leadership-note">
          <span className="leadership-note__star">✻</span>
          <p>
            Every contribution is managed with faith-based stewardship and open accountability — so
            your generosity always reaches the families who need it most.
          </p>
        </div>
      </section>
    </>
  );
}
