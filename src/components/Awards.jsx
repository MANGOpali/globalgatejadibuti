const IconRosette = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l2.09 4.26L18.5 7.1l-3.25 3.16.77 4.47L12 12.5l-4.02 2.23.77-4.47L5.5 7.1l4.41-.84z"/>
    <circle cx="12" cy="12" r="3"/>
    <path d="M12 15v4M10 19h4"/>
  </svg>
)
const IconShieldStar = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <path d="M12 8l1.09 2.26L16 10.73l-2 1.96.47 2.77L12 14.25l-2.47 1.21.47-2.77-2-1.96 2.91-.47z"/>
  </svg>
)
const IconGradCap = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
)
const IconGlobe = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
  </svg>
)

const awards = [
  { Icon: IconRosette,   title: 'Best Educational Consultancy',    year: 'Nepal 2023' },
  { Icon: IconShieldStar,title: 'Top Visa Success Rate Award',     year: 'Australia 2022' },
  { Icon: IconGradCap,   title: 'Excellence in Student Counseling',year: 'Canada Partner 2023' },
  { Icon: IconGlobe,     title: 'Global Education Partner of Year',year: 'UK Universities 2022' },
]

export default function Awards() {
  return (
    <section className="awards">
      <div className="wrap">
        <div className="awards-header">
          <span className="badge badge-light">Recognition</span>
          <h2 className="s-title s-title-lg">
            Awards &amp; <em>Achievements</em>
          </h2>
        </div>
        <div className="awards-grid reveal-group">
          {awards.map(({ Icon, title, year }) => (
            <div className="award-card" key={title}>
              <div className="award-icon-wrap">
                <Icon />
              </div>
              <div className="award-title">{title}</div>
              <div className="award-year">{year}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
