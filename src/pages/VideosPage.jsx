import { useState, useEffect } from 'react'
import { videos, longVideos, shorts } from '../data/videos'
import ShortsRow from '../components/ShortsRow'
import Layout from '../components/Layout'
import { ArrowRight, Crumbs, CtaSlim } from '../components/ui'

function VideoFrame({ video, activeId, setActiveId }) {
  const playing = activeId === video.id
  return (
    <div className="vid-frame">
      {playing ? (
        <iframe
          src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <>
          <img src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`} alt="" loading="lazy" width="480" height="360" />
          <button type="button" onClick={() => setActiveId(video.id)} aria-label={`Play video: ${video.title}`}>
            <span className="play"><svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg></span>
          </button>
        </>
      )}
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

  const [first, ...more] = longVideos

  return (
    <Layout>
      <section className="wrap" style={{ paddingTop: 56 }}>
        <Crumbs items={[{ label: 'Home', to: '/' }, { label: 'Videos' }]} />
        <div className="sec-head">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 780 }}>
            <span className="mono">GLOBAL GATE ON YOUTUBE</span>
            <h1 className="h1">Watch before you apply.</h1>
          </div>
          <a href="https://www.youtube.com/@GlobalGateEduJadibuti" target="_blank" rel="noopener noreferrer" className="btn btn-red">Subscribe on YouTube ↗</a>
        </div>

        {first && (
          <div className="vid-featured">
            <div className="player"><VideoFrame video={first} activeId={activeId} setActiveId={setActiveId} /></div>
            <div className="copy">
              <span className="cat">LATEST · {first.category}</span>
              <h2 style={{ fontWeight: 600, fontSize: 'clamp(24px, 2.6vw, 34px)', lineHeight: 1.1, letterSpacing: '-.03em' }}>{first.title}</h2>
              <span className="mono">{first.date}</span>
            </div>
          </div>
        )}
      </section>

      {shorts.length > 0 && (
        <section className="wrap" style={{ paddingTop: 48 }}>
          <ShortsRow items={shorts} />
        </section>
      )}

      <section className="wrap" style={{ paddingTop: 24, paddingBottom: 24 }}>
        {shorts.length > 0 && more.length > 0 && <span className="mono" style={{ display: 'block', margin: '24px 0 16px' }}>FULL VIDEOS</span>}
        <div className="grid grid-300">
          {more.map(v => (
            <div className="vid-card" key={v.id}>
              <VideoFrame video={v} activeId={activeId} setActiveId={setActiveId} />
              <div className="copy">
                <span className="cat">{v.category}</span>
                <h3>{v.title}</h3>
                <span className="mono">{v.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CtaSlim tone="navy" label="FREE COUNSELING" title="Prefer to ask in person? Visit us in Jadibuti.">
        <a href="/#contact" className="btn btn-white">Book free counseling <ArrowRight /></a>
      </CtaSlim>
    </Layout>
  )
}
