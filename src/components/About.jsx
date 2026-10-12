const IMG = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&h=1100&fit=crop&auto=format'

const features = [
  { n: '01', title: 'Backed by a trusted name', desc: "Powered by Global Gate's 10-year track record and 200+ university partnerships." },
  { n: '02', title: 'Right here in Jadibuti', desc: 'No need to travel to Kalanki — face-to-face counseling in your own neighbourhood.' },
  { n: '03', title: 'Genuinely honest advice', desc: "We recommend what's right for your profile — never what earns the highest commission." },
  { n: '04', title: 'End-to-end support', desc: 'From shortlisting universities to boarding your flight — support at every stage.' },
]

export default function About() {
  return (
    <section className="section" id="about">
      <div className="wrap about">
        <div className="about-media">
          <img src={IMG} alt="Students planning their study-abroad applications together" loading="lazy" width="900" height="1100" />
          <div className="about-stats">
            <div><b>5000+</b><span>STUDENTS</span></div>
            <div><b>98%</b><span>VISA</span></div>
            <div><b>200+</b><span>UNIS</span></div>
            <div><b>10+</b><span>YEARS</span></div>
          </div>
        </div>
        <div className="about-copy">
          <span className="mono">ABOUT OUR CONSULTANCY</span>
          <h2 className="h2">Your neighbourhood study-abroad expert.</h2>
          <p className="lead">We are the official Jadibuti branch of Global Gate Educational Consultancy — with over a decade of proven success. From choosing a university to visa approval and pre-departure, we're with you at every step.</p>
          <ul className="feature-list">
            {features.map(f => (
              <li key={f.n}><span className="n">{f.n}</span><div><b>{f.title}</b><p>{f.desc}</p></div></li>
            ))}
          </ul>
          <a href="#contact" className="btn btn-navy" style={{ alignSelf: 'flex-start' }}>Book a free session</a>
        </div>
      </div>
    </section>
  )
}
