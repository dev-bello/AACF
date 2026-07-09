import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, Check } from 'lucide-react';
import { useCollection, useSetting } from '../hooks/useContent';
import '../styles/page-header.css';
import './Donate.css';

const PRESETS = [5000, 10000, 25000, 50000, 100000, 250000];
const DESIGNATIONS = [
  'Where needed most',
  'Ramadan food relief',
  "Women's empowerment",
  'Orphan education',
  'Widows & vulnerable support',
  'Zakat',
];

function fmt(n) {
  n = Number(n) || 0;
  return '₦' + n.toLocaleString('en-NG');
}

export default function Donate() {
  const { items: tiers } = useCollection('donate_tiers');
  const { value: bank } = useSetting('donate_bank');
  const [amount, setAmount] = useState(10000);
  const [custom, setCustom] = useState('');
  const [freq, setFreq] = useState('one-time');
  const [desig, setDesig] = useState('Where needed most');
  const [donated, setDonated] = useState(false);

  const isCustom = custom !== '' && custom != null;
  const effAmount = isCustom
    ? (() => {
        const c = parseInt(String(custom).replace(/[^0-9]/g, ''), 10);
        return isNaN(c) ? 0 : c;
      })()
    : amount;
  const freqOne = freq === 'one-time';
  const summaryText = `${freqOne ? 'one-time' : 'monthly'} gift of ${fmt(effAmount)} toward ${desig}`;

  function submit(e) {
    e.preventDefault();
    setDonated(true);
  }

  function reset() {
    setDonated(false);
  }

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

            <div className="donate-bank">
              <h4>Direct Bank Transfer</h4>
              <div className="donate-bank__row">
                <span>Account Name</span>
                <span className="donate-bank__val">{bank.account_name}</span>
              </div>
              <div className="donate-bank__row">
                <span>Account No.</span>
                <span className="donate-bank__val">{bank.account_no}</span>
              </div>
              <div className="donate-bank__row">
                <span>Bank</span>
                <span className="donate-bank__val">{bank.bank_name}</span>
              </div>
            </div>
          </div>

          {/* RIGHT: widget */}
          <div className="donate-widget">
            {donated ? (
              <div className="donate-widget__done">
                <div className="donate-widget__check"><Check size={30} strokeWidth={3} /></div>
                <h3>Jazākallāhu Khayran!</h3>
                <p>
                  Thank you for your generous <strong>{summaryText}</strong>. Your kindness will
                  reach a family who needs it most.
                </p>
                <button type="button" onClick={reset} className="donate-widget__reset">
                  Make another gift
                </button>
              </div>
            ) : (
              <form onSubmit={submit}>
                <h3 className="donate-widget__heading">Choose your gift</h3>
                <p className="donate-widget__sub">Support the foundation in a way that suits you.</p>

                <div className="donate-freq">
                  <button
                    type="button"
                    onClick={() => setFreq('one-time')}
                    className={freqOne ? 'donate-freq__btn donate-freq__btn--active' : 'donate-freq__btn'}
                  >
                    One-time
                  </button>
                  <button
                    type="button"
                    onClick={() => setFreq('monthly')}
                    className={!freqOne ? 'donate-freq__btn donate-freq__btn--active' : 'donate-freq__btn'}
                  >
                    Monthly
                  </button>
                </div>

                <label className="donate-label">Select an amount</label>
                <div className="donate-amts">
                  {PRESETS.map((v) => {
                    const active = !isCustom && amount === v;
                    return (
                      <button
                        type="button"
                        key={v}
                        onClick={() => {
                          setAmount(v);
                          setCustom('');
                        }}
                        className={active ? 'donate-chip donate-chip--active' : 'donate-chip'}
                      >
                        {fmt(v)}
                      </button>
                    );
                  })}
                </div>

                <div className="donate-custom">
                  <span className="donate-custom__symbol">₦</span>
                  <input
                    value={custom}
                    onChange={(e) => setCustom(e.target.value)}
                    inputMode="numeric"
                    placeholder="Other amount"
                  />
                </div>

                <label className="donate-label">Direct my gift to</label>
                <select
                  value={desig}
                  onChange={(e) => setDesig(e.target.value)}
                  className="donate-select"
                >
                  {DESIGNATIONS.map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>

                <div className="donate-summary">
                  <span>Your gift</span>
                  <span className="donate-summary__amt">
                    {fmt(effAmount)} <span>{freqOne ? '' : '/ month'}</span>
                  </span>
                </div>

                <button type="submit" className="donate-submit">
                  Proceed to Give →
                </button>
                <p className="donate-secure"><Lock size={13} /> Secure giving · A confirmation will be sent by email.</p>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
