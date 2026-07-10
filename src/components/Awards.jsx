const IconPartner = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <path d="M9 12l2 2 4-4"/>
  </svg>
)
const IconVisa = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="2"/>
    <path d="M2 10h20"/>
    <path d="M6 15h4M14 15h4"/>
  </svg>
)
const IconStudents = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
)
const IconYears = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 6v6l4 2"/>
  </svg>
)

const credentials = [
  {
    Icon: IconPartner,
    title: "Nepal's Exclusive UK University Partner",
    desc: 'Officially authorized by top UK universities — the only consultancy in Nepal with this direct partnership.',
  },
  {
    Icon: IconVisa,
    title: '98% Visa Approval Rate',
    desc: 'One of the highest student visa success rates in Nepal across UK, Australia, Canada, NZ & USA.',
  },
  {
    Icon: IconStudents,
    title: '5,000+ Students Placed',
    desc: 'Thousands of Nepali students successfully studying abroad — from Jadibuti to universities worldwide.',
  },
  {
    Icon: IconYears,
    title: '10+ Years of Experience',
    desc: 'Trusted by Nepali families since 2014 — backed by Global Gate\'s decade-long track record.',
  },
]

export default function Awards() {
  return (
    <section className="awards">
      <div className="wrap">
        <div className="awards-header">
          <span className="badge badge-light">Why Trust Us</span>
          <h2 className="s-title s-title-lg">
            Our Credentials &amp; <em>Track Record</em>
          </h2>
        </div>
        <div className="awards-grid reveal-group">
          {credentials.map(({ Icon, title, desc }) => (
            <div className="award-card" key={title}>
              <div className="award-icon-wrap">
                <Icon />
              </div>
              <div className="award-title">{title}</div>
              <div className="award-year">{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
