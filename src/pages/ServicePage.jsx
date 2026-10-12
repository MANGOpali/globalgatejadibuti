import { useEffect } from 'react'
import { Link, useLocation, Navigate } from 'react-router-dom'
import { getServicePageBySlug } from '../data/servicePages'
import { getPostBySlug } from '../data/blogPosts'
import { getDestinationBySlug } from '../data/destinations'
import Layout from '../components/Layout'
import PostCard from '../components/PostCard'
import { ArrowRight, Crumbs, SectionHead, NumCards, Steps, CtaSlim, AICallout, FaqList } from '../components/ui'
import { waLink } from '../data/site'

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
  const showAI = ['ielts-classes-jadibuti', 'pte-classes-jadibuti', 'uk-student-visa-process'].includes(page.slug)

  return (
    <Layout>
      <section className="wrap page-hero">
        <Crumbs items={[{ label: 'Home', to: '/' }, { label: 'Services', to: '/#services' }, { label: page.badge }]} />
        <div className="page-hero-grid">
          <div className="page-hero-copy">
            <span className="chip-red">{page.badge}</span>
            <h1 className="h1">{page.title}</h1>
            <p className="hero-sub">{page.tagline}</p>
            <p className="lead">{page.intro}</p>
            <div className="hero-actions">
              <a href="/#contact" className="btn btn-red">Book free counseling <ArrowRight /></a>
              {page.steps?.length > 0 && <a href="#steps" className="link-u">How it works</a>}
            </div>
          </div>
          <div className="page-hero-media">
            <img src={page.heroImg} alt={page.title} width="1400" height="700" />
          </div>
        </div>
        <div className="stat-strip">
          {page.stats.map(s => <div key={s.l}><b>{s.n}</b><span>{s.l}</span></div>)}
        </div>
      </section>

      <section className="section" style={{ paddingTop: 80 }}>
        <div className="wrap split">
          <div>
            <span className="mono" style={{ display: 'block', marginBottom: 10 }}>AT A GLANCE</span>
            <h2 className="h3" style={{ marginBottom: 28 }}>Quick facts.</h2>
          </div>
          <dl className="facts" style={{ flex: '999 1 560px' }}>
            {page.quickFacts.map(f => <div key={f.label}><dt>{f.label}</dt><dd>{f.value}</dd></div>)}
          </dl>
        </div>
      </section>

      {page.sections.map(section => (
        <section className="section" key={section.heading}>
          <div className="wrap section-rule">
            <SectionHead title={section.heading} aside={section.intro} />
            {section.type === 'cards'
              ? <NumCards items={section.items} />
              : <dl className="facts">{section.items.map(r => <div key={r.label}><dt>{r.label}</dt><dd>{r.value}</dd></div>)}</dl>}
          </div>
        </section>
      ))}

      {page.steps?.length > 0 && (
        <section className="section" id="steps">
          <div className="wrap section-rule">
            <SectionHead label="HOW IT WORKS" title="Step by step." aside="Walk into our Jadibuti office Sun–Fri, 8 AM–6 PM. The first consultation is completely free." />
            <Steps steps={page.steps} />
          </div>
        </section>
      )}

      {showAI && (
        <section className="section" style={{ paddingTop: 8 }}>
          <div className="wrap">
            <AICallout
              placement={`service-${page.slug}`}
              title="Heading to the UK? Rehearse your Pre-CAS interview with AI."
              text="19 real questions on camera, scored out of 100, with speaking-pace and filler-word feedback."
            />
          </div>
        </section>
      )}

      {page.faqs?.length > 0 && (
        <section className="section">
          <div className="wrap section-rule faq-layout">
            <div className="faq-intro">
              <span className="mono">FAQ</span>
              <h2 className="h3">Common questions.</h2>
            </div>
            <FaqList faqs={page.faqs} />
          </div>
        </section>
      )}

      {relatedDests.length > 0 && (
        <section className="section">
          <div className="wrap section-rule">
            <SectionHead label="EXPLORE" title="Related destinations." />
            <div className="link-tiles">
              {relatedDests.map(d => (
                <Link key={d.slug} to={`/${d.slug}`} className="link-tile">
                  <img src={`https://flagcdn.com/w80/${d.flagCode}.png`} alt="" width="32" height="23" loading="lazy" />
                  {d.country}<span className="arr">→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {relatedPosts.length > 0 && (
        <section className="section">
          <div className="wrap section-rule">
            <SectionHead label="FURTHER READING" title="Related guides." />
            <div className="grid grid-300">{relatedPosts.map(p => <PostCard key={p.slug} post={p} />)}</div>
          </div>
        </section>
      )}

      <CtaSlim label="FREE CONSULTATION" title="Get expert guidance today — free.">
        <a href="/#contact" className="btn btn-dark">Book free session <ArrowRight /></a>
        <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn-white">WhatsApp us</a>
      </CtaSlim>
    </Layout>
  )
}
