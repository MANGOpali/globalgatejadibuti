const features = [
  { icon: '🏆', title: 'Proven Track Record',        desc: '5,000+ students placed across 8 countries with a 98% visa approval rate.' },
  { icon: '👨‍🏫', title: 'Certified Counselors',       desc: 'Qualified education consultants with real international study experience.' },
  { icon: '📍', title: 'Local Jadibuti Office',       desc: 'In-person guidance without the commute — right here in your neighbourhood.' },
  { icon: '🔍', title: 'Transparent Advice',          desc: "We recommend what's genuinely right for you — not what pays us the most." },
  { icon: '⚡', title: 'Fast Processing',             desc: 'Streamlined systems mean faster applications and quicker offer letters.' },
  { icon: '🤝', title: 'Post-Arrival Support',        desc: 'Our support continues after you land — alumni network in every destination.' },
]

const steps = [
  'Free Initial Counseling Session',
  'University & Course Shortlisting',
  'Document & Application Preparation',
  'Offer Letter & Visa Application',
  'Pre-Departure Orientation Briefing',
  'Fly, Settle & Start Your Journey!',
]

export default function WhyChooseUs() {
  return (
    <section className="why" id="why">
      <div className="container">
        <div className="why-grid">

          <div>
            <div className="label-tag">Why Choose Us</div>
            <h2 className="section-heading">
              Why Students Trust<br /><span>Global Gate Jadibuti</span>
            </h2>
            <div className="why-features">
              {features.map(f => (
                <div className="wf" key={f.title}>
                  <div className="wf-icon">{f.icon}</div>
                  <div className="wf-title">{f.title}</div>
                  <div className="wf-desc">{f.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="process-box">
            <div className="process-box-title">How It Works</div>
            <div className="process-box-sub">Your study-abroad journey in 6 simple steps</div>
            <div className="steps">
              {steps.map((s, i) => (
                <div className="step" key={s}>
                  <div className="step-n">{i + 1}</div>
                  <div className="step-t">{s}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
