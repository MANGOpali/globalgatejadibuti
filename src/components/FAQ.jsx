import { useState } from 'react'

const faqs = [
  {
    q: 'How long does the student visa process take?',
    a: 'Visa processing times vary by country. Australia and Canada typically take 4–8 weeks, the UK takes 3–4 weeks, and the USA can take 2–3 months. We submit your application as early as possible to avoid delays, and our 98% approval rate means you can count on us to get it right the first time.',
  },
  {
    q: 'Can I get a scholarship for studying abroad?',
    a: 'Yes — many universities offer merit-based and need-based scholarships for international students. We actively search for scholarship opportunities that match your academic profile, including government-funded programs in Denmark and Finland where tuition can be fully covered.',
  },
  {
    q: 'What IELTS score do I need for Australia or Canada?',
    a: 'Most Australian universities require a minimum IELTS band of 6.0–6.5 overall, with no band below 6.0. Canadian institutions typically require 6.0–6.5. Our in-house IELTS preparation classes are specifically designed to help you reach your target band.',
  },
  {
    q: 'Do you provide support after I arrive in my destination country?',
    a: 'Absolutely. Our support does not end at the airport. We conduct a comprehensive pre-departure briefing covering accommodation, banking, transport, and cultural adaptation. We also connect you with our alumni network in your destination country so you always have someone to reach out to.',
  },
  {
    q: 'I was rejected by another consultancy. Can you still help me?',
    a: 'Yes, we frequently help students who have faced rejections. Our team carefully reviews your previous application, identifies what went wrong — whether it was documentation, SOP quality, or university selection — and builds a stronger new application. Many of our successful students came to us after being rejected elsewhere.',
  },
  {
    q: 'Is the initial counseling session really free?',
    a: 'Yes, completely free and with no obligation. You can walk into our Jadibuti office any day from Sunday to Friday (8AM–6PM) for a face-to-face counseling session. We assess your profile and give you honest advice about the best options available to you.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)

  return (
    <section className="faq" id="faq">
      <div className="wrap">
        <div className="faq-grid">

          {/* Left */}
          <div>
            <span className="badge badge-light">Common Questions</span>
            <h2 className="s-title s-title-lg">
              Got Questions?<br />
              <em>We Have Answers</em>
            </h2>
            <p className="blockquote" style={{ marginBottom: 28 }}>
              Everything you need to know about studying abroad,
              visa requirements, scholarships, and how we can help
              you achieve your international education goals.
            </p>
            <a href="#contact" className="btn-pill btn-blue">
              Contact Us Directly
              <span className="arrow-circle">→</span>
            </a>
          </div>

          {/* Right — accordion */}
          <div>
            <div className="faq-items reveal-group">
              {faqs.map((f, i) => (
                <div className={`faq-item${open === i ? ' open' : ''}`} key={i}>
                  <button className="faq-q" onClick={() => setOpen(open === i ? null : i)}>
                    <span className="faq-q-text">{f.q}</span>
                    <span className="faq-icon">{open === i ? '−' : '+'}</span>
                  </button>
                  <div className="faq-a">
                    <p>{f.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
