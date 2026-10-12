import { Link } from 'react-router-dom'
import { destinations } from '../data/destinations'
import { SectionHead } from './ui'

const resize = (url) => url.replace(/w=\d+&h=\d+/, 'w=700&h=520')

const cards = [
  ...destinations.map((d, i) => ({
    key: d.slug,
    to: `/${d.slug}`,
    country: d.country,
    role: d.tagline,
    facts: `${d.stats[0].n} ${d.stats[0].l}\n${d.stats[1].n} ${d.stats[1].l}`.toUpperCase(),
    img: resize(d.heroImg),
    alt: `Study in ${d.country}`,
    dot: i === 0 ? '#C8202F' : '#1B3A6B',
  })),
  { key: 'japan', href: '/#contact', country: 'Japan', role: 'Language school + university', facts: 'JAPANESE LANGUAGE PATHWAY\nPART-TIME WORK ALLOWED', img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=700&h=520&fit=crop&auto=format', alt: 'Tokyo street at night', dot: '#1B3A6B' },
  { key: 'korea', href: '/#contact', country: 'South Korea', role: 'Language + degree programs', facts: 'KOREAN LANGUAGE PATHWAY\nD-2 / D-4 STUDENT VISA', img: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=700&h=520&fit=crop&auto=format', alt: 'Seoul street with neon signs', dot: '#1B3A6B' },
]

export default function Destinations() {
  return (
    <section className="section" id="destinations">
      <div className="wrap section-rule">
        <SectionHead
          label="OUR DESTINATIONS"
          title="Seven countries. One honest plan."
          aside="Nepal's exclusive authorized UK university partner — with expert routes to Australia, Canada, New Zealand, the USA, Japan and South Korea."
        >
          <div className="stat-pair">
            <div><b>5000+</b><span>students<br />placed</span></div>
            <div><b>98%</b><span>visa<br />success</span></div>
          </div>
        </SectionHead>
        <div className="grid grid-240">
          {cards.map(c => {
            const inner = (
              <>
                <div className="img"><img src={c.img} alt={c.alt} loading="lazy" width="700" height="520" /></div>
                <div className="body">
                  <div className="top"><span>{c.country}</span><i style={{ background: c.dot }} /></div>
                  <span className="mono" style={{ color: 'var(--muted)' }}>{c.role}</span>
                  <span className="facts">{c.facts}</span>
                </div>
              </>
            )
            return c.to
              ? <Link key={c.key} to={c.to} className="dest-card">{inner}</Link>
              : <a key={c.key} href={c.href} className="dest-card">{inner}</a>
          })}
        </div>
      </div>
    </section>
  )
}
