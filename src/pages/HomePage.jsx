import FloatingDot    from '../components/FloatingDot'
import Cursor         from '../components/Cursor'
import ScrollProgress from '../components/ScrollProgress'
import ScrollReveal   from '../components/ScrollReveal'
import Navbar         from '../components/Navbar'
import Hero           from '../components/Hero'
import About          from '../components/About'
import Services       from '../components/Services'
import Destinations   from '../components/Destinations'
import Testimonials   from '../components/Testimonials'
import FAQ            from '../components/FAQ'
import Stats          from '../components/Stats'
import Awards         from '../components/Awards'
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
      <Testimonials />
      <FAQ />
      <Stats />
      <Awards />
      <Blog />
      <Contact />
      <Footer />
      <WhatsApp />
    </>
  )
}
