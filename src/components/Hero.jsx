export default function Hero() {
  return (
    <section className="hero" id="home">

      {/* Animated background orbs */}
      <div className="hero-bg">
        <div className="hb-orb hb-orb-1" />
        <div className="hb-orb hb-orb-2" />
        <div className="hb-orb hb-orb-3" />
        <div className="hb-grid" />
        <div className="hb-particles">
          {Array.from({ length: 18 }).map((_, i) => (
            <span key={i} className="hb-p" style={{
              left: `${(i * 37 + 5) % 100}%`,
              top:  `${(i * 53 + 10) % 100}%`,
              animationDelay: `${(i * 0.4) % 6}s`,
              animationDuration: `${4 + (i % 4)}s`,
              width:  `${3 + (i % 3)}px`,
              height: `${3 + (i % 3)}px`,
            }} />
          ))}
        </div>
      </div>

      <div className="wrap">
        <div className="hero-center">

          <div className="hero-eyebrow">
            <span className="badge badge-dark">
              <span className="hero-pulse-dot" />
              Now Open — Jadibuti, Kathmandu
            </span>
          </div>

          <h1 className="hero-h1">
            Your Dream University —<br />
            <em>We'll Get You There</em>
          </h1>

          <p className="hero-sub">
            Nepal's most trusted study-abroad advisors, now in Jadibuti.
            Honest guidance, expert visa support, and IELTS/PTE coaching
            right in your neighbourhood.
          </p>

          <div className="hero-btns">
            <a href="#contact" className="btn-pill btn-white">
              Book Free Counseling
              <span className="arrow-circle">→</span>
            </a>
            <a href="#destinations" className="btn-pill btn-ghost">
              Explore Destinations
              <span className="arrow-circle">→</span>
            </a>
          </div>

          <div className="hero-stats">
            {[
              { n: '5000+', l: 'Students Placed' },
              { n: '98%',   l: 'Visa Success' },
              { n: '5',     l: 'Countries' },
              { n: '10+',   l: 'Years Active' },
            ].map(s => (
              <div className="h-stat" key={s.l}>
                <div className="h-stat-n">{s.n}</div>
                <div className="h-stat-l">{s.l}</div>
              </div>
            ))}
          </div>

          <div className="hero-cta-card">
            <span className="hcc-icon">💬</span>
            <div>
              <div className="hcc-t">Not sure where to study?</div>
              <div className="hcc-s">Free counseling — no obligation</div>
            </div>
            <a href="#contact" className="hcc-btn">Get Advice →</a>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes hpulse {
          0%,100%{transform:scale(1);opacity:1}
          50%{transform:scale(1.6);opacity:0.4}
        }
        @keyframes orbDrift1 {
          0%,100%{ transform:translate(0,0) scale(1); }
          33%    { transform:translate(90px,70px) scale(1.12); }
          66%    { transform:translate(-50px,100px) scale(0.94); }
        }
        @keyframes orbDrift2 {
          0%,100%{ transform:translate(0,0) scale(1); }
          33%    { transform:translate(-80px,-60px) scale(1.08); }
          66%    { transform:translate(100px,-30px) scale(1.15); }
        }
        @keyframes orbDrift3 {
          0%,100%{ transform:translate(-50%,-50%) scale(1); }
          50%    { transform:translate(-50%,-50%) scale(1.35); }
        }
        @keyframes particleFloat {
          0%,100%{ opacity:0; transform:translateY(0); }
          20%    { opacity:0.7; }
          80%    { opacity:0.4; }
          100%   { transform:translateY(-40px); }
        }
      `}</style>
    </section>
  )
}
