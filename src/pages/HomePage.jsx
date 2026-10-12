import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import About from '../components/About'
import Services from '../components/Services'
import AIInterview from '../components/AIInterview'
import Destinations from '../components/Destinations'
import GoogleReviews from '../components/GoogleReviews'
import Awards from '../components/Awards'
import FAQ from '../components/FAQ'
import Blog from '../components/Blog'
import SessionCta from '../components/SessionCta'
import Contact from '../components/Contact'

export default function HomePage() {
  const { hash } = useLocation()

  // arriving from another page with /#section (or a globe click on Japan/Korea): scroll to that section
  useEffect(() => {
    if (!hash) return
    const t = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60)
    return () => clearTimeout(t)
  }, [hash])

  return (
    <Layout>
      <Hero />
      <About />
      <Services />
      <AIInterview />
      <Destinations />
      <GoogleReviews />
      <Awards />
      <FAQ />
      <Blog />
      <SessionCta />
      <Contact />
    </Layout>
  )
}
