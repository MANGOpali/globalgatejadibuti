import { ArrowUpRight, Check } from './ui'
import { aiInterviewUrl, waLink } from '../data/site'

const features = [
  ['19-question mock interview', 'Questions read aloud, answered on camera, just like the real one.'],
  ['AI score out of 100', 'Every answer scored, with clear notes on exactly what to fix.'],
  ['Speaking coach', 'Pace and filler-word feedback so you sound calm and confident.'],
  ['Practise one topic', 'Drill finances, your course or career plans with answer structures.'],
]
const wave = [8, 14, 22, 12, 26, 18, 30, 16, 24, 10, 20, 28, 14, 18, 9, 22, 12, 16, 8, 12]
const bars = [['Answer quality', 84], ['Clarity', 80], ['Grammar', 78], ['Correctness', 86]]

export default function AIInterview() {
  return (
    <section className="section" id="ai-interview" style={{ paddingLeft: 24, paddingRight: 24 }}>
      <div className="wrap-wide ai-box">
        <div className="ai-copy">
          <div className="ai-tag">
            <span className="ai-mark"><img src="/ai-interview-mark.png" alt="" width="36" height="36" /></span>
            <span className="mono" style={{ color: 'var(--on-navy-2)' }}>GGEC · PRE-CAS INTERVIEW SIMULATOR</span>
            <span className="ai-pill">NEW · AI</span>
          </div>
          <h2 className="h2">Rehearse your Pre-CAS interview until the real one feels like the second time.</h2>
          <p className="lead" style={{ color: 'var(--on-navy)', maxWidth: 560 }}>Our own AI interview coach for UK-bound students. Answer real Pre-CAS questions out loud, on camera, and get an instant score with exactly what to improve.</p>
          <ul className="ai-feats">
            {features.map(([t, d]) => <li key={t}><Check /><span><b>{t}</b><span>{d}</span></span></li>)}
          </ul>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12 }}>
            <a className="btn btn-red" href={aiInterviewUrl('home-section')} target="_blank" rel="noopener noreferrer">Start practising <ArrowUpRight /></a>
            <a className="btn btn-ghost" href={waLink("Hi, I'd like a login for the AI Pre-CAS interview practice.")} target="_blank" rel="noopener noreferrer">Get your login on WhatsApp</a>
          </div>
          <p style={{ fontSize: 13, color: 'var(--on-navy-2)' }}>Logins are created by our counsellors for Global Gate students. The camera is preview only and audio is never saved.</p>
        </div>

        <div className="ai-preview" aria-label="Preview of the AI interview simulator">
          <div style={{ display: 'flex', justifyContent: 'space-between' }} className="mono"><span>QUESTION 4 OF 19</span><span>PREVIEW</span></div>
          <div className="ai-progress"><div /></div>
          <div className="ai-q">Why have you chosen this university and this course?</div>
          <div className="ai-tip">Tip: name your university, course and one module you are excited about.</div>
          <div className="ai-rec">
            <span className="dot" />
            <span className="mono" style={{ color: 'var(--ink)', whiteSpace: 'nowrap' }}>0:42 / 2:00</span>
            <span className="ai-wave" aria-hidden="true">{wave.map((h, i) => <span key={i} className={i < 13 ? 'on' : ''} style={{ height: h }} />)}</span>
          </div>
          <div className="ai-report">
            <div className="ai-score"><b>82</b><span className="mono" style={{ fontSize: 10 }}>/100</span></div>
            <div className="ai-bars">
              {bars.map(([n, v]) => <div className="ai-bar" key={n}><span>{n}</span><span className="track"><i style={{ width: `${v}%` }} /></span><b>{v}</b></div>)}
            </div>
          </div>
          <div className="tags"><span className="good">Good, steady pace</span><span>Filler words: 2 per 100</span><span>Sample report</span></div>
        </div>
      </div>
    </section>
  )
}
