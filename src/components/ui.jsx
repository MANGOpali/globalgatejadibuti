import { Link } from 'react-router-dom'
import { aiInterviewUrl } from '../data/site'

export const ArrowRight = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
)
export const ArrowUpRight = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M8 7h9v9" /></svg>
)
export const Check = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
)
const Plus = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
)

export function SectionHead({ label, title, aside, children, id }) {
  return (
    <div className="sec-head">
      <div>
        {label && <span className="mono">{label}</span>}
        <h2 className="h2" id={id}>{title}</h2>
      </div>
      {aside && <p>{aside}</p>}
      {children}
    </div>
  )
}

export function Crumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="crumbs">
      {items.map((it, i) => (
        <span key={it.label}>
          {i > 0 && ' / '}
          {it.to ? <Link to={it.to}>{it.label}</Link> : it.label}
        </span>
      ))}
    </nav>
  )
}

export function FaqList({ faqs }) {
  return (
    <div className="faq-list">
      {faqs.map(f => (
        <details key={f.q}>
          <summary><span>{f.q}</span><span className="plus"><Plus /></span></summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  )
}

export function Steps({ steps }) {
  return (
    <ol className="steps">
      {steps.map((s, i) => (
        <li key={s}>
          <div className="dot-row"><span>{String(i + 1).padStart(2, '0')}</span><i /></div>
          <p>{s}</p>
        </li>
      ))}
    </ol>
  )
}

const tones = ['', 'navy', '', 'red']
export function NumCards({ items }) {
  return (
    <div className="grid grid-270">
      {items.map((it, i) => (
        <div className={`num-card ${tones[i % 4]}`} key={it.title}>
          <span className="n">{String(i + 1).padStart(2, '0')}</span>
          <h3>{it.title}</h3>
          <p>{it.desc}</p>
        </div>
      ))}
    </div>
  )
}

export function CtaSlim({ label, title, tone = '', children }) {
  return (
    <section className="section" style={{ paddingLeft: 24, paddingRight: 24 }}>
      <div className={`wrap-wide cta-slim ${tone}`}>
        <div style={{ flex: '1 1 520px' }}>
          {label && <span className="mono">{label}</span>}
          <h2 className="h2">{title}</h2>
        </div>
        <div className="actions">{children}</div>
      </div>
    </section>
  )
}

export function AICallout({ placement, title, text, label = 'NEW · AI PRACTICE' }) {
  return (
    <div className="ai-callout">
      <span className="ai-mark"><img src="/ai-interview-mark.png" alt="" width="44" height="44" /></span>
      <div className="text">
        <span className="mono">{label}</span>
        <strong>{title}</strong>
        <p>{text}</p>
      </div>
      <a className="btn btn-red" href={aiInterviewUrl(placement)} target="_blank" rel="noopener noreferrer">
        Practise your Pre-CAS interview <ArrowUpRight />
      </a>
    </div>
  )
}
