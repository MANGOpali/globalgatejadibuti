import { useEffect, useRef, useState } from 'react'

function CountUp({ target, suffix, duration = 2000, active }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active) return
    let t0 = null
    const frame = ts => {
      if (!t0) t0 = ts
      const p = Math.min((ts - t0) / duration, 1)
      setVal(Math.floor(p * target))
      if (p < 1) requestAnimationFrame(frame)
    }
    requestAnimationFrame(frame)
  }, [active, target, duration])
  return <>{val}{suffix}</>
}

const data = [
  { target: 5000, suffix: '+', label: 'Students Placed',         desc: 'Successfully placed in top universities worldwide' },
  { target: 98,   suffix: '%', label: 'Visa Approval Rate',      desc: 'One of the highest approval rates in Nepal' },
  { target: 200,  suffix: '+', label: 'Partner Universities',    desc: 'Across 8 countries on 4 continents' },
  { target: 10,   suffix: '+', label: 'Years of Experience',     desc: 'Trusted by Nepali families since 2014' },
]

export default function Stats() {
  const ref = useRef(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setActive(true) },
      { threshold: 0.3 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="stats" ref={ref} id="stats">
      <div className="wrap">
        <div style={{ textAlign:'center', marginBottom: 56 }}>
          <span className="badge badge-light">By The Numbers</span>
          <h2 className="s-title s-title-lg">
            Our Track Record <em>Speaks</em><br />
            For Itself
          </h2>
        </div>
        <div className="stats-row reveal-group">
          {data.map(d => (
            <div className="stat-block" key={d.label}>
              <div className="stat-n">
                <CountUp target={d.target} suffix={d.suffix} active={active} />
              </div>
              <div className="stat-l">{d.label}</div>
              <div className="stat-d">{d.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
