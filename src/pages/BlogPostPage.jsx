import { useParams, Link, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { getPostBySlug, blogPosts } from '../data/blogPosts'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsApp from '../components/WhatsApp'
import Cursor from '../components/Cursor'
import FloatingDot from '../components/FloatingDot'

function renderBody(item, i) {
  if (item.type === 'p') {
    return <p key={i} className="bpp-p">{item.content}</p>
  }
  if (item.type === 'callout') {
    return (
      <div key={i} className="bpp-callout">
        <span className="bpp-callout-icon">★</span>
        <p>{item.content}</p>
      </div>
    )
  }
  if (item.type === 'ul') {
    return (
      <ul key={i} className="bpp-ul">
        {item.content.map((li, j) => <li key={j}>{li}</li>)}
      </ul>
    )
  }
  if (item.type === 'ol') {
    return (
      <ol key={i} className="bpp-ol">
        {item.content.map((li, j) => <li key={j}>{li}</li>)}
      </ol>
    )
  }
  return null
}

export default function BlogPostPage() {
  const { slug } = useParams()
  const post = getPostBySlug(slug)

  useEffect(() => {
    if (!post) return
    const url = `https://globalgateconsultancyjadibuti.com.np/blog/${post.slug}`

    document.title = post.metaTitle

    const setMeta = (sel, attr, val) => {
      const el = document.querySelector(sel)
      if (el) el.setAttribute(attr, val)
    }

    setMeta('meta[name="description"]',        'content', post.metaDescription)
    setMeta('link[rel="canonical"]',           'href',    url)
    setMeta('meta[property="og:title"]',       'content', post.metaTitle)
    setMeta('meta[property="og:description"]', 'content', post.metaDescription)
    setMeta('meta[property="og:image"]',       'content', post.img)
    setMeta('meta[property="og:url"]',         'content', url)
    setMeta('meta[name="twitter:title"]',      'content', post.metaTitle)
    setMeta('meta[name="twitter:description"]','content', post.metaDescription)
    setMeta('meta[name="twitter:image"]',      'content', post.img)

    window.scrollTo(0, 0)

    const ldJson = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.metaDescription,
      image: post.img,
      datePublished: post.date,
      author: {
        '@type': 'Organization',
        name: 'Global Gate Educational Consultancy — Jadibuti Branch',
        url: 'https://globalgateconsultancyjadibuti.com.np',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Global Gate Educational Consultancy',
        logo: { '@type': 'ImageObject', url: 'https://globalgateconsultancyjadibuti.com.np/global_gate.png' },
      },
    }

    let script = document.getElementById('article-ld')
    if (!script) {
      script = document.createElement('script')
      script.id = 'article-ld'
      script.type = 'application/ld+json'
      document.head.appendChild(script)
    }
    script.textContent = JSON.stringify(ldJson)

    return () => {
      const s = document.getElementById('article-ld')
      if (s) s.remove()
      setMeta('link[rel="canonical"]',           'href',    'https://globalgateconsultancyjadibuti.com.np/')
      setMeta('meta[property="og:url"]',         'content', 'https://globalgateconsultancyjadibuti.com.np/')
      setMeta('meta[property="og:title"]',       'content', 'Best UK Consultancy in Nepal — Global Gate Jadibuti | Exclusive UK University Partner')
      setMeta('meta[property="og:description"]', 'content', "Nepal's exclusive authorized UK university consultancy in Jadibuti, Kathmandu.")
      setMeta('meta[property="og:image"]',       'content', 'https://globalgateconsultancyjadibuti.com.np/hearder.webp')
      setMeta('meta[name="twitter:title"]',      'content', 'Best UK Consultancy in Nepal — Global Gate Jadibuti')
      setMeta('meta[name="twitter:description"]','content', "Nepal's exclusive UK university partner in Jadibuti.")
      setMeta('meta[name="twitter:image"]',      'content', 'https://globalgateconsultancyjadibuti.com.np/hearder.webp')
    }
  }, [post])

  if (!post) return <Navigate to="/blog" replace />

  const related = blogPosts.filter(p => p.slug !== slug).slice(0, 3)

  return (
    <>
      <Cursor />
      <FloatingDot />
      <Navbar />
      <main className="bpp">

        {/* Hero */}
        <div className="bpp-hero">
          <img src={post.img} alt={post.title} className="bpp-hero-img" />
          <div className="bpp-hero-overlay" />
          <div className="wrap bpp-hero-content">
            <div className="bpp-breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              <Link to="/blog">Blog</Link>
              <span>/</span>
              <span>{post.category}</span>
            </div>
            <span className="badge badge-dark">{post.category}</span>
            <h1 className="bpp-title">{post.title}</h1>
            <div className="bpp-meta">
              <span>{post.date}</span>
              <span className="bpp-dot">·</span>
              <span>{post.readTime}</span>
              <span className="bpp-dot">·</span>
              <span>By Global Gate Jadibuti</span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="wrap bpp-layout">
          <article className="bpp-article">

            {/* Intro */}
            <p className="bpp-intro">{post.intro}</p>

            {/* Sections */}
            {post.sections.map((section, i) => (
              <section key={i} className="bpp-section">
                <h2 className="bpp-section-heading">{section.heading}</h2>
                {section.body.map((item, j) => renderBody(item, j))}
              </section>
            ))}

            {/* CTA block */}
            <div className="bpp-article-cta">
              <div className="bpp-article-cta-icon">💬</div>
              <div>
                <div className="bpp-article-cta-title">Free Consultation at Our Jadibuti Office</div>
                <p className="bpp-article-cta-body">{post.cta}</p>
              </div>
              <Link to="/#contact" className="btn-pill btn-navy bpp-cta-btn">
                Book Now
                <span className="arrow-circle">→</span>
              </Link>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="bpp-sidebar">
            <div className="bpp-sidebar-card">
              <div className="bpp-sidebar-title">Free UK Counseling</div>
              <p className="bpp-sidebar-body">
                Nepal's exclusive authorized UK university partner. Walk into our Jadibuti office
                for a free one-on-one session.
              </p>
              <Link to="/#contact" className="btn-pill btn-navy" style={{ width: '100%', justifyContent: 'center' }}>
                Book Free Session
                <span className="arrow-circle">→</span>
              </Link>
              <div className="bpp-sidebar-contacts">
                <a href="tel:015253297" className="bpp-sidebar-link">📞 015253297</a>
                <a href="https://wa.me/9779862349049" target="_blank" rel="noreferrer" className="bpp-sidebar-link">💬 +977 986-2349049</a>
                <span className="bpp-sidebar-hours">Sun–Fri 8AM–6PM · Jadibuti, Kathmandu</span>
              </div>
            </div>

            <div className="bpp-sidebar-card">
              <div className="bpp-sidebar-title">Related Articles</div>
              <div className="bpp-related-list">
                {related.map(r => (
                  <Link to={`/blog/${r.slug}`} key={r.slug} className="bpp-related-item">
                    <span className="bpp-related-cat">{r.category}</span>
                    <span className="bpp-related-title">{r.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Back to blog */}
        <div className="wrap bpp-back">
          <Link to="/blog" className="bpp-back-link">← Back to all articles</Link>
        </div>

      </main>
      <Footer />
      <WhatsApp />
    </>
  )
}
