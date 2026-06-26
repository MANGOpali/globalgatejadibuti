import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { blogPosts } from '../data/blogPosts'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsApp from '../components/WhatsApp'
import Cursor from '../components/Cursor'
import FloatingDot from '../components/FloatingDot'

export default function BlogListPage() {
  useEffect(() => {
    const title = 'UK Study Abroad Blog — Visa Guides, University Tips & IELTS Advice | Global Gate Jadibuti'
    const description = "Expert guides for Nepali students studying in the UK — visa process, university rankings, IELTS tips, cost breakdowns, and post-study work rights. From Nepal's exclusive UK consultancy in Jadibuti."
    const url = 'https://globalgateconsultancyjadibuti.com.np/blog'

    document.title = title

    const setMeta = (sel, attr, val) => {
      const el = document.querySelector(sel)
      if (el) el.setAttribute(attr, val)
    }

    setMeta('meta[name="description"]',        'content', description)
    setMeta('link[rel="canonical"]',           'href',    url)
    setMeta('meta[property="og:title"]',       'content', title)
    setMeta('meta[property="og:description"]', 'content', description)
    setMeta('meta[property="og:url"]',         'content', url)
    setMeta('meta[name="twitter:title"]',      'content', title)
    setMeta('meta[name="twitter:description"]','content', description)

    window.scrollTo(0, 0)

    return () => {
      const setM = (sel, attr, val) => { const el = document.querySelector(sel); if (el) el.setAttribute(attr, val) }
      setM('link[rel="canonical"]', 'href', 'https://globalgateconsultancyjadibuti.com.np/')
      setM('meta[property="og:url"]', 'content', 'https://globalgateconsultancyjadibuti.com.np/')
    }
  }, [])

  const [featured, ...rest] = blogPosts

  return (
    <>
      <Cursor />
      <FloatingDot />
      <Navbar />
      <main className="blp">

        {/* Hero */}
        <section className="blp-hero">
          <div className="wrap">
            <div className="blp-breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              <span>Blog</span>
            </div>
            <span className="badge badge-light">Insights &amp; Guides</span>
            <h1 className="blp-title">
              UK Study Abroad<br />
              <em>Guides &amp; Tips</em>
            </h1>
            <p className="blp-subtitle">
              Expert advice for Nepali students planning to study in the UK —
              visa guides, university rankings, cost breakdowns, and IELTS tips
              from Nepal's exclusive UK education consultancy.
            </p>
          </div>
        </section>

        {/* Featured post */}
        <section className="blp-featured-wrap">
          <div className="wrap">
            <Link to={`/blog/${featured.slug}`} className="blp-featured">
              <div className="blp-featured-img">
                <img src={featured.img} alt={featured.title} loading="lazy" />
              </div>
              <div className="blp-featured-body">
                <div className="blp-featured-meta">
                  <span className="blog-cat">{featured.category}</span>
                  <span className="blp-meta-sep">·</span>
                  <span className="blp-date">{featured.date}</span>
                  <span className="blp-meta-sep">·</span>
                  <span className="blp-date">{featured.readTime}</span>
                </div>
                <h2 className="blp-featured-title">{featured.title}</h2>
                <p className="blp-featured-excerpt">{featured.excerpt}</p>
                <span className="blp-read-more">
                  Read Full Guide <span className="blp-arrow">→</span>
                </span>
              </div>
            </Link>
          </div>
        </section>

        {/* All other posts */}
        <section className="blp-grid-wrap">
          <div className="wrap">
            <div className="blp-grid">
              {rest.map(post => (
                <Link to={`/blog/${post.slug}`} key={post.slug} className="blog-card blp-card-link">
                  <div className="blog-img">
                    <img src={post.img} alt={post.title} loading="lazy" />
                    <div className="blog-img-overlay" />
                  </div>
                  <div className="blog-body">
                    <span className="blog-cat">{post.category}</span>
                    <div className="blog-meta">{post.date} · {post.readTime}</div>
                    <div className="blog-title">{post.title}</div>
                    <p className="blog-excerpt">{post.excerpt}</p>
                    <span className="blog-read">Read Article →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="blp-cta">
          <div className="wrap blp-cta-inner">
            <div>
              <h2 className="blp-cta-title">Ready to Study in the UK?</h2>
              <p className="blp-cta-sub">Nepal's exclusive UK university partner — free counseling in Jadibuti.</p>
            </div>
            <Link to="/#contact" className="btn-pill btn-white">
              Book Free Session
              <span className="arrow-circle">→</span>
            </Link>
          </div>
        </section>

      </main>
      <Footer />
      <WhatsApp />
    </>
  )
}
