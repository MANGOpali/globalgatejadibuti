import { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import logo from '../logo/global_gate.png'

const hashLinks = [
  { label: 'Home',         hash: '#home' },
  { label: 'About',        hash: '#about' },
  { label: 'Services',     hash: '#services' },
  { label: 'Destinations', hash: '#destinations' },
  { label: 'FAQ',          hash: '#faq' },
  { label: 'Contact',      hash: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const { pathname } = useLocation()
  const onHome = pathname === '/'

  const links = hashLinks.map(l => ({
    label: l.label,
    href: onHome ? l.hash : `/${l.hash}`,
  }))

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
            <span className="util-item"><span className="ui">🕐</span>Sun–Fri: 8AM–6PM</span>
            <div className="util-socials">
              <a href="https://www.facebook.com/profile.php?id=61589623467706" target="_blank" rel="noreferrer" title="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13" style={{display:'block'}}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://www.instagram.com/globalgateeduconsult.jadibuti" target="_blank" rel="noreferrer" title="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="13" height="13" style={{display:'block'}}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="https://www.tiktok.com/@globalgateedu.jadibuti" target="_blank" rel="noreferrer" title="TikTok">
                <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13" style={{display:'block'}}><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.74a8.18 8.18 0 0 0 4.78 1.52V6.82a4.85 4.85 0 0 1-1.01-.13z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-inner">
          <a href={onHome ? '#home' : '/'} className="nav-logo">
            <img src={logo} alt="Global Gate" className="nav-logo-img" />
            <div className="nav-logo-text">
              <div className="nav-logo-name">Global Gate</div>
              <div className="nav-logo-sub">Jadibuti Branch · Kathmandu</div>
            </div>
          </a>

          <ul className="nav-menu">
            {links.map(l => <li key={l.label}><a href={l.href}>{l.label}</a></li>)}
            <li><Link to="/blog" className={pathname.startsWith('/blog') ? 'nav-blog-active' : ''}>Blog</Link></li>
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
            <a href={onHome ? '#contact' : '/#contact'} className="btn-pill btn-blue btn-sm">
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
          <Link to="/blog" onClick={() => setOpen(false)}>Blog</Link>
          <a href={onHome ? '#contact' : '/#contact'} className="btn-pill btn-blue" onClick={() => setOpen(false)}>
            Apply Now <span className="arrow-circle">→</span>
          </a>
        </div>
      </nav>
    </>
  )
}
