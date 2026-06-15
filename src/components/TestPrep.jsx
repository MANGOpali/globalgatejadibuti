const tests = [
  {
    name: 'IELTS',
    full: 'International English Language Testing System',
    features: [
      'Academic & General Training modules',
      'Expert British Council-aligned tutors',
      'Full mock tests every week',
      'Target band 6.5 – 8.0+',
      'Flexible morning & evening batches',
    ],
  },
  {
    name: 'PTE',
    full: 'Pearson Test of English Academic',
    features: [
      'Computer-based test preparation',
      'AI-powered practice platform',
      'Proven high-scoring strategies',
      'Target score 65 – 90+',
      'Fast-track 4-week intensive course',
    ],
  },
  {
    name: 'TOEFL',
    full: 'Test of English as a Foreign Language',
    features: [
      'iBT format full preparation',
      'Reading, Listening, Speaking & Writing',
      'US & Canadian university focused',
      'Target score 90 – 110+',
      'Intensive weekend class options',
    ],
  },
  {
    name: 'GRE',
    full: 'Graduate Record Examinations',
    features: [
      'Verbal & Quantitative Reasoning',
      'Analytical Writing mastery',
      'For Masters & PhD applicants',
      'Target score 310 – 330+',
      'Small-group personal mentoring',
    ],
  },
]

export default function TestPrep() {
  return (
    <section className="testprep" id="testprep">
      <div className="container">
        <div style={{ maxWidth: 600 }}>
          <div className="label-tag">Test Preparation</div>
          <h2 className="section-heading">
            Score High,<br /><span>Study Abroad</span>
          </h2>
          <p className="section-body">
            In-house coaching by experienced instructors designed to get you
            the score your dream university requires — guaranteed.
          </p>
        </div>

        <div className="testprep-grid">
          {tests.map(t => (
            <div className="tp-card" key={t.name}>
              <div className="tp-badge"><span>{t.name}</span></div>
              <div>
                <div className="tp-name">{t.name}</div>
                <div className="tp-full">{t.full}</div>
                <ul className="tp-features">
                  {t.features.map(f => <li key={f}>{f}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
