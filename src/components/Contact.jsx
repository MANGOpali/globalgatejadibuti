import { useState } from 'react'
import emailjs from '@emailjs/browser'

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.09 10.8 19.79 19.79 0 01.07 2.18 2 2 0 012.05 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
  </svg>
)
const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
)
const PinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
)
const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
)
const ArrowUpRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:12,height:12}}>
    <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
  </svg>
)

const INFO = [
  { Icon: PhoneIcon, label: 'Telephone',    value: '015253297',                          sub: 'Sun–Fri  8 AM – 6 PM',     href: 'tel:015253297' },
  { Icon: PhoneIcon, label: 'WhatsApp',    value: '+977 986-2349049',                   sub: 'Chat with us on WhatsApp',  href: 'https://wa.me/9779862349049' },
  { Icon: MailIcon,  label: 'Email Us',     value: 'globalgateedu.jadibuti@gmail.com',   sub: 'We reply within 24 hours', href: 'mailto:globalgateedu.jadibuti@gmail.com' },
  { Icon: PinIcon,   label: 'Visit Us',     value: 'Jadibuti, Kathmandu',                sub: 'Near Jadibuti Bus Park',   href: 'https://maps.google.com/?q=M9F3%2BVC9+Kathmandu+44600+Nepal' },
  { Icon: ClockIcon, label: 'Office Hours', value: 'Sun–Fri: 8 AM – 6 PM',              sub: 'Saturday: Closed',         href: null },
]

const DESTINATIONS = ['Australia', 'Canada', 'New Zealand', 'United Kingdom', 'USA', 'Not decided yet']
const SERVICES     = ['University Admission', 'Visa Assistance', 'IELTS / PTE Preparation', 'Scholarship Guidance', 'Career Counseling', 'Pre-Departure Support']

export default function Contact() {
  const [form,    setForm]    = useState({ name: '', phone: '', email: '', destination: '', service: '', message: '' })
  const [sent,    setSent]    = useState(false)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState(false)

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true); setError(false)
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          title:       `New Inquiry – ${form.name}`,
          name:        form.name,
          email:       form.email,
          from_name:   form.name,
          from_phone:  form.phone,
          from_email:  form.email,
          destination: form.destination,
          service:     form.service,
          message:     form.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      setSent(true)
    } catch { setError(true) }
    finally { setLoading(false) }
  }

  return (
    <section className="contact" id="contact">

      <div className="wrap">

        {/* Top heading */}
        <div className="contact-top-label">
          <span className="badge badge-dark">Contact Us</span>
          <h2 className="contact-top-title">Get In Touch</h2>
        </div>

        <div className="contact-card">

          {/* ── Left panel ── */}
          <div className="cp-left">

            <div className="cp-left-top">
              <h2 className="cp-title">Let's Start<br />Your Journey.</h2>
              <p className="cp-desc">
                Ready to study abroad? Our counselors guide you every step —
                from university selection to your visa approval.
              </p>
            </div>

            <div className="cp-info-list">
              {INFO.map(({ Icon, label, value, sub, href }) => (
                <a
                  key={label}
                  className="cp-info-item"
                  href={href || undefined}
                  target={href?.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                >
                  <div className="cp-info-icon"><Icon /></div>
                  <div className="cp-info-text">
                    <span className="cp-info-label">{label}</span>
                    <span className="cp-info-value">{value}</span>
                    <span className="cp-info-sub">{sub}</span>
                  </div>
                </a>
              ))}
            </div>

            <a
              href="https://maps.google.com/?q=M9F3%2BVC9+Kathmandu+44600+Nepal"
              target="_blank" rel="noreferrer"
              className="cp-maps-btn"
            >
              Open in Google Maps <ArrowUpRight />
            </a>

          </div>

          {/* ── Divider ── */}
          <div className="cp-divider" />

          {/* ── Right panel ── */}
          <div className="cp-right">
            <p className="cp-form-label">Send Us a Message</p>

            {sent ? (
              <div className="contact-success">
                <div className="cs-icon">✓</div>
                <div className="cs-title">Message Received!</div>
                <div className="cs-body">
                  Thank you, {form.name}. Our team will reach out within 24 hours.
                </div>
                <button className="btn-pill btn-white" style={{ marginTop: 32 }} onClick={() => setSent(false)}>
                  Send Another <span className="arrow-circle">→</span>
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="cf-row">
                  <div className="cf-field">
                    <label className="cf-label">Full Name *</label>
                    <input className="cf-input" type="text" placeholder="Ramesh Shrestha" value={form.name} onChange={set('name')} required />
                  </div>
                  <div className="cf-field">
                    <label className="cf-label">Phone Number *</label>
                    <input className="cf-input" type="tel" placeholder="+977-98XXXXXXXX" value={form.phone} onChange={set('phone')} required />
                  </div>
                </div>

                <div className="cf-field">
                  <label className="cf-label">Email Address</label>
                  <input className="cf-input" type="email" placeholder="your@email.com" value={form.email} onChange={set('email')} />
                </div>

                <div className="cf-row">
                  <div className="cf-field">
                    <label className="cf-label">Destination Country</label>
                    <select className="cf-input cf-select" value={form.destination} onChange={set('destination')}>
                      <option value="">Select country…</option>
                      {DESTINATIONS.map(d => <option key={d}>{d}</option>)}
                    </select>
                  </div>
                  <div className="cf-field">
                    <label className="cf-label">Service Needed</label>
                    <select className="cf-input cf-select" value={form.service} onChange={set('service')}>
                      <option value="">Select service…</option>
                      {SERVICES.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div className="cf-field">
                  <label className="cf-label">Your Message</label>
                  <textarea className="cf-input cf-textarea" placeholder="Tell us about your background, target intake, or any questions…" value={form.message} onChange={set('message')} rows={4} />
                </div>

                {error && (
                  <div className="cf-error">Something went wrong. Please call us directly or try again.</div>
                )}

                <div className="cf-submit-row">
                  <span className="cf-submit-hint">We reply within 24 hours.<br />No spam, ever.</span>
                  <button type="submit" className="btn-pill btn-white" disabled={loading}>
                    {loading ? 'Sending…' : 'Send Message'}
                    <span className="arrow-circle">{loading ? '…' : '→'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
