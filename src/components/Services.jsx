const rows = [
  {
    num: '01',
    title: 'Career & University Counseling',
    desc: 'One-on-one expert counseling to match your academic background, career goals, and budget with the perfect university and course. We shortlist the best options for your profile.',
    bullets: ['Course & program selection', 'University shortlisting', 'Scholarship identification', 'Profile evaluation'],
  },
  {
    num: '02',
    title: 'Visa Application Assistance',
    desc: 'Our experienced visa team guides you through every step of the application process with a 98% approval track record across all 8 destinations we serve.',
    bullets: ['Document checklist & preparation', 'SOP & LOR writing support', 'Visa interview coaching', 'Application submission'],
  },
  {
    num: '03',
    title: 'University Admission Support',
    desc: 'We handle your entire university application — from selecting the right program to receiving your official offer letter and enrollment confirmation.',
    bullets: ['Application form filling', 'Transcript evaluation', 'Conditional offer follow-up', 'Enrollment confirmation'],
  },
  {
    num: '04',
    title: 'Test Preparation Classes',
    desc: 'In-house coaching for IELTS, PTE, TOEFL, and GRE by experienced instructors. Small batch sizes, weekly mock tests, and flexible morning/evening schedules.',
    bullets: ['IELTS · PTE · TOEFL · GRE', 'Small batches (10–15 students)', 'Weekly full mock tests', 'Score guarantee programs'],
  },
  {
    num: '05',
    title: 'Pre-Departure Orientation',
    desc: 'Comprehensive briefing to prepare you for life abroad — accommodation, banking, transport, cultural adjustment, and alumni network connections in your destination country.',
    bullets: ['Accommodation guidance', 'Travel & insurance tips', 'Cultural orientation', 'Alumni network access'],
  },
  {
    num: '06',
    title: 'Scholarship & Financial Aid',
    desc: 'We identify and apply for scholarships and financial aid opportunities to significantly reduce your total cost of education abroad. Merit-based and government options covered.',
    bullets: ['Merit scholarship search', 'Government scholarships', 'Financial aid applications', 'Education loan guidance'],
  },
]

export default function Services() {
  return (
    <section className="services" id="services">
      <div className="wrap">
        <div className="svc-header">
          <span className="badge badge-light">Our Services</span>
          <h2 className="s-title s-title-lg">
            Everything You Need,<br />
            <em>All Under One Roof</em>
          </h2>
          <p className="s-body" style={{ margin: '0 auto' }}>
            From your first counseling session to the day you land abroad —
            complete, professional support at every stage of your journey.
          </p>
        </div>

        <div className="svc-rows">
          {rows.map(r => (
            <div className="svc-row reveal" key={r.num}>
              <div className="svc-left">
                <span className="svc-row-num">{r.num}</span>
                <div>
                  <div className="svc-row-title">{r.title}</div>
                </div>
              </div>
              <div className="svc-right">
                <p className="svc-row-desc">{r.desc}</p>
                <ul className="svc-bullets">
                  {r.bullets.map(b => <li key={b}>{b}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
