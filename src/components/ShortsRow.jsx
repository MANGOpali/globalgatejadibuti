import { useEffect, useMemo, useRef, useState } from 'react'

// "Reels" style Shorts section: dark band, filter chips, scrollable phone-style cards,
// and a full-screen vertical player with next/previous.
const GROUPS = {
  'UK Visa': 'UK', 'UK Study': 'UK', 'IELTS & PTE': 'IELTS & PTE', 'New Zealand': 'New Zealand',
  'South Korea': 'South Korea', 'Australia': 'Australia', 'Japan': 'Japan', 'Canada': 'Canada', 'USA': 'USA',
  'Study Abroad Tips': 'Tips', 'Student Stories': 'Stories',
}
const COLORS = {
  UK: '#38BDF8', 'IELTS & PTE': '#FF8A94', 'New Zealand': '#4ADE80', 'South Korea': '#E2E8F0', Australia: '#FACC15',
  Japan: '#F472B6', Canada: '#FB923C', USA: '#A78BFA', Tips: '#93C5FD', Stories: '#C4B5FD',
}
const groupOf = (v) => GROUPS[v.category] || v.category

const Arrow = ({ dir }) => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d={dir === 'left' ? 'M15 6l-6 6 6 6' : 'M9 6l6 6-6 6'} />
  </svg>
)

export default function ShortsRow({ items, label = 'SHORTS', title = 'Quick tips in under a minute.' }) {
  const [group, setGroup] = useState('All')
  const [open, setOpen] = useState(-1)
  const track = useRef(null)

  const groups = useMemo(() => {
    const counts = {}
    for (const v of items || []) counts[groupOf(v)] = (counts[groupOf(v)] || 0) + 1
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).map(([g]) => g)
  }, [items])
  const shown = useMemo(() => (group === 'All' ? items || [] : (items || []).filter(v => groupOf(v) === group)), [items, group])

  if (!items?.length) return null

  const scroll = (dir) => {
    const el = track.current
    if (el) el.scrollBy({ left: dir * Math.max(el.clientWidth * 0.8, 240), behavior: 'smooth' })
  }
  const pick = (g) => { setGroup(g); track.current?.scrollTo({ left: 0 }) }

  return (
    <div className="reels">
      <div className="reels-head">
        <div>
          <span className="reels-label">{label} · {items.length} {items.length === 1 ? 'TIP' : 'TIPS'}</span>
          <h2 className="h3">{title}</h2>
        </div>
        <div className="reels-actions">
          <button type="button" className="reels-arrow" aria-label="Scroll Shorts left" onClick={() => scroll(-1)}><Arrow dir="left" /></button>
          <button type="button" className="reels-arrow" aria-label="Scroll Shorts right" onClick={() => scroll(1)}><Arrow dir="right" /></button>
          <a href="https://www.youtube.com/@GlobalGateEduJadibuti/shorts" target="_blank" rel="noopener noreferrer" className="reels-yt">YouTube ↗</a>
        </div>
      </div>

      {groups.length > 1 && (
        <div className="reels-chips" role="group" aria-label="Filter Shorts by topic">
          {['All', ...groups].map(g => (
            <button key={g} type="button" aria-pressed={group === g} onClick={() => pick(g)}>
              {g !== 'All' && <i style={{ background: COLORS[g] || '#fff' }} />}{g}
            </button>
          ))}
        </div>
      )}

      <ul className="reels-track" ref={track}>
        {shown.map(v => (
          <li key={v.id}>
            <button type="button" className="reel" onClick={() => setOpen(shown.indexOf(v))} aria-label={`Play Short: ${v.title}`}>
              <img src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`} alt="" loading="lazy" width="480" height="360" />
              <span className="reel-tag"><i style={{ background: COLORS[groupOf(v)] || '#fff' }} />{groupOf(v)}</span>
              <span className="reel-play" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg></span>
              <span className="reel-title">{v.title}</span>
            </button>
          </li>
        ))}
      </ul>

      {open >= 0 && shown[open] && (
        <ReelPlayer
          list={shown}
          index={open}
          onIndex={setOpen}
          onClose={() => setOpen(-1)}
        />
      )}
    </div>
  )
}

function ReelPlayer({ list, index, onIndex, onClose }) {
  const v = list[index]
  const closeRef = useRef(null)
  const prev = () => onIndex((index - 1 + list.length) % list.length)
  const next = () => onIndex((index + 1) % list.length)

  useEffect(() => {
    const previouslyFocused = document.activeElement
    closeRef.current?.focus()
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = overflow; previouslyFocused?.focus?.() }
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') onIndex((index + 1) % list.length)
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') onIndex((index - 1 + list.length) % list.length)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [index, list.length, onClose, onIndex])

  return (
    <div className="reel-modal" role="dialog" aria-modal="true" aria-label={v.title} onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <button type="button" ref={closeRef} className="reel-close" aria-label="Close" onClick={onClose}>
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
      </button>
      <button type="button" className="reel-nav prev" aria-label="Previous Short" onClick={prev}><Arrow dir="left" /></button>
      <div className="reel-stage">
        <div className="reel-video">
          <iframe
            key={v.id}
            src={`https://www.youtube.com/embed/${v.id}?autoplay=1&playsinline=1&rel=0`}
            title={v.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="reel-caption">
          <span className="reel-tag static"><i style={{ background: COLORS[groupOf(v)] || '#fff' }} />{groupOf(v)}</span>
          <p>{v.title}</p>
          <span className="reel-count">{index + 1} / {list.length}</span>
        </div>
      </div>
      <button type="button" className="reel-nav next" aria-label="Next Short" onClick={next}><Arrow dir="right" /></button>
    </div>
  )
}
