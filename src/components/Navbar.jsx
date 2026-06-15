import { useState, useEffect } from 'react'
import logo from '../logo/global_gate.png'

const links = [
  { label: 'Home',         href: '#home' },
  { label: 'About',        href: '#about' },
  { label: 'Services',     href: '#services' },
  { label: 'Destinations', href: '#destinations' },
  { label: 'FAQ',          href: '#faq' },
  { label: 'Contact',      href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      {/* Utility bar */}
      <div className="util-bar">
        <div className="util-inner">
          <div className="util-left">
            <span className="util-item"><span className="ui">📍</span>Jadibuti, Kathmandu, Nepal</span>
            <span className="util-item"><span className="ui">📞</span>015253297</span>
            <span className="util-item"><span className="ui">✉</span>globalgateedu.jadibuti@gmail.com</span>
          </div>
          <div className="util-right">
            <span className="util-item"><span className="ui">🕐</span>Sun–Fri: 9AM–6PM</span>
            <div className="util-socials">
              <a href="#contact">FB</a>
              <a href="#contact">YT</a>
              <a href="#contact">IN</a>
            </div>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-inner">
          <a href="#home" className="nav-logo">
            <img src={logo} alt="Global Gate" className="nav-logo-img" />
            <div className="nav-logo-text">
              <div className="nav-logo-name">Global Gate</div>
              <div className="nav-logo-sub">Jadibuti Branch · Kathmandu</div>
            </div>
          </a>

          <ul className="nav-menu">
            {links.map(l => <li key={l.label}><a href={l.href}>{l.label}</a></li>)}
          </ul>

          <div className="nav-right">
            <div style={{ display:'flex', flexDirection:'column', gap:2, lineHeight:1.2 }}>
              <a className="nav-phone" href="tel:015253297" style={{ textDecoration:'none', color:'inherit', fontSize:'0.85em' }}>
                <span className="nav-phone-icon">📞</span>
                015253297
              </a>
              <a className="nav-phone" href="https://wa.me/9779862349049" target="_blank" rel="noreferrer" style={{ textDecoration:'none', color:'inherit', fontSize:'0.85em' }}>
                <span className="nav-phone-icon">💬</span>
                +977 986-2349049
              </a>
            </div>
            <a href="#contact" className="btn-pill btn-blue btn-sm">
              Apply Now
              <span className="arrow-circle">→</span>
            </a>
          </div>

          <button className="hamburger" onClick={() => setOpen(o => !o)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>

        <div className={`mobile-nav${open ? ' open' : ''}`}>
          {links.map(l => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
          ))}
          <a href="#contact" className="btn-pill btn-blue" onClick={() => setOpen(false)}>
            Apply Now <span className="arrow-circle">→</span>
          </a>
        </div>
      </nav>
    </>
  )
}
