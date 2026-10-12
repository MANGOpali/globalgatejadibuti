import { Link } from 'react-router-dom'
import logo from '../logo/logo without bg.png'
import { DESTINATIONS, SOCIALS, PHONE, PHONE_DISPLAY, WHATSAPP_DISPLAY, EMAIL, ADDRESS, HOURS, waLink, aiInterviewUrl } from '../data/site'

const icons = {
  Facebook: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" fill="currentColor" />,
  Instagram: <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></g>,
  TikTok: <path fill="currentColor" d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-2.88-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 1 0 5.54 6.29V8.74a8.18 8.18 0 0 0 4.78 1.52V6.82a4.85 4.85 0 0 1-1.01-.13z" />,
  YouTube: <path fill="currentColor" d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />,
}

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="foot">
        <div className="foot-top">
          <h2>From Jadibuti to <span>the world.</span></h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            <a href="/#contact" className="btn btn-red">Book free counseling</a>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">WhatsApp us</a>
          </div>
        </div>

        <div className="foot-cols">
          <div className="foot-brand">
            <Link to="/" className="foot-logo" aria-label="Global Gate — home"><div><img src={logo} alt="Global Gate Educational Consultancy Pvt. Ltd." width="184" height="184" /></div></Link>
            <div>{ADDRESS}<br />{HOURS}</div>
            <div className="foot-contacts">
              <a href={`tel:${PHONE}`}>{PHONE_DISPLAY}</a>
              <a href={waLink()} target="_blank" rel="noopener noreferrer">{WHATSAPP_DISPLAY}</a>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </div>
            <div className="foot-social">
              {SOCIALS.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                  <svg aria-hidden="true" viewBox="0 0 24 24">{icons[s.label]}</svg>
                </a>
              ))}
            </div>
          </div>

          <div className="foot-col">
            <span className="mono">DESTINATIONS</span>
            {DESTINATIONS.map(d => d.to.startsWith('/#')
              ? <a key={d.code} href={d.to}>{d.name}</a>
              : <Link key={d.code} to={d.to}>{d.name}</Link>)}
          </div>

          <div className="foot-col">
            <span className="mono">SERVICES</span>
            <Link to="/ielts-classes-jadibuti">IELTS preparation</Link>
            <Link to="/pte-classes-jadibuti">PTE preparation</Link>
            <a href={aiInterviewUrl('footer')} target="_blank" rel="noopener noreferrer">AI Pre-CAS interview ↗</a>
            <Link to="/uk-student-visa-process">UK student visa</Link>
            <Link to="/australia-student-visa-process">Australia student visa</Link>
            <Link to="/scholarships">Scholarships</Link>
          </div>

          <div className="foot-col">
            <span className="mono">EXPLORE</span>
            <Link to="/blog">Blog</Link>
            <Link to="/videos">Videos</Link>
            <a href="/#faq">FAQ</a>
            <Link to="/study-abroad-consultancy-jadibuti">Consultancy in Jadibuti</Link>
            <Link to="/study-abroad-consultancy-koteshwor">Koteshwor students</Link>
            <Link to="/study-abroad-consultancy-baneshwor">Baneshwor students</Link>
            <Link to="/study-abroad-consultancy-pepsicola">Pepsicola students</Link>
          </div>
        </div>

        <div className="foot-bottom">
          <span>© {new Date().getFullYear()} GLOBAL GATE EDUCATIONAL CONSULTANCY PVT. LTD. — JADIBUTI BRANCH</span>
          <a href="#top">BACK TO TOP ↑</a>
        </div>
      </div>
    </footer>
  )
}
