import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'

export default function NotFoundPage() {
  useEffect(() => {
    document.title = 'Page Not Found | Global Gate Jadibuti'
  }, [])

  return (
    <Layout>
      <section className="nf">
        <div className="copy">
          <span className="mono">ERROR 404 · ROUTE NOT FOUND</span>
          <h1 className="h1">This page took a wrong turn.</h1>
          <p className="lead">The link may be old or mistyped. Here's where most students are headed:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            <Link to="/" className="btn btn-red">Back to home</Link>
            <Link to="/study-in-uk-from-nepal" className="btn btn-line">Study in UK</Link>
            <Link to="/ielts-classes-jadibuti" className="btn btn-line">IELTS classes</Link>
            <Link to="/blog" className="btn btn-line">Guides</Link>
          </div>
        </div>
        <div className="art">
          <svg viewBox="0 0 400 400" role="img" aria-label="A dotted globe with a route that loops back on itself" style={{ width: '100%', maxWidth: 420, height: 'auto' }}>
            <circle cx="200" cy="200" r="150" fill="none" stroke="#1B3A6B" strokeOpacity=".18" />
            <g className="spin">
              <ellipse cx="200" cy="200" rx="150" ry="52" fill="none" stroke="#1B3A6B" strokeOpacity=".25" strokeDasharray="2 7" />
              <ellipse cx="200" cy="200" rx="150" ry="110" fill="none" stroke="#1B3A6B" strokeOpacity=".25" strokeDasharray="2 7" />
              <ellipse cx="200" cy="200" rx="52" ry="150" fill="none" stroke="#1B3A6B" strokeOpacity=".25" strokeDasharray="2 7" />
              <ellipse cx="200" cy="200" rx="110" ry="150" fill="none" stroke="#1B3A6B" strokeOpacity=".25" strokeDasharray="2 7" />
              <line x1="50" y1="200" x2="350" y2="200" stroke="#1B3A6B" strokeOpacity=".25" strokeDasharray="2 7" />
              <line x1="200" y1="50" x2="200" y2="350" stroke="#1B3A6B" strokeOpacity=".25" strokeDasharray="2 7" />
            </g>
            <path d="M150 240 C 120 140, 260 90, 280 170 S 190 290, 170 200 S 240 150, 250 205" fill="none" stroke="#C8202F" strokeWidth="3" strokeLinecap="round" />
            <circle cx="150" cy="240" r="7" fill="#C8202F" />
            <circle cx="250" cy="205" r="9" fill="#FBFBFA" stroke="#0E1424" strokeWidth="3" />
          </svg>
        </div>
      </section>
    </Layout>
  )
}
