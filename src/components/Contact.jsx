import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { ArrowRight, Check } from './ui'
import { PHONE, PHONE_DISPLAY, WHATSAPP_DISPLAY, EMAIL, ADDRESS, HOURS, MAPS_URL, MAP_EMBED, waLink } from '../data/site'

const DESTINATIONS = ['United Kingdom', 'Australia', 'Canada', 'New Zealand', 'USA', 'Japan', 'South Korea', 'Not decided yet']
const SERVICES = ['University Admission', 'Visa Assistance', 'IELTS / PTE Preparation', 'AI Pre-CAS Interview Practice', 'Scholarship Guidance', 'Career Counseling', 'Pre-Departure Support']

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', destination: '', service: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.phone.trim()) { setError('Please add your name and phone number so we can reach you.'); return }
    setLoading(true); setError('')
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          title: `New Inquiry – ${form.name}`,
          name: form.name,
          email: form.email,
          from_name: form.name,
          from_phone: form.phone,
          from_email: form.email,
          destination: form.destination,
          service: form.service,
          message: form.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      setSent(true)
    } catch {
      setError('Something went wrong. Please call us directly or try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="section" id="contact" style={{ paddingTop: 88 }}>
      <div className="wrap">
        <span className="mono" style={{ display: 'block', marginBottom: 10 }}>CONTACT</span>
        <h2 className="h3" style={{ marginBottom: 36 }}>Visit us in Jadibuti, or send a message.</h2>
        <div className="contact-grid">
          <div className="form-card">
            {sent ? (
              <div className="form-success" role="status">
                <span className="tick"><Check /></span>
                <h3 style={{ fontWeight: 600, fontSize: 24 }}>Message received!</h3>
                <p className="serif muted">Thank you, {form.name}. Our team will reach out within 24 hours.</p>
                <button type="button" className="btn btn-line" onClick={() => { setSent(false); setForm({ name: '', phone: '', email: '', destination: '', service: '', message: '' }) }}>Send another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div className="form-row">
                  <label className="field">FULL NAME *
                    <input type="text" name="name" autoComplete="name" placeholder="Ramesh Shrestha" value={form.name} onChange={set('name')} required />
                  </label>
                  <label className="field">PHONE / WHATSAPP *
                    <input type="tel" name="phone" autoComplete="tel" placeholder="98XXXXXXXX" value={form.phone} onChange={set('phone')} required />
                  </label>
                  <label className="field">EMAIL
                    <input type="email" name="email" autoComplete="email" placeholder="you@email.com" value={form.email} onChange={set('email')} />
                  </label>
                  <label className="field">DESTINATION
                    <select name="destination" value={form.destination} onChange={set('destination')}>
                      <option value="">Select country…</option>
                      {DESTINATIONS.map(d => <option key={d}>{d}</option>)}
                    </select>
                  </label>
                </div>
                <label className="field">SERVICE NEEDED
                  <select name="service" value={form.service} onChange={set('service')}>
                    <option value="">Select service…</option>
                    {SERVICES.map(s => <option key={s}>{s}</option>)}
                  </select>
                </label>
                <label className="field">MESSAGE
                  <textarea name="message" rows={4} placeholder="Your grades, budget, target intake or any questions…" value={form.message} onChange={set('message')} />
                </label>
                {error && <div className="form-error" role="alert">{error}</div>}
                <div className="form-foot">
                  <small>We reply within 24 hours. No spam, ever.</small>
                  <button type="submit" className="btn btn-red" disabled={loading}>{loading ? 'Sending…' : <>Send message <ArrowRight /></>}</button>
                </div>
              </form>
            )}
          </div>

          <aside className="contact-side">
            <div className="info-card">
              <div><span className="mono">ADDRESS</span>{ADDRESS}</div>
              <div><span className="mono">HOURS</span>{HOURS} (closed Saturday)</div>
              <div><span className="mono">PHONE</span><a href={`tel:${PHONE}`}>{PHONE_DISPLAY}</a></div>
              <div><span className="mono">WHATSAPP</span><a href={waLink()} target="_blank" rel="noopener noreferrer">{WHATSAPP_DISPLAY}</a></div>
              <div><span className="mono">EMAIL</span><a href={`mailto:${EMAIL}`} style={{ wordBreak: 'break-all' }}>{EMAIL}</a></div>
              <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="link-u" style={{ alignSelf: 'flex-start' }}>Open in Google Maps ↗</a>
            </div>
            <div className="map-frame">
              <iframe title="Global Gate Jadibuti on Google Maps" src={MAP_EMBED} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
