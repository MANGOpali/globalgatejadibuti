import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useEffect } from 'react'

export default function NotFoundPage() {
  useEffect(() => {
    document.title = 'Page Not Found | Global Gate Jadibuti'
  }, [])

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '4rem 1rem' }}>
        <h1 style={{ fontSize: '6rem', fontWeight: 800, margin: 0, lineHeight: 1 }}>404</h1>
        <h2 style={{ fontSize: '1.5rem', marginTop: '1rem' }}>Page Not Found</h2>
        <p style={{ color: '#666', maxWidth: '400px', margin: '1rem auto' }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link to="/" className="btn-pill btn-navy">
            Go Home <span className="arrow-circle">→</span>
          </Link>
          <Link to="/blog" className="btn-pill" style={{ border: '1px solid #ccc' }}>
            View Blog
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
