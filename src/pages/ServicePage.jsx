import { useEffect } from 'react'
import { Link, useLocation, Navigate } from 'react-router-dom'
import { getServicePageBySlug } from '../data/servicePages'
import { getPostBySlug } from '../data/blogPosts'
import { getDestinationBySlug } from '../data/destinations'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsApp from '../components/WhatsApp'
import Cursor from '../components/Cursor'
import FloatingDot from '../components/FloatingDot'

export default function ServicePage() {
  const { pathname } = useLocation()
  const slug = pathname.replace(/^\//, '')
  const page = getServicePageBySlug(slug)

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
        { '@type': 'ListItem', position: 1, name: 'Home',     item: 'https://globalgateconsultancyjadibuti.com.np/' },
        { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://globalgateconsultancyjadibuti.com.np/#services' },
        { '@type': 'ListItem', position: 3, name: page.title, item: url },
      ],
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

    inject('sp-breadcrumb-ld', breadcrumb)
    inject('sp-faq-ld', faqSchema)

    return () => {
      ['sp-breadcrumb-ld', 'sp-faq-ld'].forEach(id => { const s = document.getElementById(id); if (s) s.remove() })
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

  const relatedPosts = (page.relatedBlogSlugs || []).map(s => getPostBySlug(s)).filter(Boolean)
  const relatedDests = (page.relatedSlugs || []).map(s => getDestinationBySlug(s)).filter(Boolean)

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
              <Link to="/#services">Services</Link>
              <span>/</span>
              <span>{page.badge}</span>
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
              <a href="#steps" className="btn-pill btn-ghost">
                See Process <span className="arrow-circle">→</span>
              </a>
            </div>
          </div>
        </div>

        {/* ── Intro + Quick Facts ── */}
        <section className="dp-section dp-intro-section">
          <div className="wrap dp-two-col">
            <div className="dp-intro-text">
              <span className="badge badge-light">{page.tagline}</span>
              <h2 className="s-title s-title-lg" style={{ marginTop: 12 }}>
                Everything You Need<br /><em>to Know</em>
              </h2>
              <p className="blockquote" style={{ marginBottom: 0 }}>{page.intro}</p>
            </div>
            <div className="dp-requirements-card">
              <div className="dp-req-title">At a Glance</div>
              {page.quickFacts.map(f => (
                <div className="dp-req-row" key={f.label}>
                  <span className="dp-req-label">{f.label}</span>
                  <span className="dp-req-value">{f.value}</span>
                </div>
              ))}
              <Link to="/#contact" className="btn-pill btn-blue" style={{ marginTop: 20, width: '100%', justifyContent: 'center' }}>
                Talk to a Counselor <span className="arrow-circle">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── Dynamic Sections ── */}
        {page.sections.map((section, si) => (
          section.type === 'cards' ? (
            <section key={si} className={`dp-section ${si % 2 === 0 ? '' : 'sp-alt-section'}`}>
              <div className="wrap">
                <div className="dp-section-header">
                  <h2 className="s-title s-title-lg">{section.heading}</h2>
                  {section.intro && <p className="s-body" style={{ maxWidth: 560, margin: '8px auto 0' }}>{section.intro}</p>}
                </div>
                <div className="dp-why-grid">
                  {section.items.map((item, ii) => (
                    <div className="dp-why-card" key={ii}>
                      <div className="dp-why-num">0{ii + 1}</div>
                      <h3 className="dp-why-title">{item.title}</h3>
                      <p className="dp-why-desc">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ) : (
            <section key={si} className={`dp-section ${si % 2 !== 0 ? '' : 'sp-alt-section'}`}>
              <div className="wrap">
                <div className="dp-section-header">
                  <h2 className="s-title s-title-lg">{section.heading}</h2>
                  {section.intro && <p className="s-body" style={{ maxWidth: 560, margin: '8px auto 0' }}>{section.intro}</p>}
                </div>
                <div className="sp-table">
                  {section.items.map((row, ri) => (
                    <div className="sp-table-row" key={ri}>
                      <div className="sp-table-label">{row.label}</div>
                      <div className="sp-table-value">{row.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )
        ))}

        {/* ── Steps ── */}
        {page.steps?.length > 0 && (
          <section className="dp-section dp-process-section" id="steps">
            <div className="wrap">
              <div className="dp-section-header">
                <span className="badge badge-light">Step by Step</span>
                <h2 className="s-title s-title-lg" style={{ marginTop: 12 }}>How It Works</h2>
              </div>
              <div className="dp-steps">
                {page.steps.map((step, i) => (
                  <div className="dp-step" key={i}>
                    <div className="dp-step-num">{String(i + 1).padStart(2, '0')}</div>
                    <div className="dp-step-text">{step}</div>
                  </div>
                ))}
              </div>
              <div className="dp-process-cta">
                <div className="dp-pcta-text">
                  <strong>Ready to begin?</strong> Walk into our Jadibuti office Sun–Fri, 8AM–6PM. First consultation is completely free.
                </div>
                <Link to="/#contact" className="btn-pill btn-blue">
                  Book Free Session <span className="arrow-circle">→</span>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* ── FAQ ── */}
        {page.faqs?.length > 0 && (
          <section className="dp-section sp-faq-section">
            <div className="wrap sp-faq-wrap">
              <div className="dp-section-header">
                <span className="badge badge-light">Common Questions</span>
                <h2 className="s-title s-title-lg" style={{ marginTop: 12 }}>Frequently Asked Questions</h2>
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

        {/* ── Related Destinations ── */}
        {relatedDests.length > 0 && (
          <section className="dp-section">
            <div className="wrap">
              <div className="dp-section-header">
                <span className="badge badge-light">Explore</span>
                <h2 className="s-title s-title-lg" style={{ marginTop: 12 }}>Related Destinations</h2>
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

        {/* ── Related Blog Posts ── */}
        {relatedPosts.length > 0 && (
          <section className="dp-section dp-blog-section">
            <div className="wrap">
              <div className="dp-section-header">
                <span className="badge badge-light">Further Reading</span>
                <h2 className="s-title s-title-lg" style={{ marginTop: 12 }}>Related Guides</h2>
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

        {/* ── Bottom CTA ── */}
        <section className="dp-section dp-bottom-cta">
          <div className="wrap" style={{ textAlign: 'center' }}>
            <span className="badge badge-dark">Free Consultation</span>
            <h2 className="s-title s-title-lg s-title-white" style={{ marginTop: 12 }}>
              Get Expert Guidance<br /><em>Today — Free</em>
            </h2>
            <p className="blockquote blockquote-white" style={{ maxWidth: 500, margin: '16px auto 28px' }}>
              Visit us at our Jadibuti office or contact us online. Our counselors give you honest, personalized advice at no cost.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/#contact" className="btn-pill btn-white">
                Book Free Session <span className="arrow-circle">→</span>
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
