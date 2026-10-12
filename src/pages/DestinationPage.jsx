import { useEffect } from 'react'
import { Link, useLocation, Navigate } from 'react-router-dom'
import { getDestinationBySlug, destinations } from '../data/destinations'
import { getPostBySlug } from '../data/blogPosts'
import Layout from '../components/Layout'
import PostCard from '../components/PostCard'
import { ArrowRight, Crumbs, SectionHead, NumCards, Steps, CtaSlim, AICallout } from '../components/ui'
import { waLink } from '../data/site'

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
  const isUK = dest.slug === 'study-in-uk-from-nepal'

  return (
    <Layout>
      {/* Hero */}
      <section className="wrap page-hero">
        <Crumbs items={[{ label: 'Home', to: '/' }, { label: 'Destinations', to: '/#destinations' }, { label: dest.country }]} />
        <div className="page-hero-grid">
          <div className="page-hero-copy">
            <span className="chip-red">{dest.tagline}</span>
            <h1 className="h1">Study in {dest.country} from Nepal.</h1>
            <p className="lead">{dest.intro}</p>
            <div className="hero-actions">
              <a href="/#contact" className="btn btn-red">Get a free profile check <ArrowRight /></a>
              <a href="#process" className="link-u">See the step-by-step process</a>
            </div>
          </div>
          <div className="page-hero-media">
            <img src={dest.heroImg} alt={`Study in ${dest.country}`} width="1400" height="700" />
            <div className="media-stats">
              {dest.stats.map(s => <div key={s.l}><b>{s.n}</b><span>{s.l}</span></div>)}
            </div>
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="section" style={{ paddingTop: 88 }}>
        <div className="wrap">
          <SectionHead label={`WHY ${dest.country.toUpperCase()}`} title={`Top reasons to study in ${dest.country}.`} />
          <NumCards items={dest.whyStudy} />
        </div>
      </section>

      {/* Requirements + universities */}
      <section className="section">
        <div className="wrap section-rule split">
          <div>
            <span className="mono" style={{ display: 'block', marginBottom: 10 }}>REQUIREMENTS</span>
            <h2 className="h3" style={{ marginBottom: 28 }}>What you'll need.</h2>
            <dl className="facts">
              {dest.requirements.map(r => <div key={r.label}><dt>{r.label}</dt><dd>{r.value}</dd></div>)}
            </dl>
            <a href="/#contact" className="btn btn-navy" style={{ marginTop: 24 }}>Check my eligibility</a>
          </div>
          <div>
            <span className="mono" style={{ display: 'block', marginBottom: 10 }}>UNIVERSITIES</span>
            <h2 className="h3" style={{ marginBottom: 28 }}>Where our students go.</h2>
            <ul className="chip-list">{dest.universities.map(u => <li key={u}>{u}</li>)}</ul>
            <p className="serif muted" style={{ marginTop: 18 }}>We match your profile to the right university — not just the most popular one.</p>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section" id="process">
        <div className="wrap section-rule">
          <SectionHead label="THE PROCESS" title={`${dest.steps.length} steps from Jadibuti to your campus.`} aside="Walk into our office any day Sun–Fri, 8 AM–6 PM. No appointment needed for your first session." />
          <Steps steps={dest.steps} />
        </div>
      </section>

      {isUK && (
        <section className="section" style={{ paddingTop: 8 }}>
          <div className="wrap">
            <AICallout
              placement="uk-destination"
              label="BEFORE YOUR CAS · NEW · AI PRACTICE"
              title="Most UK universities interview you before issuing your CAS. Practise it with AI first."
              text="A full 19-question mock on camera, with a score out of 100 and notes on every answer."
            />
          </div>
        </section>
      )}

      {relatedPosts.length > 0 && (
        <section className="section">
          <div className="wrap section-rule">
            <SectionHead label="STUDY GUIDES" title={`${dest.country} guides.`} />
            <div className="grid grid-300">{relatedPosts.slice(0, 6).map(p => <PostCard key={p.slug} post={p} />)}</div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="wrap section-rule">
          <SectionHead label="EXPLORE MORE" title="Other destinations." />
          <div className="link-tiles">
            {otherDests.map(d => (
              <Link key={d.slug} to={`/${d.slug}`} className="link-tile">
                <img src={`https://flagcdn.com/w80/${d.flagCode}.png`} alt="" width="32" height="23" loading="lazy" />
                {d.country}<span className="arr">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaSlim label="FREE CONSULTATION" title={`Start your ${dest.country} journey today.`}>
        <a href="/#contact" className="btn btn-dark">Book free counseling <ArrowRight /></a>
        <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn-white">WhatsApp us</a>
      </CtaSlim>
    </Layout>
  )
}
