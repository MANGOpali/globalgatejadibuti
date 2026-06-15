import { useState, useEffect, useRef, useCallback } from 'react'

const reviews = [
  {
    avatar: 'https://images.unsplash.com/photo-1614289371518-722f2615943d?w=80&h=80&fit=crop&crop=face&auto=format',
    text: 'Global Gate Jadibuti made my dream of studying in Australia come true. Their counselors were patient, thorough, and genuinely cared about placing me in the right university. Student visa approved in just 3 weeks!',
    name: 'Priya Shrestha',
    dest: 'B.IT — University of Melbourne, Australia',
  },
  {
    avatar: 'https://images.unsplash.com/photo-1567515004624-219c11d31f2e?w=80&h=80&fit=crop&crop=face&auto=format',
    text: 'I had been rejected by another agency before coming here. The Jadibuti team identified exactly what was wrong with my application and fixed it completely. Now I am studying in Canada!',
    name: 'Bikash Tamang',
    dest: 'Business Management — George Brown College, Canada',
  },
  {
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&crop=face&auto=format',
    text: 'The IELTS prep classes were outstanding. My instructor knew exactly where I needed to improve and I went from band 5.5 to 7.5 in just 6 weeks. Highly recommend their test prep program.',
    name: 'Sujata Gurung',
    dest: 'Masters — University of Leeds, UK · IELTS 7.5',
  },
  {
    avatar: 'https://images.unsplash.com/photo-1618077360395-f3068be8e001?w=80&h=80&fit=crop&crop=face&auto=format',
    text: 'Having the office right here in Jadibuti is so convenient. The team was always available and never once pushed me toward any particular country — completely honest advice throughout.',
    name: 'Roshan Karki',
    dest: 'B.Engineering — University of Auckland, New Zealand',
  },
  {
    avatar: 'https://images.unsplash.com/photo-1596815064285-45ed8a9c0463?w=80&h=80&fit=crop&crop=face&auto=format',
    text: 'Transparent and highly professional. They told me upfront which universities fit my grades. Got into a great university in the USA with a partial scholarship — could not be happier!',
    name: 'Anita Rai',
    dest: 'MSc Computer Science — Purdue University, USA',
  },
  {
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face&auto=format',
    text: 'The pre-departure briefing was incredibly helpful — bank accounts, rental agreements, transport in the UK. I felt fully prepared from day one. Support even continued after I arrived.',
    name: 'Dipesh Magar',
    dest: 'BSc Engineering — University of Sheffield, UK',
  },
]

const TOTAL = reviews.length

function getVisible() {
  if (typeof window === 'undefined') return 3
  if (window.innerWidth < 640) return 1
  if (window.innerWidth < 1024) return 2
  return 3
}

export default function Testimonials() {
  const [idx,      setIdx]     = useState(0)
  const [visible,  setVisible] = useState(getVisible)
  const [dragging, setDragging] = useState(false)
  const pauseRef = useRef(false)
  const timerRef = useRef(null)
  const dragRef  = useRef({ active: false, startX: 0, startIdx: 0 })

  const maxIdx = TOTAL - visible

  const startTimer = useCallback((currentMax) => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      if (!pauseRef.current)
        setIdx(i => (i >= currentMax ? 0 : i + 1))
    }, 4500)
  }, [])

  const go = useCallback((i) => {
    setIdx(Math.max(0, Math.min(maxIdx, i)))
    startTimer(maxIdx)
  }, [maxIdx, startTimer])

  useEffect(() => {
    startTimer(maxIdx)
    return () => clearInterval(timerRef.current)
  }, [maxIdx, startTimer])

  useEffect(() => {
    const update = () => {
      const v = getVisible()
      setVisible(v)
      setIdx(i => Math.min(i, TOTAL - v))
    }
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  /* drag handlers */
  const onDragStart = (clientX) => {
    dragRef.current = { active: true, startX: clientX, startIdx: idx }
    pauseRef.current = true
    setDragging(true)
  }
  const onDragMove = (clientX, viewportWidth) => {
    if (!dragRef.current.active) return
    const delta = clientX - dragRef.current.startX
    const cardW = viewportWidth / visible
    const moved = Math.round(-delta / cardW)
    const newIdx = Math.max(0, Math.min(maxIdx, dragRef.current.startIdx + moved))
    if (newIdx !== idx) setIdx(newIdx)
  }
  const onDragEnd = () => {
    dragRef.current.active = false
    pauseRef.current = false
    setDragging(false)
    startTimer(maxIdx)
  }

  /* shift = -(idx / TOTAL) * 100% of the track */
  const shift = `${-(idx / TOTAL) * 100}%`

  return (
    <section className="testimonials" id="testimonials">
      <div className="wrap">

        <div className="testi-head">
          <div>
            <span className="badge badge-light">Student Stories</span>
            <h2 className="s-title s-title-lg">What Our <em>Students Say</em></h2>
            <p className="s-body">
              Don't just take our word for it — hear from students who
              trusted Global Gate Jadibuti to shape their future.
            </p>
          </div>
          {/* Arrow buttons top-right */}
          <div className="testi-controls">
            <button
              className="testi-btn"
              onClick={() => go(idx <= 0 ? maxIdx : idx - 1)}
              aria-label="Previous"
            >‹</button>
            <button
              className="testi-btn"
              onClick={() => go(idx >= maxIdx ? 0 : idx + 1)}
              aria-label="Next"
            >›</button>
          </div>
        </div>

        {/* Track */}
        <div
          className="testi-viewport"
          onMouseDown={e  => onDragStart(e.clientX)}
          onMouseMove={e  => onDragMove(e.clientX, e.currentTarget.offsetWidth)}
          onMouseUp={onDragEnd}
          onMouseLeave={onDragEnd}
          onTouchStart={e => onDragStart(e.touches[0].clientX)}
          onTouchMove={e  => onDragMove(e.touches[0].clientX, e.currentTarget.offsetWidth)}
          onTouchEnd={onDragEnd}
          style={{ cursor: dragging ? 'grabbing' : 'grab', userSelect: 'none' }}
        >
          <div
            className="testi-track"
            style={{ transform: `translateX(${shift})`, transition: dragging ? 'none' : undefined }}
          >
            {reviews.map((r) => (
              <div className="testi-card" key={r.name}>
                <div className="testi-card-body">
                  <div className="testi-quote-mark">"</div>
                  <div className="testi-stars">★★★★★</div>
                  <p className="testi-text">{r.text}</p>
                  <div className="testi-author">
                    <img src={r.avatar} alt={r.name} className="testi-avatar" />
                    <div>
                      <div className="testi-name">{r.name}</div>
                      <div className="testi-dest">{r.dest}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pill dots */}
        <div className="testi-dots">
          {Array.from({ length: maxIdx + 1 }).map((_, i) => (
            <button
              key={i}
              className={`testi-dot${i === idx ? ' active' : ''}`}
              onClick={() => go(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
