const flags = [
  { code: 'au', name: 'Australia'   },
  { code: 'ca', name: 'Canada'      },
  { code: 'nz', name: 'New Zealand' },
  { code: 'gb', name: 'UK'          },
  { code: 'us', name: 'USA'         },
]

const RADIUS = 140
const SIZE   = 60

export default function Destinations() {
  return (
    <section className="destinations" id="destinations">
      <div className="wrap">
        <div className="dest-grid">

          {/* Left — text */}
          <div className="dest-text reveal">
            <span className="badge badge-dark">Study Destinations</span>
            <h2 className="s-title s-title-lg s-title-white">
              5 Countries,<br />
              <em>Endless Possibilities</em>
            </h2>
            <p className="blockquote blockquote-white" style={{ marginBottom: 28 }}>
              We have established partnerships with leading universities
              across 5 countries. Choose your dream destination and we
              handle every step — from application to visa approval.
            </p>
            <ul className="dest-visa-list">
              {[
                'Student Visa Guidance & Processing',
                'University Application & Admission',
                'Scholarship & Financial Aid Search',
                'IELTS / PTE / TOEFL Preparation',
                'Pre-Departure & Post-Arrival Support',
                'Alumni Network in Every Destination',
              ].map(item => <li key={item}>{item}</li>)}
            </ul>
            <a href="#contact" className="btn-pill btn-white">
              Book Free Counseling
              <span className="arrow-circle">→</span>
            </a>
          </div>

          {/* Right — premium orbit */}
          <div className="orbit-wrap">
            <div className="orbit-scene">

              {/* Ambient glow behind everything */}
              <div className="orbit-glow" />

              {/* Outer decorative ring */}
              <div className="orbit-ring orbit-ring-outer" />

              {/* Main orbit ring */}
              <div className="orbit-ring orbit-ring-main" />

              {/* Inner decorative ring */}
              <div className="orbit-ring orbit-ring-inner" />

              {/* Travelling light dot on main ring */}
              <div className="orbit-light-dot" />

              {/* Centre — compass rose */}
              <div className="orbit-center">
                <div className="orbit-globe-inner">
                  <svg viewBox="0 0 64 64" fill="none" className="orbit-compass-svg">
                    {/* Outer dial ring */}
                    <circle cx="32" cy="32" r="28" stroke="rgba(255,255,255,0.18)" strokeWidth="1"/>
                    {/* 8 tick marks */}
                    {[0,45,90,135,180,225,270,315].map(a => {
                      const r1 = a % 90 === 0 ? 23 : 25
                      const rad = (a - 90) * Math.PI / 180
                      return (
                        <line key={a}
                          x1={32 + Math.cos(rad)*r1} y1={32 + Math.sin(rad)*r1}
                          x2={32 + Math.cos(rad)*28} y2={32 + Math.sin(rad)*28}
                          stroke={a % 90 === 0 ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.2)'}
                          strokeWidth={a % 90 === 0 ? 1.5 : 1}
                        />
                      )
                    })}
                    {/* N arrow — brand red */}
                    <path d="M32 32 L29.5 23 L32 7 L34.5 23 Z" fill="#E8323C"/>
                    {/* S arrow */}
                    <path d="M32 32 L34.5 41 L32 57 L29.5 41 Z" fill="rgba(255,255,255,0.3)"/>
                    {/* E arrow */}
                    <path d="M32 32 L41 29.5 L57 32 L41 34.5 Z" fill="rgba(255,255,255,0.3)"/>
                    {/* W arrow */}
                    <path d="M32 32 L23 34.5 L7 32 L23 29.5 Z" fill="rgba(255,255,255,0.3)"/>
                    {/* Centre jewel */}
                    <circle cx="32" cy="32" r="3.5" fill="white" opacity="0.9"/>
                    <circle cx="32" cy="32" r="1.5" fill="#E8323C"/>
                  </svg>
                </div>
                <div className="orbit-globe-pulse" />
              </div>

              {/* Flag nodes */}
              {flags.map((f, i) => (
                <div
                  key={f.code}
                  className="orbit-node"
                  style={{ animationDelay: `-${(i / flags.length) * 22}s` }}
                >
                  <div className="orbit-node-glow" />
                  <img
                    src={`https://flagcdn.com/w80/${f.code}.png`}
                    alt={f.name}
                    className="orbit-flag-img"
                  />
                  <span className="orbit-flag-name">{f.name}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
