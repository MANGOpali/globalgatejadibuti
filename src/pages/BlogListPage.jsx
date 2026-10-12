import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import PostCard from '../components/PostCard'
import { ArrowRight, Crumbs, CtaSlim } from '../components/ui'
import { waLink } from '../data/site'
import { sortedPosts } from '../data/posts'

// a post can sit under several topics
const TOPICS = {
  Visa: /visa|cas\b|ukvi|rejection|gte|graduate route/i,
  'Test prep': /ielts|pte|test/i,
  'Costs & scholarships': /cost|scholarship|fund/i,
  Universities: /universit|comparison| vs /i,
  Applications: /sop|application/i,
}

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

  const [topic, setTopic] = useState('All')
  const [featured, ...rest] = sortedPosts
  const shown = topic === 'All' ? rest : sortedPosts.filter(p => TOPICS[topic].test(`${p.category} ${p.title}`))

  return (
    <Layout>
      <section className="wrap" style={{ paddingTop: 56 }}>
        <Crumbs items={[{ label: 'Home', to: '/' }, { label: 'Blog' }]} />
        <div className="sec-head" style={{ paddingBottom: 32, borderBottom: '1px solid var(--line-2)', marginBottom: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 780 }}>
            <span className="mono">THE GLOBAL GATE BLOG</span>
            <h1 className="h1">Guides for studying abroad from Nepal.</h1>
          </div>
          <p>Visas, costs, universities and test prep — written by the counsellors who handle these applications every day.</p>
        </div>
        <div className="filters" role="group" aria-label="Filter by topic">
          {['All', ...Object.keys(TOPICS)].map(t => (
            <button key={t} type="button" aria-pressed={topic === t} onClick={() => setTopic(t)}>{t}</button>
          ))}
        </div>
      </section>

      {topic === 'All' && featured && (
        <section className="wrap" style={{ paddingTop: 8, paddingBottom: 24 }}>
          <Link to={`/blog/${featured.slug}`} className="featured-post">
            <div className="media"><img src={featured.img} alt={featured.title} width="1200" height="600" /></div>
            <div className="copy">
              <div className="meta"><span style={{ color: '#FF8A94' }}>LATEST · {featured.category}</span><span>{featured.readTime}</span></div>
              <h2>{featured.title}</h2>
              <p>{featured.excerpt}</p>
              <span className="btn btn-white btn-sm" style={{ alignSelf: 'flex-start' }}>Read the guide →</span>
            </div>
          </Link>
        </section>
      )}

      <section className="wrap" style={{ paddingTop: 16, paddingBottom: 24 }}>
        <div className="grid grid-300">{shown.map(p => <PostCard key={p.slug} post={p} />)}</div>
        {shown.length === 0 && <p className="serif muted" style={{ padding: '32px 0' }}>No guides in this topic yet — ask us on WhatsApp instead.</p>}
      </section>

      <CtaSlim label="FREE COUNSELING" title="Still have questions? Ask a counsellor — free.">
        <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn-dark">Chat on WhatsApp <ArrowRight /></a>
        <a href="/#contact" className="btn btn-white">Book a session</a>
      </CtaSlim>
    </Layout>
  )
}
