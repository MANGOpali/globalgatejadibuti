import { useParams, Link, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { getPostBySlug } from '../data/blogPosts'
import Layout from '../components/Layout'
import PostCard from '../components/PostCard'
import { ArrowRight, Crumbs, SectionHead, CtaSlim } from '../components/ui'
import { waLink, aiInterviewUrl } from '../data/site'
import { sortedPosts } from '../data/posts'

// content is either plain text or rich segments [{ t, b, i, href }] from Sanity
function rich(content) {
  if (!Array.isArray(content)) return content
  return content.map((s, i) => {
    let node = s.t
    if (s.b) node = <strong>{node}</strong>
    if (s.i) node = <em>{node}</em>
    if (s.href) {
      const external = /^https?:/.test(s.href)
      node = <a href={s.href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{node}</a>
    }
    return <span key={i}>{node}</span>
  })
}

function renderBody(item, i) {
  if (item.type === 'p') return <p key={i}>{rich(item.content)}</p>
  if (item.type === 'h3') return <h3 key={i}>{item.content}</h3>
  if (item.type === 'callout') return <div key={i} className="callout">{item.content}</div>
  if (item.type === 'ul') return <ul key={i}>{item.content.map((li, j) => <li key={j}>{rich(li)}</li>)}</ul>
  if (item.type === 'ol') return <ol key={i}>{item.content.map((li, j) => <li key={j}><span>{rich(li)}</span></li>)}</ol>
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

    const breadcrumbJson = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home',  item: 'https://globalgateconsultancyjadibuti.com.np/' },
        { '@type': 'ListItem', position: 2, name: 'Blog',  item: 'https://globalgateconsultancyjadibuti.com.np/blog' },
        { '@type': 'ListItem', position: 3, name: post.title, item: url },
      ],
    }

    let script = document.getElementById('article-ld')
    if (!script) {
      script = document.createElement('script')
      script.id = 'article-ld'
      script.type = 'application/ld+json'
      document.head.appendChild(script)
    }
    script.textContent = JSON.stringify(ldJson)

    let breadcrumbScript = document.getElementById('breadcrumb-ld')
    if (!breadcrumbScript) {
      breadcrumbScript = document.createElement('script')
      breadcrumbScript.id = 'breadcrumb-ld'
      breadcrumbScript.type = 'application/ld+json'
      document.head.appendChild(breadcrumbScript)
    }
    breadcrumbScript.textContent = JSON.stringify(breadcrumbJson)

    return () => {
      const s = document.getElementById('article-ld')
      if (s) s.remove()
      const b = document.getElementById('breadcrumb-ld')
      if (b) b.remove()
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

  const related = sortedPosts.filter(p => p.slug !== slug).slice(0, 3)
  const isUK = /uk|ukvi|cas|graduate route/i.test(`${post.category} ${post.title}`)
  const anchor = (i) => `section-${i + 1}`

  return (
    <Layout>
      <section className="wrap" style={{ paddingTop: 48 }}>
        <Crumbs items={[{ label: 'Home', to: '/' }, { label: 'Blog', to: '/blog' }, { label: post.category }]} />
        <div className="article-head">
          <div className="article-meta"><span className="mono-red">{post.category}</span><span>{post.date}</span><span>{post.readTime}</span></div>
          <h1 className="h1" style={{ fontSize: 'clamp(38px, 5.4vw, 76px)' }}>{post.title}</h1>
          <p className="lead" style={{ fontSize: 20, maxWidth: 760 }}>{post.excerpt}</p>
        </div>
        <div className="article-cover"><img src={post.img} alt={post.imgAlt || post.title} width="1200" height="600" /></div>
      </section>

      <div className="wrap article-layout">
        <aside className="article-aside">
          <div className="side-card">
            <span className="mono">IN THIS GUIDE</span>
            <ol className="toc">
              {post.sections.map((s, i) => s.heading && <li key={s.heading}><a href={`#${anchor(i)}`}><span>{String(i + 1).padStart(2, '0')}</span>{s.heading}</a></li>)}
            </ol>
          </div>
          {isUK && (
            <div className="side-card ai">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span className="ai-mark" style={{ padding: 4, borderRadius: 10 }}><img src="/ai-interview-mark.png" alt="" width="28" height="28" style={{ width: 28, height: 28 }} /></span>
                <span className="mono" style={{ color: 'var(--on-navy-2)', fontSize: 10 }}>NEW · AI PRACTICE</span>
              </div>
              <div className="title">Practise your Pre-CAS interview with AI</div>
              <p>19 questions on camera, scored out of 100.</p>
              <a href={aiInterviewUrl('blog-uk')} target="_blank" rel="noopener noreferrer" className="btn btn-red btn-sm" style={{ alignSelf: 'flex-start' }}>Start practising ↗</a>
            </div>
          )}
          <div className="side-card navy">
            <div className="title">Want us to check your documents?</div>
            <p>Free consultation at our Jadibuti office, Sun–Fri 8 AM–6 PM.</p>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn-white btn-sm" style={{ alignSelf: 'flex-start' }}>Book on WhatsApp</a>
          </div>
        </aside>

        <article className="prose">
          <p className="intro">{post.intro}</p>
          {post.sections.map((section, i) => (
            <section key={section.heading || i}>
              {section.heading && <h2 id={anchor(i)}>{section.heading}</h2>}
              {section.body.map((item, j) => renderBody(item, j))}
            </section>
          ))}
          {post.cta && <div className="callout">{post.cta}</div>}
          <div className="author">
            <span className="avatar">GG</span>
            <span><strong style={{ display: 'block' }}>Global Gate counselling team</strong><span style={{ color: 'var(--muted-2)' }}>Jadibuti, Kathmandu</span></span>
          </div>
        </article>
      </div>

      <section className="section">
        <div className="wrap section-rule">
          <SectionHead label="KEEP READING" title="More guides." >
            <Link to="/blog" className="link-u">All articles</Link>
          </SectionHead>
          <div className="grid grid-300">{related.map(p => <PostCard key={p.slug} post={p} />)}</div>
        </div>
      </section>

      <CtaSlim label="FREE CONSULTATION" title="Book a free consultation at our Jadibuti office.">
        <a href="/#contact" className="btn btn-dark">Book now <ArrowRight /></a>
        <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn-white">WhatsApp us</a>
      </CtaSlim>
    </Layout>
  )
}
