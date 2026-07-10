import FloatingDot    from '../components/FloatingDot'
import Cursor         from '../components/Cursor'
import ScrollProgress from '../components/ScrollProgress'
import ScrollReveal   from '../components/ScrollReveal'
import Navbar         from '../components/Navbar'
import Hero           from '../components/Hero'
import About          from '../components/About'
import Services       from '../components/Services'
import Destinations   from '../components/Destinations'
import GoogleReviews  from '../components/GoogleReviews'
import FAQ            from '../components/FAQ'
import Awards         from '../components/Awards'
import UniPartners    from '../components/UniPartners'
import Blog           from '../components/Blog'
import Contact        from '../components/Contact'
import Footer         from '../components/Footer'
import WhatsApp       from '../components/WhatsApp'

export default function HomePage() {
  return (
    <>
      <Cursor />
      <FloatingDot />
      <ScrollProgress />
      <ScrollReveal />
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Destinations />
      <GoogleReviews />
      <FAQ />
      <Awards />
      <UniPartners />
      <Blog />
      <Contact />
      <Footer />
      <WhatsApp />
    </>
  )
}
