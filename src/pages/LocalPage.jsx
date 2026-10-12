import { useEffect } from 'react'
import { Link, useLocation, Navigate } from 'react-router-dom'
import { getLocalPageBySlug } from '../data/localPages'
import { getServicePageBySlug } from '../data/servicePages'
import { getDestinationBySlug } from '../data/destinations'
import Layout from '../components/Layout'
import { ArrowRight, Crumbs, SectionHead, NumCards, CtaSlim, FaqList } from '../components/ui'
import { waLink } from '../data/site'

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
  const relatedDests = (page.relatedDestSlugs || []).map(s => getDestinationBySlug(s)).filter(Boolean)

  return (
    <Layout>
      <section className="wrap page-hero">
        <Crumbs items={[{ label: 'Home', to: '/' }, { label: page.areaName }]} />
        <div className="page-hero-grid" style={{ alignItems: 'center' }}>
          <div className="page-hero-copy">
            <span className="chip-red">{page.badge}</span>
            <h1 className="h1">{page.title}</h1>
            <p className="lead">{page.intro}</p>
            <div className="hero-actions">
              <a href="/#contact" className="btn btn-red">Book free counseling <ArrowRight /></a>
              <a href="#directions" className="link-u">Get directions</a>
            </div>
          </div>
          <figure className="area-map" style={{ flex: '1 1 520px', minWidth: 0 }}>
            <AreaMap />
          </figure>
        </div>
        <div className="stat-strip">
          {page.stats.map(s => <div key={s.l}><b>{s.n}</b><span>{s.l}</span></div>)}
        </div>
      </section>

      <section className="section" style={{ paddingTop: 80 }}>
        <div className="wrap">
          <SectionHead label="WHY GLOBAL GATE" title={`Why ${page.areaName} students choose us.`} />
          <NumCards items={page.whyCards} />
        </div>
      </section>

      <section className="section">
        <div className="wrap section-rule split">
          <div style={{ flex: '1 1 300px' }}>
            <span className="mono" style={{ display: 'block', marginBottom: 10 }}>SERVICES IN JADIBUTI</span>
            <h2 className="h3">What we do here.</h2>
          </div>
          <ul className="list-rows" style={{ flex: '999 1 560px' }}>
            {page.services.map((s, i) => (
              <li key={s.name}><span className="n">{String(i + 1).padStart(2, '0')}</span><b>{s.name}</b><span>{s.detail}</span></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" id="directions">
        <div className="wrap section-rule">
          <SectionHead label="HOW TO REACH US" title={`Getting here from ${page.areaName}.`} />
          <div className="contact-grid">
            <div className="grid grid-240" style={{ flex: '999 1 560px', minWidth: 0 }}>
              {page.directions.map(d => (
                <div className="info-card" key={d.from}>
                  <span className="mono mono-red">FROM</span>
                  <b style={{ fontSize: 19, lineHeight: 1.2 }}>{d.from}</b>
                  <p className="serif muted">{d.how}</p>
                </div>
              ))}
            </div>
            <aside className="office-card" style={{ flex: '1 1 320px' }}>
              <div><span className="mono">ADDRESS</span>{page.officeInfo.address}</div>
              <div><span className="mono">HOURS</span>{page.officeInfo.hours}</div>
              <div><span className="mono">PHONE</span><a href={`tel:${page.officeInfo.phone}`}>{page.officeInfo.phone}</a></div>
              <div><span className="mono">WHATSAPP</span><a href={waLink()} target="_blank" rel="noopener noreferrer">{page.officeInfo.whatsapp}</a></div>
              <a href={page.officeInfo.mapLink} target="_blank" rel="noopener noreferrer" className="btn btn-white" style={{ alignSelf: 'flex-start', marginTop: 'auto' }}>Open in Google Maps ↗</a>
            </aside>
          </div>
        </div>
      </section>

      {page.faqs?.length > 0 && (
        <section className="section">
          <div className="wrap section-rule faq-layout">
            <div className="faq-intro">
              <span className="mono">FAQ</span>
              <h2 className="h3">Before you visit.</h2>
            </div>
            <FaqList faqs={page.faqs} />
          </div>
        </section>
      )}

      {(relatedServices.length > 0 || relatedDests.length > 0) && (
        <section className="section">
          <div className="wrap section-rule">
            <SectionHead label="EXPLORE" title="Services & destinations." />
            <div className="link-tiles">
              {relatedServices.map(s => <Link key={s.slug} to={`/${s.slug}`} className="link-tile">{s.title}<span className="arr">→</span></Link>)}
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

      <CtaSlim label={`FREE CONSULTATION · ${page.areaName.toUpperCase()}`} title="Walk in today. The first session is free.">
        <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn-dark">Message us first <ArrowRight /></a>
        <a href="tel:015253297" className="btn btn-white">Call 01-5253297</a>
      </CtaSlim>
    </Layout>
  )
}

// Schematic map along the Araniko Highway, west to east: New Baneshwor → Tinkune → Koteshwor → Jadibuti → Bhaktapur.
function AreaMap() {
  return (
    <svg viewBox="0 0 560 380" role="img" aria-label="Schematic map along the Araniko Highway, west to east: New Baneshwor, Tinkune, Koteshwor, then Jadibuti with the Global Gate office beside the bus park, continuing to Bhaktapur">
      <defs><pattern id="dots" width="16" height="16" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.2" fill="#D5D2CC" /></pattern></defs>
      <rect width="560" height="380" rx="14" fill="url(#dots)" />
      <path d="M210 26 C 206 120, 214 200, 206 354" fill="none" stroke="#B9B6AF" strokeWidth="6" strokeLinecap="round" />
      <text x="218" y="40" fontFamily="Geist Mono, monospace" fontSize="10" fill="#5B6070">RING ROAD</text>
      <path d="M28 120 C 90 150, 140 186, 206 196 S 330 214, 380 220 S 480 236, 540 250" fill="none" stroke="#0E1424" strokeWidth="10" strokeLinecap="round" />
      <path d="M28 120 C 90 150, 140 186, 206 196 S 330 214, 380 220 S 480 236, 540 250" fill="none" stroke="#FBFBFA" strokeWidth="2" strokeDasharray="10 10" />
      <text x="410" y="282" fontFamily="Geist Mono, monospace" fontSize="10" fill="#5B6070">ARANIKO HIGHWAY →</text>
      <circle cx="44" cy="128" r="8" fill="#FBFBFA" stroke="#0E1424" strokeWidth="3" />
      <text x="24" y="104" fontFamily="Geist Mono, monospace" fontSize="12" fill="#3B4152">NEW BANESHWOR</text>
      <circle cx="128" cy="174" r="6" fill="#FBFBFA" stroke="#0E1424" strokeWidth="3" />
      <text x="92" y="206" fontFamily="Geist Mono, monospace" fontSize="11" fill="#5B6070">TINKUNE</text>
      <circle cx="207" cy="196" r="9" fill="#FBFBFA" stroke="#0E1424" strokeWidth="3" />
      <text x="124" y="238" fontFamily="Geist Mono, monospace" fontSize="12" fill="#3B4152">KOTESHWOR</text>
      <rect x="316" y="230" width="96" height="30" rx="8" fill="#1B3A6B" />
      <text x="364" y="250" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="11" fill="#FFFFFF">BUS PARK</text>
      <circle className="pulse" cx="352" cy="190" r="13" fill="#C8202F" />
      <circle cx="352" cy="190" r="13" fill="#C8202F" />
      <circle cx="352" cy="190" r="5" fill="#FFFFFF" />
      <path d="M352 160 L 352 177" stroke="#0E1424" strokeWidth="2" />
      <rect x="268" y="112" width="172" height="48" rx="10" fill="#0E1424" />
      <text x="284" y="132" fontFamily="Geist, sans-serif" fontSize="13" fontWeight="600" fill="#FFFFFF">Global Gate · Jadibuti</text>
      <text x="284" y="149" fontFamily="Geist Mono, monospace" fontSize="10" fill="#AFC0E0">2 MIN FROM BUS PARK</text>
      <circle cx="526" cy="246" r="8" fill="#FBFBFA" stroke="#0E1424" strokeWidth="3" />
      <text x="470" y="224" fontFamily="Geist Mono, monospace" fontSize="12" fill="#3B4152">BHAKTAPUR</text>
      <text x="24" y="362" fontFamily="Geist Mono, monospace" fontSize="10" fill="#5B6070">SCHEMATIC · NOT TO SCALE · WEST → EAST</text>
    </svg>
  )
}
