export const SITE_URL = 'https://globalgateconsultancyjadibuti.com.np'
export const PHONE = '015253297'
export const PHONE_DISPLAY = '01-5253297'
export const WHATSAPP = '9779862349049'
export const WHATSAPP_DISPLAY = '+977 986-2349049'
export const EMAIL = 'globalgateedu.jadibuti@gmail.com'
export const HOURS = 'Sunday–Friday · 8 AM – 6 PM'
export const ADDRESS = 'Jadibuti, Kathmandu — near Jadibuti Bus Park'
export const MAPS_URL = 'https://www.google.com/maps/place/Global+Gate+Educational+Consultancy+Jadibuti/@27.674667,85.3533701,20.75z/data=!4m14!1m7!3m6!1s0x39eb198a307baabf:0x53a05069e2ec6273!2sM9F3%2BVC9,+Kathmandu+44600!3b1!8m2!3d27.6746625!4d85.3536094!3m5!1s0x39eb190025d2c649:0x228047147a2fb3a3!8m2!3d27.67473!4d85.3536363!16s%2Fg%2F11z7rlkfk7'
export const MAP_EMBED = 'https://www.google.com/maps?q=27.6746625,85.3536094&z=17&output=embed'

export const waLink = (text) => `https://wa.me/${WHATSAPP}${text ? `?text=${encodeURIComponent(text)}` : ''}`

// AI Pre-CAS interview simulator lives on its own domain; tag every link so its analytics show where students came from.
export const aiInterviewUrl = (placement) =>
  `https://www.ggecaiinterview.com/?utm_source=ggec-website&utm_medium=referral&utm_campaign=${placement}`

export const SOCIALS = [
  { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61589623467706' },
  { label: 'Instagram', href: 'https://www.instagram.com/globalgateeduconsult.jadibuti' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@globalgateedu.jadibuti' },
  { label: 'YouTube', href: 'https://www.youtube.com/@GlobalGateEduJadibuti' },
]

// Destinations shown on the globe, the home grid and the footer.
// Japan and South Korea have no dedicated page yet, so they lead to the contact form.
export const DESTINATIONS = [
  { code: 'UK', name: 'United Kingdom', to: '/study-in-uk-from-nepal', color: '#38BDF8' },
  { code: 'US', name: 'United States', to: '/study-in-usa-from-nepal', color: '#A78BFA' },
  { code: 'CA', name: 'Canada', to: '/study-in-canada-from-nepal', color: '#FB923C' },
  { code: 'AU', name: 'Australia', to: '/study-in-australia-from-nepal', color: '#FACC15' },
  { code: 'NZ', name: 'New Zealand', to: '/study-in-new-zealand-from-nepal', color: '#4ADE80' },
  { code: 'JP', name: 'Japan', to: '/#contact', color: '#F472B6' },
  { code: 'KR', name: 'South Korea', to: '/#contact', color: '#F8FAFC' },
]
