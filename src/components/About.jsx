const IMG_MAIN = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=500&fit=crop&auto=format'

const features = [
  { n: '01', title: 'Backed by a Trusted Name',  desc: "Powered by Global Gate's 10-year track record and 200+ university partnerships." },
  { n: '02', title: 'Right Here in Jadibuti',    desc: 'No need to travel to Kalanki. Walk in for face-to-face counseling in your own neighbourhood.' },
  { n: '03', title: 'Genuinely Honest Advice',   desc: "We recommend what's right for your profile — never what earns us the highest commission." },
  { n: '04', title: 'End-to-End Support',        desc: 'From shortlisting universities to boarding your flight — complete support at every stage.' },
]

export default function About() {
  return (
    <section className="about" id="about">
      <div className="wrap">
        <div className="about-grid reveal">

          {/* Left — image collage */}
          <div className="about-collage">
            <div className="ac-main">
              <img src={IMG_MAIN} alt="Students in counseling session" />
              <div className="ac-overlay-stats">
                {[
                  { n:'5000+', l:'Students Placed' },
                  { n:'98%',   l:'Visa Success' },
                  { n:'200+',  l:'Universities' },
                  { n:'8+',    l:'Countries' },
                ].map(s => (
                  <div className="ac-stat" key={s.l}>
                    <div className="ac-stat-n">{s.n}</div>
                    <div className="ac-stat-l">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="ac-badge">
              <div className="ac-badge-n">10+</div>
              <div className="ac-badge-l">Years of Trust</div>
            </div>
          </div>

          {/* Right — text */}
          <div>
            <span className="badge badge-light">About Our Consultancy</span>
            <h2 className="s-title s-title-lg">
              Your Neighbourhood<br />
              <em>Study-Abroad Expert</em>
            </h2>

            <p className="blockquote" style={{ marginBottom: 24 }}>
              We are the official Jadibuti branch of Global Gate Educational
              Consultancy — Nepal's premier study-abroad advisor with over a
              decade of proven success.
            </p>

            <p className="s-body" style={{ marginBottom: 28 }}>
              From choosing the right university and preparing your documents,
              to visa approval and pre-departure orientation — we are with you
              at every single step of your international education journey.
            </p>

            <div className="about-features">
              {features.map(({ n, title, desc }) => (
                <div className="af" key={title}>
                  <div className="af-num">{n}</div>
                  <div>
                    <div className="af-title">{title}</div>
                    <div className="af-desc">{desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 32 }}>
              <a href="#contact" className="btn-pill btn-blue">
                Book Free Session
                <span className="arrow-circle">→</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
