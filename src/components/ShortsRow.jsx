import { useState } from 'react'

// Horizontal row of vertical YouTube Shorts; tapping one plays it in place (9:16).
export default function ShortsRow({ items, label = 'SHORTS', title = 'Quick tips in under a minute.' }) {
  const [playing, setPlaying] = useState(null)
  if (!items?.length) return null

  return (
    <div className="shorts">
      <div className="shorts-head">
        <div>
          <span className="mono">{label}</span>
          <h2 className="h3">{title}</h2>
        </div>
        <a href="https://www.youtube.com/@GlobalGateEduJadibuti/shorts" target="_blank" rel="noopener noreferrer" className="link-u">All Shorts on YouTube ↗</a>
      </div>
      <ul className="shorts-track">
        {items.map(v => (
          <li key={v.id} className="short-card">
            <div className="short-frame">
              {playing === v.id ? (
                <iframe
                  src={`https://www.youtube.com/embed/${v.id}?autoplay=1&playsinline=1`}
                  title={v.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <>
                  <img src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`} alt="" loading="lazy" width="480" height="360" />
                  <button type="button" onClick={() => setPlaying(v.id)} aria-label={`Play Short: ${v.title}`}>
                    <span className="play"><svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg></span>
                  </button>
                </>
              )}
            </div>
            <span className="cat">{v.category}</span>
            <span className="short-title">{v.title}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
