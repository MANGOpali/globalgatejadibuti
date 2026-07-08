import { useEffect } from 'react'
import { Link, useLocation, Navigate } from 'react-router-dom'
import { getDestinationBySlug, destinations } from '../data/destinations'
import { getPostBySlug } from '../data/blogPosts'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsApp from '../components/WhatsApp'
import Cursor from '../components/Cursor'
import FloatingDot from '../components/FloatingDot'

export default function DestinationPage() {
  const { pathname } = useLocation()
  const slug = pathname.replace(/^\//, '')
  const dest = getDestinationBySlug(slug)

  useEffect(() => {
    if (!dest) return
    const url = `https://globalgateconsultancyjadibuti.com.np/${dest.slug}`

    document.title = dest.metaTitle

    const setMeta = (sel, attr, val) => {
      const el = document.querySelector(sel)
      if (el) el.setAttribute(attr, val)
    }

    setMeta('meta[name="description"]',        'content', dest.metaDescription)
    setMeta('link[rel="canonical"]',           'href',    url)
    setMeta('meta[property="og:title"]',       'content', dest.metaTitle)
    setMeta('meta[property="og:description"]', 'content', dest.metaDescription)
    setMeta('meta[property="og:image"]',       'content', dest.heroImg)
    setMeta('meta[property="og:url"]',         'content', url)
    setMeta('meta[name="twitter:title"]',      'content', dest.metaTitle)
    setMeta('meta[name="twitter:description"]','content', dest.metaDescription)
    setMeta('meta[name="twitter:image"]',      'content', dest.heroImg)

    window.scrollTo(0, 0)

    const breadcrumb = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home',         item: 'https://globalgateconsultancyjadibuti.com.np/' },
        { '@type': 'ListItem', position: 2, name: 'Destinations', item: 'https://globalgateconsultancyjadibuti.com.np/#destinations' },
        { '@type': 'ListItem', position: 3, name: `Study in ${dest.country}`, item: url },
      ],
    }

    const ldEducation = {
      '@context': 'https://schema.org',
      '@type': 'EducationalOrganization',
      name: 'Global Gate Educational Consultancy — Jadibuti Branch',
      url: 'https://globalgateconsultancyjadibuti.com.np',
      description: dest.metaDescription,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Jadibuti, Kathmandu',
        addressCountry: 'NP',
      },
    }

    const inject = (id, data) => {
      let s = document.getElementById(id)
      if (!s) { s = document.createElement('script'); s.id = id; s.type = 'application/ld+json'; document.head.appendChild(s) }
      s.textContent = JSON.stringify(data)
    }

    inject('dest-breadcrumb-ld', breadcrumb)
    inject('dest-edu-ld', ldEducation)

    return () => {
      ['dest-breadcrumb-ld', 'dest-edu-ld'].forEach(id => { const s = document.getElementById(id); if (s) s.remove() })
      setMeta('link[rel="canonical"]',           'href',    'https://globalgateconsultancyjadibuti.com.np/')
      setMeta('meta[property="og:url"]',         'content', 'https://globalgateconsultancyjadibuti.com.np/')
      setMeta('meta[property="og:title"]',       'content', 'Best UK Consultancy in Nepal — Global Gate Jadibuti | Exclusive UK University Partner')
      setMeta('meta[property="og:description"]', 'content', "Nepal's exclusive authorized UK university consultancy in Jadibuti, Kathmandu.")
      setMeta('meta[property="og:image"]',       'content', 'https://globalgateconsultancyjadibuti.com.np/hearder.webp')
      setMeta('meta[name="twitter:title"]',      'content', 'Best UK Consultancy in Nepal — Global Gate Jadibuti')
      setMeta('meta[name="twitter:description"]','content', "Nepal's exclusive UK university partner in Jadibuti.")
      setMeta('meta[name="twitter:image"]',      'content', 'https://globalgateconsultancyjadibuti.com.np/hearder.webp')
    }
  }, [dest])

  if (!dest) return <Navigate to="/" replace />

  const relatedPosts = dest.relatedSlugs.map(s => getPostBySlug(s)).filter(Boolean)
  const otherDests = destinations.filter(d => d.slug !== slug)

  return (
    <>
      <Cursor />
      <FloatingDot />
      <Navbar />

      <main>

        {/* ── Hero ── */}
        <div className="dp-hero" style={{ backgroundImage: `url(${dest.heroImg})` }}>
          <div className="dp-hero-overlay" />
          <div className="wrap dp-hero-content">
            <nav className="bpp-breadcrumb" aria-label="breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              <Link to="/#destinations">Destinations</Link>
              <span>/</span>
              <span>{dest.country}</span>
            </nav>
            <div className="dp-hero-flag">
              <img
                src={`https://flagcdn.com/w80/${dest.flagCode}.png`}
                alt={`${dest.country} flag`}
                width="56"
                height="40"
              />
            </div>
            <span className="badge badge-dark">{dest.tagline}</span>
            <h1 className="dp-h1">Study in {dest.country}<br /><em>from Nepal</em></h1>
            <div className="dp-hero-stats">
              {dest.stats.map(s => (
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
              <a href="#process" className="btn-pill btn-ghost">
                See Process <span className="arrow-circle">→</span>
              </a>
            </div>
          </div>
        </div>

        {/* ── Intro ── */}
        <section className="dp-section dp-intro-section">
          <div className="wrap dp-two-col">
            <div className="dp-intro-text">
              <span className="badge badge-light">Why {dest.country}?</span>
              <h2 className="s-title s-title-lg" style={{ marginTop: 12 }}>
                Your Future Starts<br /><em>Here</em>
              </h2>
              <p className="blockquote" style={{ marginBottom: 0 }}>{dest.intro}</p>
            </div>
            <div className="dp-requirements-card">
              <div className="dp-req-title">Key Requirements</div>
              {dest.requirements.map(r => (
                <div className="dp-req-row" key={r.label}>
                  <span className="dp-req-label">{r.label}</span>
                  <span className="dp-req-value">{r.value}</span>
                </div>
              ))}
              <Link to="/#contact" className="btn-pill btn-blue" style={{ marginTop: 20, width: '100%', justifyContent: 'center' }}>
                Check My Eligibility <span className="arrow-circle">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── Why Study ── */}
        <section className="dp-section dp-why-section">
          <div className="wrap">
            <div className="dp-section-header">
              <span className="badge badge-light">Top Reasons</span>
              <h2 className="s-title s-title-lg" style={{ marginTop: 12 }}>
                Why Study in {dest.country}?
              </h2>
            </div>
            <div className="dp-why-grid">
              {dest.whyStudy.map((w, i) => (
                <div className="dp-why-card" key={w.title}>
                  <div className="dp-why-num">0{i + 1}</div>
                  <h3 className="dp-why-title">{w.title}</h3>
                  <p className="dp-why-desc">{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Universities ── */}
        <section className="dp-section dp-unis-section">
          <div className="wrap">
            <div className="dp-unis-grid">
              <div>
                <span className="badge badge-dark">Top Institutions</span>
                <h2 className="s-title s-title-lg s-title-white" style={{ marginTop: 12 }}>
                  Universities We<br /><em>Work With</em>
                </h2>
                <p className="blockquote blockquote-white">
                  Global Gate Jadibuti has established relationships with these and many more leading institutions in {dest.country}. We match your profile to the right university — not just the most popular one.
                </p>
                <Link to="/#contact" className="btn-pill btn-white" style={{ marginTop: 24 }}>
                  Get University Shortlist <span className="arrow-circle">→</span>
                </Link>
              </div>
              <ul className="dp-unis-list">
                {dest.universities.map(u => (
                  <li key={u} className="dp-uni-item">
                    <span className="dp-uni-dot" />
                    {u}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Process ── */}
        <section className="dp-section dp-process-section" id="process">
          <div className="wrap">
            <div className="dp-section-header">
              <span className="badge badge-light">Step by Step</span>
              <h2 className="s-title s-title-lg" style={{ marginTop: 12 }}>
                How We Get You There
              </h2>
              <p className="s-body" style={{ maxWidth: 520, margin: '8px auto 0' }}>
                From your first visit to our Jadibuti office to landing at {dest.country === 'United States' ? 'a US' : dest.country === 'United Kingdom' ? 'a UK' : `${dest.country.split(' ')[0]}`} airport — here is exactly what happens.
              </p>
            </div>
            <div className="dp-steps">
              {dest.steps.map((step, i) => (
                <div className="dp-step" key={i}>
                  <div className="dp-step-num">{String(i + 1).padStart(2, '0')}</div>
                  <div className="dp-step-text">{step}</div>
                </div>
              ))}
            </div>
            <div className="dp-process-cta">
              <div className="dp-pcta-text">
                <strong>Ready to start?</strong> Walk into our Jadibuti office any day Sun–Fri, 8AM–6PM. No appointment needed for your first session.
              </div>
              <Link to="/#contact" className="btn-pill btn-blue">
                Book Free Session <span className="arrow-circle">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── Related Blog Posts ── */}
        {relatedPosts.length > 0 && (
          <section className="dp-section dp-blog-section">
            <div className="wrap">
              <div className="dp-section-header">
                <span className="badge badge-light">Learn More</span>
                <h2 className="s-title s-title-lg" style={{ marginTop: 12 }}>
                  {dest.country} Study Guides
                </h2>
              </div>
              <div className="dp-blog-grid">
                {relatedPosts.map(post => (
                  <Link to={`/blog/${post.slug}`} key={post.slug} className="dp-blog-card">
                    <img src={post.img} alt={post.title} className="dp-blog-img" loading="lazy" />
                    <div className="dp-blog-body">
                      <span className="badge badge-light" style={{ fontSize: '0.65rem' }}>{post.category}</span>
                      <div className="dp-blog-title">{post.title}</div>
                      <div className="dp-blog-meta">{post.date} · {post.readTime}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Other Destinations ── */}
        <section className="dp-section dp-other-section">
          <div className="wrap">
            <div className="dp-section-header">
              <span className="badge badge-light">Explore More</span>
              <h2 className="s-title s-title-lg" style={{ marginTop: 12 }}>Other Destinations</h2>
            </div>
            <div className="dp-other-grid">
              {otherDests.map(d => (
                <Link to={`/${d.slug}`} key={d.slug} className="dp-other-card">
                  <img src={`https://flagcdn.com/w80/${d.flagCode}.png`} alt={`${d.country} flag`} width="40" height="29" />
                  <div className="dp-other-name">{d.country}</div>
                  <div className="dp-other-arrow">→</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Bottom CTA ── */}
        <section className="dp-section dp-bottom-cta">
          <div className="wrap" style={{ textAlign: 'center' }}>
            <span className="badge badge-dark">Free Consultation</span>
            <h2 className="s-title s-title-lg s-title-white" style={{ marginTop: 12 }}>
              Start Your {dest.country} Journey<br /><em>Today</em>
            </h2>
            <p className="blockquote blockquote-white" style={{ maxWidth: 500, margin: '16px auto 28px' }}>
              Walk into our Jadibuti office or send us a message. Our counselors give you honest, personalized advice — completely free, no strings attached.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/#contact" className="btn-pill btn-white">
                Book Free Counseling <span className="arrow-circle">→</span>
              </Link>
              <a href="https://wa.me/9779862349049" target="_blank" rel="noreferrer" className="btn-pill btn-green">
                WhatsApp Us <span className="arrow-circle">→</span>
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
