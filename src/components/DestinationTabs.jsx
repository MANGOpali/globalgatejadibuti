import { useState, useRef, useEffect } from 'react'

const countries = [
  {
    code:       'au',
    name:       'Australia',
    flag:       '🇦🇺',
    tagline:    'World-Class Education & PR Pathway',
    tuition:    'AUD 20,000 – 45,000 / yr',
    work:       '48 hrs / fortnight',
    postStudy:  'Up to 4 years (Visa 485)',
    ielts:      '6.0 – 7.0',
    intake:     'Feb & July',
    universities: ['University of Melbourne', 'University of Sydney', 'Australian National University', 'University of Queensland'],
    why:        'Australia offers one of the most generous post-study work visas in the world. High acceptance rates for Nepali students, strong Nepali community, and a clear pathway to permanent residency make it the #1 choice.',
  },
  {
    code:       'ca',
    name:       'Canada',
    flag:       '🇨🇦',
    tagline:    'Best PR Pathway for Nepali Students',
    tuition:    'CAD 15,000 – 35,000 / yr',
    work:       '20 hrs / week',
    postStudy:  'Up to 3 years (PGWP)',
    ielts:      '6.0 – 6.5',
    intake:     'Jan, May & Sep',
    universities: ['University of Toronto', 'University of British Columbia', 'McGill University', 'University of Waterloo'],
    why:        'Canada\'s Post-Graduate Work Permit (PGWP) leads directly to permanent residency through Express Entry. Affordable living costs compared to the US and strong demand for international talent.',
  },
  {
    code:       'gb',
    name:       'United Kingdom',
    flag:       '🇬🇧',
    tagline:    'Shorter Programs, Globally Ranked',
    tuition:    'GBP 12,000 – 25,000 / yr',
    work:       '20 hrs / week',
    postStudy:  '2 years (Graduate Route)',
    ielts:      '6.0 – 7.0',
    intake:     'Sep & Jan',
    universities: ['University of Manchester', 'University of Leeds', 'University of Birmingham', 'University of Sheffield'],
    why:        'UK degrees are typically 3 years (Bachelor) and 1 year (Master) — saving time and money. The 2-year Graduate Route visa lets you work freely after graduation without needing a job offer.',
  },
  {
    code:       'us',
    name:       'USA',
    flag:       '🇺🇸',
    tagline:    'Research & STEM Excellence',
    tuition:    'USD 20,000 – 50,000 / yr',
    work:       '20 hrs / week (on-campus)',
    postStudy:  '1–3 years OPT / STEM OPT',
    ielts:      '6.5 – 7.5',
    intake:     'Aug & Jan',
    universities: ['New York University', 'Boston University', 'Purdue University', 'University of Illinois'],
    why:        'The USA hosts the world\'s most prestigious universities and research opportunities. STEM graduates benefit from a 3-year OPT extension, with access to the largest tech job market globally.',
  },
  {
    code:       'nz',
    name:       'New Zealand',
    flag:       '🇳🇿',
    tagline:    'Safe, Scenic & Student-Friendly',
    tuition:    'NZD 22,000 – 45,000 / yr',
    work:       '20 hrs / week',
    postStudy:  'Up to 3 years (PGWV)',
    ielts:      '6.0 – 6.5',
    intake:     'Feb & July',
    universities: ['University of Auckland', 'Victoria University of Wellington', 'University of Otago', 'Lincoln University'],
    why:        'New Zealand offers a safe, welcoming environment and one of the highest quality-of-life rankings in the world. The Post-Study Work Visa allows up to 3 years of open work rights, with a clear pathway toward residency for skilled graduates.',
  },
]

const StatBox = ({ label, value }) => (
  <div className="dt-stat">
    <div className="dt-stat-label">{label}</div>
    <div className="dt-stat-value">{value}</div>
  </div>
)

export default function DestinationTabs() {
  const [active, setActive] = useState(0)
  const panelRef = useRef(null)
  const c = countries[active]

  function switchTab(i) {
    const el = panelRef.current
    if (!el) { setActive(i); return }
    el.style.opacity = '0'
    el.style.transform = 'translateY(10px)'
    setTimeout(() => {
      setActive(i)
      el.style.opacity = '1'
      el.style.transform = 'translateY(0)'
    }, 160)
  }

  return (
    <section className="dest-tabs" id="dest-details">
      <div className="wrap">

        <div className="reveal" style={{ textAlign:'center', marginBottom: 40 }}>
          <span className="badge badge-light">Country Guides</span>
          <h2 className="s-title s-title-lg">
            Explore Your <em>Destination</em>
          </h2>
        </div>

        {/* Tab strip */}
        <div className="dt-tabs reveal">
          {countries.map((cn, i) => (
            <button
              key={cn.code}
              className={`dt-tab${active === i ? ' active' : ''}`}
              onClick={() => switchTab(i)}
            >
              <img
                src={`https://flagcdn.com/w40/${cn.code}.png`}
                alt={cn.name}
                className="dt-tab-flag"
              />
              <span>{cn.name}</span>
            </button>
          ))}
        </div>

        {/* Detail panel */}
        <div className="dt-panel reveal" ref={panelRef}>

          {/* Left */}
          <div className="dt-left">
            <img
              src={`https://flagcdn.com/w160/${c.code}.png`}
              alt={c.name}
              className="dt-flag-hero"
            />
            <div className="dt-country-name">{c.flag} {c.name}</div>
            <div className="dt-tagline">{c.tagline}</div>
            <p className="dt-why">{c.why}</p>
            <a href="#contact" className="btn-pill btn-blue" style={{ marginTop: 8 }}>
              Apply for {c.name}
              <span className="arrow-circle">→</span>
            </a>
          </div>

          {/* Right */}
          <div className="dt-right">
            <div className="dt-stats-grid">
              <StatBox label="Average Tuition"      value={c.tuition} />
              <StatBox label="Work Rights"           value={c.work} />
              <StatBox label="Post-Study Visa"       value={c.postStudy} />
              <StatBox label="IELTS Requirement"     value={c.ielts} />
              <StatBox label="Intakes"               value={c.intake} />
            </div>

            <div className="dt-unis">
              <div className="dt-unis-title">Top Partner Universities</div>
              <div className="dt-unis-list">
                {c.universities.map(u => (
                  <div className="dt-uni" key={u}>
                    <span className="dt-uni-dot" />
                    {u}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
