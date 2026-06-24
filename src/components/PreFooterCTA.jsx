export default function PreFooterCTA() {
  return (
    <section className="prefooter" id="contact">
      <div className="wrap">
        <div className="prefooter-inner">
          <span className="badge badge-dark" style={{ justifyContent:'center' }}>
            Get In Touch Today
          </span>
          <div className="prefooter-phone">
            <span className="pf-phone-icon">📞</span>
            <span className="pf-phone-num">015253297</span>
            <span style={{ color:'rgba(255,255,255,0.4)', margin:'0 8px' }}>|</span>
            <span className="pf-phone-icon">💬</span>
            <span className="pf-phone-num">+977 986-2349049</span>
          </div>
          <p className="prefooter-addr">
            Jadibuti, Kathmandu, Nepal &nbsp;·&nbsp; Near Jadibuti Bus Park
            &nbsp;·&nbsp; globalgateedu.jadibuti@gmail.com
          </p>
          <p style={{ color:'rgba(255,255,255,0.45)', fontSize:13, marginBottom:28 }}>
            Sunday – Friday: 8:00 AM – 6:00 PM &nbsp;|&nbsp; Saturday: Closed
          </p>
          <div className="prefooter-btns">
            <a href="tel:015253297" className="btn-pill btn-white">
              Call Us Now
              <span className="arrow-circle">→</span>
            </a>
            <a href="https://wa.me/9779862349049" target="_blank" rel="noreferrer" className="btn-pill btn-white">
              WhatsApp Us
              <span className="arrow-circle">→</span>
            </a>
            <a
              href="mailto:globalgateedu.jadibuti@gmail.com"
              className="btn-pill btn-ghost"
            >
              Send an Email
              <span className="arrow-circle">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
