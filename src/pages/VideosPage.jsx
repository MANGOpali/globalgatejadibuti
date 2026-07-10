import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { videos } from '../data/videos'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsApp from '../components/WhatsApp'
import Cursor from '../components/Cursor'
import FloatingDot from '../components/FloatingDot'

function VideoCard({ video, activeId, setActiveId }) {
  const playing = activeId === video.id
  const thumb = `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`

  return (
    <div className="vid-card">
      <div className="vid-thumb" onClick={() => setActiveId(video.id)}>
        {playing ? (
          <iframe
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            <img src={thumb} alt={video.title} loading="lazy" />
            <div className="vid-play-btn">
              <svg viewBox="0 0 24 24" fill="white" width="48" height="48">
                <circle cx="12" cy="12" r="12" fill="rgba(0,0,0,0.6)" />
                <polygon points="10,8 18,12 10,16" fill="white" />
              </svg>
            </div>
          </>
        )}
      </div>
      <div className="vid-body">
        <span className="blog-cat">{video.category}</span>
        <div className="blog-meta">{video.date}</div>
        <div className="vid-title">{video.title}</div>
        {!playing && (
          <button className="vid-watch-btn" onClick={() => setActiveId(video.id)}>
            Watch Video →
          </button>
        )}
      </div>
    </div>
  )
}

export default function VideosPage() {
  const [activeId, setActiveId] = useState(null)
  useEffect(() => {
    const title = 'Videos — UK Visa & Study Abroad Tips for Nepali Students | Global Gate Jadibuti'
    const description = 'Watch our expert videos on UK student visa interviews, study abroad tips, and IELTS guidance for Nepali students. Global Gate Consultancy Jadibuti.'
    const url = 'https://globalgateconsultancyjadibuti.com.np/videos'

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

    // Video schema markup
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Study Abroad Video Guides — Global Gate Jadibuti',
      url,
      itemListElement: videos.map((v, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'VideoObject',
          name: v.title,
          description: v.title,
          thumbnailUrl: `https://img.youtube.com/vi/${v.id}/maxresdefault.jpg`,
          uploadDate: v.uploadDate,
          embedUrl: `https://www.youtube.com/embed/${v.id}`,
          url: `https://www.youtube.com/watch?v=${v.id}`,
          publisher: {
            '@type': 'Organization',
            name: 'Global Gate Educational Consultancy Jadibuti',
            url: 'https://globalgateconsultancyjadibuti.com.np',
          },
        },
      })),
    }

    let schemaScript = document.getElementById('video-schema')
    if (!schemaScript) {
      schemaScript = document.createElement('script')
      schemaScript.id = 'video-schema'
      schemaScript.type = 'application/ld+json'
      document.head.appendChild(schemaScript)
    }
    schemaScript.textContent = JSON.stringify(schema)

    window.scrollTo(0, 0)

    return () => {
      const setM = (sel, attr, val) => { const el = document.querySelector(sel); if (el) el.setAttribute(attr, val) }
      setM('link[rel="canonical"]', 'href', 'https://globalgateconsultancyjadibuti.com.np/')
      setM('meta[property="og:url"]', 'content', 'https://globalgateconsultancyjadibuti.com.np/')
      const s = document.getElementById('video-schema')
      if (s) s.remove()
    }
  }, [])

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
              <span>Videos</span>
            </div>
            <span className="badge badge-light">Watch &amp; Learn</span>
            <h1 className="blp-title">
              Study Abroad<br />
              <em>Video Guides</em>
            </h1>
            <p className="blp-subtitle">
              Expert videos on UK visa interviews, study abroad tips, and IELTS
              guidance for Nepali students — straight from our Jadibuti office.
            </p>
          </div>
        </section>

        {/* Videos grid */}
        <section className="blp-grid-wrap">
          <div className="wrap">
            <div className="vid-grid">
              {videos.map(v => (
                <VideoCard key={v.id} video={v} activeId={activeId} setActiveId={setActiveId} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="blp-cta">
          <div className="wrap blp-cta-inner">
            <div>
              <h2 className="blp-cta-title">Ready to Start Your Journey?</h2>
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
