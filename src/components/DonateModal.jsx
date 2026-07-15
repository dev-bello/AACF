import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import DonateWidget from './DonateWidget';
import './DonateModal.css';

// Lightweight donation modal opened from the navbar — no page navigation.
export default function DonateModal({ onClose }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return createPortal(
    <div className="donate-modal-backdrop" onClick={onClose}>
      <div
        className="donate-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Make a donation"
      >
        <button className="donate-modal__close" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>
        <DonateWidget onDone={onClose} />
      </div>
    </div>,
    document.body,
  );
}
