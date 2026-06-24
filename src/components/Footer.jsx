import logoWithBg from '../logo/global_gate.png'

const services = ['Career Counseling','University Admission','Visa Assistance','IELTS Preparation','PTE Coaching','Scholarship Guidance']
const dests    = ['Australia','Canada','New Zealand','United Kingdom','United States']

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="wrap">
          <div className="footer-grid">

            {/* Brand */}
            <div>
              <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-start', gap:10 }}>
                <img src={logoWithBg} alt="Global Gate" style={{ height:56, width:'auto', objectFit:'contain', borderRadius:8 }} />
                <div>
                  <div style={{ color:'#fff', fontFamily:'Barlow Condensed,sans-serif', fontWeight:800, fontSize:'0.95rem', textTransform:'uppercase', letterSpacing:'0.04em', lineHeight:1.3 }}>
                    Global Gate Educational Consultancy
                  </div>
                  <div style={{ fontSize:'0.6rem', color:'var(--red)', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.1em', marginTop:3 }}>
                    Jadibuti Branch
                  </div>
                </div>
              </div>
              <p className="footer-brand-desc">
                Nepal's trusted study-abroad advisor. Helping students from
                Jadibuti and across eastern Kathmandu achieve their dream of
                international education with honest guidance and expert
                visa support.
              </p>
              <div className="footer-socials">
                <a href="https://www.facebook.com/profile.php?id=61589623467706" target="_blank" rel="noreferrer" className="f-soc" title="Facebook">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a href="https://www.instagram.com/globalgateeduconsult.jadibuti" target="_blank" rel="noreferrer" className="f-soc" title="Instagram">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </a>
                <a href="https://www.tiktok.com/@globalgateedu.jadibuti" target="_blank" rel="noreferrer" className="f-soc" title="TikTok">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.74a8.18 8.18 0 0 0 4.78 1.52V6.82a4.85 4.85 0 0 1-1.01-.13z"/></svg>
                </a>
              </div>
            </div>

            {/* Services */}
            <div className="f-col">
              <div className="f-col-title">Services</div>
              <ul>{services.map(s => <li key={s}><a href="#services">{s}</a></li>)}</ul>
            </div>

            {/* Destinations */}
            <div className="f-col">
              <div className="f-col-title">Destinations</div>
              <ul>{dests.map(d => <li key={d}><a href="#destinations">{d}</a></li>)}</ul>
            </div>

            {/* Contact */}
            <div className="f-col">
              <div className="f-col-title">Contact</div>
              <ul>
                <li style={{ color:'rgba(255,255,255,0.4)', fontSize:13, lineHeight:1.65 }}>
                  Jadibuti, Kathmandu<br />Near Jadibuti Bus Park, Nepal
                </li>
                <li><a href="tel:015253297">📞 015253297</a></li>
                <li><a href="https://wa.me/9779862349049" target="_blank" rel="noreferrer">💬 +977 986-2349049</a></li>
                <li><a href="mailto:globalgateedu.jadibuti@gmail.com" style={{ wordBreak:'break-all' }}>
                  globalgateedu.jadibuti@gmail.com
                </a></li>
                <li style={{ color:'rgba(255,255,255,0.4)', fontSize:13, lineHeight:1.65 }}>
                  Sun–Fri: 8:00 AM – 6:00 PM<br />Saturday: Closed
                </li>
              </ul>
            </div>

          </div>
        </div>
      </footer>

      <div className="copyright">
        © {new Date().getFullYear()} Global Gate Educational Consultancy — Jadibuti Branch.
        &nbsp;Branch of&nbsp;
        <a href="https://globalgateconsultancy.com" target="_blank" rel="noreferrer">
          Global Gate Educational Consultancy
        </a>
        , Kalanki, Kathmandu.
        &nbsp;|&nbsp; <a href="#contact">Terms</a> &nbsp;|&nbsp; <a href="#contact">Privacy</a>
      </div>
    </>
  )
}
