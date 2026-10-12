import { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import logo from '../logo/logo without bg.png'
import { aiInterviewUrl, waLink } from '../data/site'
import { ArrowUpRight } from './ui'

const sections = [
  { label: 'About', hash: '#about' },
  { label: 'Services', hash: '#services' },
  { label: 'Destinations', hash: '#destinations' },
  { label: 'Reviews', hash: '#reviews' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const onHome = pathname === '/'
  const hashHref = (hash) => (onHome ? hash : `/${hash}`)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setOpen(false)
  const aiLink = (
    <a href={aiInterviewUrl('navbar')} target="_blank" rel="noopener noreferrer" onClick={close}>
      AI Interview <span className="badge-new">NEW</span>
    </a>
  )

  return (
    <div className="topnav-wrap" id="top">
      <header className={`topnav${scrolled ? ' scrolled' : ''}`}>
        <Link to="/" className="brand" aria-label="Global Gate Educational Consultancy — home">
          <img src={logo} alt="Global Gate Educational Consultancy Pvt. Ltd." width="206" height="206" />
        </Link>

        <nav aria-label="Main">
          <ul className="navlinks">
            {sections.map(s => <li key={s.hash}><a href={hashHref(s.hash)}>{s.label}</a></li>)}
            <li><Link to="/blog" className={pathname.startsWith('/blog') ? 'active' : ''}>Blog</Link></li>
            <li><Link to="/videos" className={pathname.startsWith('/videos') ? 'active' : ''}>Videos</Link></li>
            <li>{aiLink}</li>
          </ul>
        </nav>

        <div className="nav-actions">
          <a href={hashHref('#contact')} className="btn btn-dark btn-sm nav-cta">Book free counseling <ArrowUpRight /></a>
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="Chat on WhatsApp">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20.5l1.7-5.2A8.5 8.5 0 1 1 21 11.5z" /></svg>
          </a>
          <button type="button" className="icon-btn nav-burger" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(o => !o)}>
            {open
              ? <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
              : <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>}
          </button>
        </div>
      </header>

      <nav id="mobile-menu" aria-label="Mobile" className={`mobile-menu${open ? ' open' : ''}`}>
        {sections.map(s => <a key={s.hash} href={hashHref(s.hash)} onClick={close}>{s.label}</a>)}
        <Link to="/blog" onClick={close}>Blog</Link>
        <Link to="/videos" onClick={close}>Videos</Link>
        {aiLink}
        <a href={hashHref('#contact')} className="btn btn-red" onClick={close}>Book free counseling</a>
      </nav>
    </div>
  )
}
