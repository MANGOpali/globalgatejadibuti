import { Link } from 'react-router-dom'
import HeroGlobe from './HeroGlobe'
import { ArrowRight } from './ui'
import { DESTINATIONS } from '../data/site'

export default function Hero() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="hero-grid">
        <div className="hero-copy">
          <div className="hero-kicker">{'HONEST GUIDANCE.\nEXPERT VISA SUPPORT.\nREAL OFFER LETTERS.'}</div>
          <h1 className="h1" id="hero-title">Your gate to <span className="accent">world-class</span> universities.</h1>
          <p className="hero-sub">Nepal's most trusted study-abroad advisors, now in Jadibuti. Honest guidance, expert visa support and IELTS/PTE coaching in your neighbourhood.</p>
          <div className="hero-actions">
            <a href="#contact" className="btn btn-red">Book free counseling <ArrowRight /></a>
            <a href="#destinations" className="link-u">Explore destinations</a>
          </div>
        </div>
        <div className="hero-globe">
          <HeroGlobe />
        </div>
      </div>
      <div className="hero-strip">
        <span style={{ display: 'flex', alignItems: 'center', gap: 20 }}>01 / 07 <span className="rule" /> DRAG TO SPIN · CLICK A COUNTRY</span>
        <span className="legend">
          <span><i style={{ background: '#EF4444' }} />NEPAL</span>
          {DESTINATIONS.map(d => d.to.startsWith('/#')
            ? <a key={d.code} href={d.to}><i style={{ background: d.color }} />{d.name.toUpperCase()}</a>
            : <Link key={d.code} to={d.to}><i style={{ background: d.color }} />{d.name.toUpperCase()}</Link>)}
        </span>
      </div>
    </section>
  )
}
