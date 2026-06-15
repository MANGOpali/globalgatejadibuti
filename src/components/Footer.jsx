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
                {[['f','Facebook'],['▶','YouTube'],['in','LinkedIn'],['✉','Email']].map(([l,t]) => (
                  <a key={t} href="#contact" className="f-soc" title={t}>{l}</a>
                ))}
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
                  Sun–Fri: 9:00 AM – 6:00 PM<br />Sat: 10:00 AM – 3:00 PM
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
