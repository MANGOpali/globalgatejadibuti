import { useEffect } from 'react'
import { Link, useLocation, Navigate } from 'react-router-dom'
import { getLocalPageBySlug } from '../data/localPages'
import { getServicePageBySlug } from '../data/servicePages'
import { getDestinationBySlug } from '../data/destinations'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsApp from '../components/WhatsApp'
import Cursor from '../components/Cursor'
import FloatingDot from '../components/FloatingDot'

export default function LocalPage() {
  const { pathname } = useLocation()
  const slug = pathname.replace(/^\//, '')
  const page = getLocalPageBySlug(slug)

  useEffect(() => {
    if (!page) return
    const url = `https://globalgateconsultancyjadibuti.com.np/${page.slug}`

    document.title = page.metaTitle

    const setMeta = (sel, attr, val) => {
      const el = document.querySelector(sel)
      if (el) el.setAttribute(attr, val)
    }

    setMeta('meta[name="description"]',        'content', page.metaDescription)
    setMeta('link[rel="canonical"]',           'href',    url)
    setMeta('meta[property="og:title"]',       'content', page.metaTitle)
    setMeta('meta[property="og:description"]', 'content', page.metaDescription)
    setMeta('meta[property="og:image"]',       'content', page.heroImg)
    setMeta('meta[property="og:url"]',         'content', url)
    setMeta('meta[name="twitter:title"]',      'content', page.metaTitle)
    setMeta('meta[name="twitter:description"]','content', page.metaDescription)
    setMeta('meta[name="twitter:image"]',      'content', page.heroImg)

    window.scrollTo(0, 0)

    const breadcrumb = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://globalgateconsultancyjadibuti.com.np/' },
        { '@type': 'ListItem', position: 2, name: page.title, item: url },
      ],
    }

    const localBusiness = {
      '@context': 'https://schema.org',
      '@type': 'EducationalOrganization',
      name: 'Global Gate Educational Consultancy — Jadibuti Branch',
      url: 'https://globalgateconsultancyjadibuti.com.np/',
      telephone: '+977-1-5253297',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Jadibuti, Near Jadibuti Bus Park',
        addressLocality: 'Kathmandu',
        addressCountry: 'NP',
      },
      areaServed: page.areaName,
      openingHours: 'Su-Fr 08:00-18:00',
      description: page.metaDescription,
    }

    const faqSchema = page.faqs?.length ? {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: page.faqs.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    } : null

    const inject = (id, data) => {
      if (!data) return
      let s = document.getElementById(id)
      if (!s) { s = document.createElement('script'); s.id = id; s.type = 'application/ld+json'; document.head.appendChild(s) }
      s.textContent = JSON.stringify(data)
    }

    inject('lp-breadcrumb-ld', breadcrumb)
    inject('lp-localbiz-ld', localBusiness)
    inject('lp-faq-ld', faqSchema)

    return () => {
      ['lp-breadcrumb-ld', 'lp-localbiz-ld', 'lp-faq-ld'].forEach(id => { const s = document.getElementById(id); if (s) s.remove() })
      setMeta('link[rel="canonical"]',           'href',    'https://globalgateconsultancyjadibuti.com.np/')
      setMeta('meta[property="og:url"]',         'content', 'https://globalgateconsultancyjadibuti.com.np/')
      setMeta('meta[property="og:title"]',       'content', 'Best UK Consultancy in Nepal — Global Gate Jadibuti | Exclusive UK University Partner')
      setMeta('meta[property="og:description"]', 'content', "Nepal's exclusive authorized UK university consultancy in Jadibuti, Kathmandu.")
      setMeta('meta[property="og:image"]',       'content', 'https://globalgateconsultancyjadibuti.com.np/hearder.webp')
      setMeta('meta[name="twitter:title"]',      'content', 'Best UK Consultancy in Nepal — Global Gate Jadibuti')
      setMeta('meta[name="twitter:description"]','content', "Nepal's exclusive UK university partner in Jadibuti.")
      setMeta('meta[name="twitter:image"]',      'content', 'https://globalgateconsultancyjadibuti.com.np/hearder.webp')
    }
  }, [page])

  if (!page) return <Navigate to="/" replace />

  const relatedServices = (page.relatedSlugs || []).map(s => getServicePageBySlug(s)).filter(Boolean)
  const relatedDests    = (page.relatedDestSlugs || []).map(s => getDestinationBySlug(s)).filter(Boolean)

  return (
    <>
      <Cursor />
      <FloatingDot />
      <Navbar />

      <main>

        {/* ── Hero ── */}
        <div className="dp-hero" style={{ backgroundImage: `url(${page.heroImg})` }}>
          <div className="dp-hero-overlay" />
          <div className="wrap dp-hero-content">
            <nav className="bpp-breadcrumb" aria-label="breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              <span>{page.areaName}</span>
            </nav>
            <span className="badge badge-dark">{page.badge}</span>
            <h1 className="dp-h1">{page.title}</h1>
            <div className="dp-hero-stats">
              {page.stats.map(s => (
                <div className="dp-stat" key={s.l}>
                  <div className="dp-stat-n">{s.n}</div>
                  <div className="dp-stat-l">{s.l}</div>
                </div>
              ))}
            </div>
            <div className="dp-hero-btns">
              <Link to="/#contact" className="btn-pill btn-white">
                Book Free Counseling <span className="arrow-circle">→</span>
              </Link>
              <a href="#directions" className="btn-pill btn-ghost">
                Get Directions <span className="arrow-circle">→</span>
              </a>
            </div>
          </div>
        </div>

        {/* ── Intro + Office Card ── */}
        <section className="dp-section dp-intro-section">
          <div className="wrap dp-two-col">
            <div className="dp-intro-text">
              <span className="badge badge-light">{page.badge}</span>
              <h2 className="s-title s-title-lg" style={{ marginTop: 12 }}>
                Study Abroad from<br /><em>{page.areaName}</em>
              </h2>
              <p className="blockquote" style={{ marginBottom: 0 }}>{page.intro}</p>
            </div>
            <div className="dp-requirements-card">
              <div className="dp-req-title">Our Office</div>
              <div className="dp-req-row">
                <span className="dp-req-label">Address</span>
                <span className="dp-req-value">{page.officeInfo.address}</span>
              </div>
              <div className="dp-req-row">
                <span className="dp-req-label">Phone</span>
                <span className="dp-req-value">
                  <a href={`tel:${page.officeInfo.phone}`} style={{ color: 'inherit' }}>{page.officeInfo.phone}</a>
                </span>
              </div>
              <div className="dp-req-row">
                <span className="dp-req-label">WhatsApp</span>
                <span className="dp-req-value">
                  <a href="https://wa.me/9779862349049" target="_blank" rel="noreferrer" style={{ color: 'inherit' }}>{page.officeInfo.whatsapp}</a>
                </span>
              </div>
              <div className="dp-req-row">
                <span className="dp-req-label">Hours</span>
                <span className="dp-req-value">{page.officeInfo.hours}</span>
              </div>
              <div style={{ display: 'flex', gap: 10, marginTop: 20, flexWrap: 'wrap' }}>
                <Link to="/#contact" className="btn-pill btn-blue" style={{ flex: 1, justifyContent: 'center' }}>
                  Free Consultation <span className="arrow-circle">→</span>
                </Link>
                <a href="https://wa.me/9779862349049" target="_blank" rel="noreferrer" className="btn-pill btn-green" style={{ flex: 1, justifyContent: 'center' }}>
                  WhatsApp <span className="arrow-circle">→</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Directions ── */}
        <section className="dp-section sp-alt-section" id="directions">
          <div className="wrap">
            <div className="dp-section-header">
              <span className="badge badge-light">Getting Here</span>
              <h2 className="s-title s-title-lg" style={{ marginTop: 12 }}>
                How to Reach Us from {page.areaName}
              </h2>
            </div>
            <div className="lp-directions-grid">
              {page.directions.map((d, i) => (
                <div className="lp-direction-card" key={i}>
                  <div className="lp-dir-from">
                    <span className="lp-dir-icon">📍</span>
                    <strong>{d.from}</strong>
                  </div>
                  <p className="lp-dir-how">{d.how}</p>
                </div>
              ))}
            </div>
            <div className="lp-contact-strip">
              <span>Not sure? Call us and we will guide you:</span>
              <a href="tel:015253297" className="btn-pill btn-blue">
                📞 015253297 <span className="arrow-circle">→</span>
              </a>
            </div>
          </div>
        </section>

        {/* ── Why Choose Us from this area ── */}
        <section className="dp-section">
          <div className="wrap">
            <div className="dp-section-header">
              <span className="badge badge-light">Why Global Gate</span>
              <h2 className="s-title s-title-lg" style={{ marginTop: 12 }}>
                Why {page.areaName} Students<br />Choose Global Gate Jadibuti
              </h2>
            </div>
            <div className="dp-why-grid">
              {page.whyCards.map((card, i) => (
                <div className="dp-why-card" key={i}>
                  <div className="dp-why-num">0{i + 1}</div>
                  <h3 className="dp-why-title">{card.title}</h3>
                  <p className="dp-why-desc">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Services ── */}
        <section className="dp-section sp-alt-section">
          <div className="wrap">
            <div className="dp-section-header">
              <span className="badge badge-light">What We Offer</span>
              <h2 className="s-title s-title-lg" style={{ marginTop: 12 }}>
                Services Available at<br />Our Jadibuti Office
              </h2>
            </div>
            <div className="lp-services-grid">
              {page.services.map((svc, i) => (
                <div className="lp-service-card" key={i}>
                  <div className="lp-service-name">{svc.name}</div>
                  <div className="lp-service-detail">{svc.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        {page.faqs?.length > 0 && (
          <section className="dp-section sp-faq-section">
            <div className="wrap sp-faq-wrap">
              <div className="dp-section-header">
                <span className="badge badge-light">Common Questions</span>
                <h2 className="s-title s-title-lg" style={{ marginTop: 12 }}>
                  Questions from {page.areaName} Students
                </h2>
              </div>
              <div className="sp-faqs">
                {page.faqs.map((faq, i) => (
                  <details key={i} className="sp-faq-item">
                    <summary className="sp-faq-q">{faq.q}</summary>
                    <p className="sp-faq-a">{faq.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Related Services ── */}
        {relatedServices.length > 0 && (
          <section className="dp-section">
            <div className="wrap">
              <div className="dp-section-header">
                <span className="badge badge-light">Our Services</span>
                <h2 className="s-title s-title-lg" style={{ marginTop: 12 }}>
                  Explore Our Services
                </h2>
              </div>
              <div className="lp-services-links">
                {relatedServices.map(svc => (
                  <Link to={`/${svc.slug}`} key={svc.slug} className="lp-service-link-card">
                    <div className="lp-slc-title">{svc.title}</div>
                    <div className="lp-slc-arrow">→</div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Destinations ── */}
        {relatedDests.length > 0 && (
          <section className="dp-section sp-alt-section">
            <div className="wrap">
              <div className="dp-section-header">
                <span className="badge badge-light">Destinations</span>
                <h2 className="s-title s-title-lg" style={{ marginTop: 12 }}>
                  Where We Can Send You
                </h2>
              </div>
              <div className="dp-other-grid" style={{ justifyContent: 'center' }}>
                {relatedDests.map(d => (
                  <Link to={`/${d.slug}`} key={d.slug} className="dp-other-card">
                    <img src={`https://flagcdn.com/w80/${d.flagCode}.png`} alt={`${d.country} flag`} width="40" height="29" />
                    <div className="dp-other-name">{d.country}</div>
                    <div className="dp-other-arrow">→</div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Bottom CTA ── */}
        <section className="dp-section dp-bottom-cta">
          <div className="wrap" style={{ textAlign: 'center' }}>
            <span className="badge badge-dark">Free Consultation · {page.areaName}</span>
            <h2 className="s-title s-title-lg s-title-white" style={{ marginTop: 12 }}>
              Start Your Journey<br /><em>Today — Free</em>
            </h2>
            <p className="blockquote blockquote-white" style={{ maxWidth: 520, margin: '16px auto 28px' }}>
              Visit us at Jadibuti — just {page.stats[0].n} from {page.areaName}. Or reach us by phone or WhatsApp right now. The first consultation is completely free.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/#contact" className="btn-pill btn-white">
                Book Free Session <span className="arrow-circle">→</span>
              </Link>
              <a href="https://wa.me/9779862349049" target="_blank" rel="noreferrer" className="btn-pill btn-green">
                WhatsApp Us <span className="arrow-circle">→</span>
              </a>
              <a href="tel:015253297" className="btn-pill btn-ghost">
                Call 015253297 <span className="arrow-circle">→</span>
              </a>
            </div>
          </div>
        </section>

      </main>

      <Footer />
      <WhatsApp />
    </>
  )
}
