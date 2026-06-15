import { useEffect, useRef, useState } from 'react'

const SECTIONS = [
  { id: 'home',         label: 'Home' },
  { id: 'about',        label: 'About' },
  { id: 'services',     label: 'Services' },
  { id: 'destinations', label: 'Destinations' },
  { id: 'dest-details', label: 'Country Guides' },
  { id: 'faq',          label: 'FAQ' },
  { id: 'stats',        label: 'Track Record' },
  { id: 'contact',      label: 'Contact' },
]

export default function ScrollProgress() {
  const [pct, setPct]             = useState(0)
  const [activeIdx, setActiveIdx] = useState(0)
  const [dragging, setDragging]   = useState(false)
  const trackRef = useRef(null)

  const scrollToPercent = (p) => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    window.scrollTo({ top: maxScroll * Math.min(Math.max(p, 0), 1) })
  }

  const getPctFromEvent = (clientY) => {
    const rect = trackRef.current.getBoundingClientRect()
    return (clientY - rect.top) / rect.height
  }

  /* click on track → jump */
  const onTrackClick = (e) => {
    if (e.target === trackRef.current || e.target.closest('.spr-track')) {
      scrollToPercent(getPctFromEvent(e.clientY))
    }
  }

  /* drag the dot */
  const onDotMouseDown = (e) => {
    e.preventDefault()
    setDragging(true)
  }

  useEffect(() => {
    if (!dragging) return
    const onMove = (e) => {
      const clientY = e.touches ? e.touches[0].clientY : e.clientY
      scrollToPercent(getPctFromEvent(clientY))
    }
    const onUp = () => setDragging(false)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('touchmove', onMove)
    window.addEventListener('touchend', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('touchend', onUp)
    }
  }, [dragging])

  /* track scroll position */
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      setPct(maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0)

      let found = 0
      SECTIONS.forEach(({ id }, i) => {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.55) found = i
      })
      setActiveIdx(found)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="spr-wrap">
      <div
        ref={trackRef}
        className="spr-track"
        onClick={onTrackClick}
        style={{ cursor: 'pointer' }}
      >
        <div className="spr-fill" style={{ height: `${pct}%` }}>
          <div
            className={`spr-dot${dragging ? ' dragging' : ''}`}
            onMouseDown={onDotMouseDown}
            onTouchStart={onDotMouseDown}
            style={{ cursor: dragging ? 'grabbing' : 'grab' }}
          />
        </div>
      </div>

      <div className="spr-steps">
        {SECTIONS.map(({ id, label }, i) => (
          <a
            key={id}
            href={`#${id}`}
            className={`spr-step${i === activeIdx ? ' active' : i < activeIdx ? ' done' : ''}`}
            title={label}
          />
        ))}
      </div>
    </div>
  )
}
