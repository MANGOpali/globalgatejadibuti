import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { SectionHead } from './ui'

const rows = [
  [
    { n: '01', tone: '', title: 'Career & University Counseling', desc: 'One-on-one counseling to match your background, goals and budget with the right university and course.', cta: 'Discover', href: '#contact' },
    { n: '02', tone: 'navy', title: 'University Admission Support', desc: 'We handle your whole application — from choosing a program to your offer letter and enrollment.', cta: 'Apply', href: '#contact' },
    { n: '03', tone: 'red', title: 'IELTS & PTE Preparation', desc: 'In-house IELTS and PTE classes. Small batches, weekly mock tests, morning and evening schedules.', cta: 'Enroll', to: '/ielts-classes-jadibuti' },
  ],
  [
    { n: '04', tone: '', title: 'Scholarship & Financial Aid', desc: 'We find and apply for merit-based and government scholarships to cut your total cost.', cta: 'Find funding', to: '/scholarships' },
    { n: '05', tone: 'navy', title: 'Visa Application Assistance', desc: 'Every step of the visa process, guided by a team with a 98% approval track record.', cta: 'Start visa', to: '/uk-student-visa-process' },
    { n: '06', tone: '', title: 'Pre-Departure Orientation', desc: 'Accommodation, banking, transport, culture — plus alumni contacts in your new city.', cta: 'Prepare', href: '#contact' },
  ],
]

export default function Services() {
  return (
    <section className="section" id="services">
      <div className="wrap section-rule">
        <SectionHead
          label="OUR SERVICES"
          title="From first question to first lecture."
          aside="Six services, one team — so nothing gets lost between your counselor, your test and your visa."
        />
        <div className="svc-rows">
          {rows.map((row, r) => (
            <div className="svc-row" key={r}>
              {row.map((s, i) => (
                <Fragment key={s.n}>
                  {i > 0 && <div className="conn" aria-hidden="true"><i className={s.tone === 'navy' ? 'red' : ''} /></div>}
                  <div className={`svc-card ${s.tone}`}>
                    <span className="n">{s.n}</span>
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                    {s.to
                      ? <Link to={s.to} className="chip-btn">{s.cta}</Link>
                      : <a href={s.href} className="chip-btn">{s.cta}</a>}
                  </div>
                </Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
