import Navbar from './Navbar'
import Footer from './Footer'
import WhatsApp from './WhatsApp'
import GGBotPopup from './GGBotPopup'

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsApp />
      <GGBotPopup />
    </>
  )
}
