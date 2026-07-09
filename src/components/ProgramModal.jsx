import { useEffect, useState } from 'react';
import { X, Calendar, MapPin, Users, FileText, Download } from 'lucide-react';
import './ProgramModal.css';

function fmt(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  return d.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
}

export default function ProgramModal({ program, onClose }) {
  // Build gallery: gallery images first, then primary if not already there
  const gallery = (() => {
    const imgs = Array.isArray(program.images) ? program.images.filter(Boolean) : [];
    if (program.image_url && !imgs.includes(program.image_url)) {
      return [program.image_url, ...imgs];
    }
    return imgs.length ? imgs : [program.image_url].filter(Boolean);
  })();

  const [activeIdx, setActiveIdx] = useState(0);
  const reports = Array.isArray(program.reports) ? program.reports : [];

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setActiveIdx((i) => Math.min(i + 1, gallery.length - 1));
      if (e.key === 'ArrowLeft')  setActiveIdx((i) => Math.max(i - 1, 0));
    }
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, gallery.length]);

  return (
    <div className="pmodal-backdrop" onClick={onClose}>
      <div className="pmodal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <button className="pmodal__close" onClick={onClose} aria-label="Close"><X size={20} /></button>

        <div className="pmodal__body">
          {/* IMAGE PANEL */}
          <div className="pmodal__img-panel">
            <div className="pmodal__img-main">
              {gallery[activeIdx] && (
                <img src={gallery[activeIdx]} alt={program.title} />
              )}
            </div>

            {gallery.length > 1 && (
              <div className="pmodal__thumbs">
                {gallery.map((url, i) => (
                  <button
                    key={i}
                    className={`pmodal__thumb${i === activeIdx ? ' pmodal__thumb--active' : ''}`}
                    onClick={() => setActiveIdx(i)}
                    aria-label={`Image ${i + 1}`}
                  >
                    <img src={url} alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* CONTENT */}
          <div className="pmodal__content">
            <span className="pmodal__tag">{program.tag}</span>
            <h2 className="pmodal__title">{program.title}</h2>

            <div className="pmodal__meta">
              {(program.start_date || program.end_date) && (
                <div className="pmodal__meta-row">
                  <span className="pmodal__meta-icon"><Calendar size={16} /></span>
                  <span>{fmt(program.start_date)}{program.end_date ? ` – ${program.end_date}` : ''}</span>
                </div>
              )}
              {program.location && (
                <div className="pmodal__meta-row">
                  <span className="pmodal__meta-icon"><MapPin size={16} /></span>
                  <span>{program.location}</span>
                </div>
              )}
              {program.beneficiaries && (
                <div className="pmodal__meta-row">
                  <span className="pmodal__meta-icon"><Users size={16} /></span>
                  <span>{program.beneficiaries}</span>
                </div>
              )}
            </div>

            {program.details && (
              <div className="pmodal__section">
                <h3 className="pmodal__section-title">About this programme</h3>
                <p className="pmodal__details">{program.details}</p>
              </div>
            )}

            {reports.length > 0 && (
              <div className="pmodal__section">
                <h3 className="pmodal__section-title">Reports &amp; Documents</h3>
                <ul className="pmodal__reports">
                  {reports.map((r, i) => (
                    <li key={i} className="pmodal__report">
                      <span className="pmodal__report-icon"><FileText size={16} /></span>
                      <a href={r.url} target="_blank" rel="noreferrer" className="pmodal__report-link">
                        {r.name}
                      </a>
                      <span className="pmodal__report-dl"><Download size={13} /> Download</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <a href="/donate" className="pmodal__cta">Support this programme →</a>
          </div>
        </div>
      </div>
    </div>
  );
}
