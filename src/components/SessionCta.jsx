import { ArrowRight } from './ui'
import { waLink } from '../data/site'

const steps = [
  { bg: '#C8202F', title: 'Profile check', text: 'Your grades, budget and career goals.' },
  { bg: '#1B3A6B', title: 'Country & university shortlist', text: 'Honest options that fit your profile.' },
  { bg: '#0E1424', title: 'A clear plan to take home', text: 'English test, documents and your timeline.' },
]

export default function SessionCta() {
  return (
    <section className="section" style={{ paddingTop: 88, paddingLeft: 24, paddingRight: 24 }}>
      <div className="wrap-wide cta-band">
        <div className="copy">
          <span className="mono">LET'S PLAN YOUR FUTURE</span>
          <h2 className="h2">Turn one free session into your offer letter.</h2>
          <p>Bring your marksheets. We compare countries against your grades and budget — no pressure, no upselling.</p>
          <div className="row">
            <a href="#contact" className="btn btn-dark">Book free counseling <ArrowRight /></a>
            <span className="sep" aria-hidden="true" />
            <span style={{ fontSize: 14 }}>Free · no obligation</span>
          </div>
        </div>
        <div className="session-card">
          <div className="mono" style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}><span>IN YOUR FREE SESSION</span><span>30–45 MIN</span></div>
          <ol>
            {steps.map((s, i) => (
              <li key={s.title}>
                <span className="num" style={{ background: s.bg }}>{String(i + 1).padStart(2, '0')}</span>
                <span><b>{s.title}</b><span>{s.text}</span></span>
              </li>
            ))}
          </ol>
          <div style={{ fontSize: 14, color: 'var(--muted)' }}>
            Walk in Sunday–Friday, 8 AM – 6 PM, or <a href={waLink()} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--red)', fontWeight: 600 }}>book on WhatsApp</a>.
          </div>
        </div>
      </div>
    </section>
  )
}
