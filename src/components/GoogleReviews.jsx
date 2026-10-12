import { SectionHead } from './ui'
import { MAPS_URL } from '../data/site'

const reviews = [
  { name: 'Sushant Karki', tag: 'UK VISA · 19 DAYS', text: 'Got my UK student visa approved in just 19 days. The team at Global Gate Jadibuti guided me through every document — from CAS to financial proof. Highly recommend to anyone planning to study in the UK.' },
  { name: 'Priya Shrestha', tag: 'AUSTRALIA', text: 'I had been rejected by another consultancy before coming here. Global Gate identified exactly what went wrong with my previous application and fixed it. My Australia visa was approved within 5 weeks.' },
  { name: 'Rohan Thapa', tag: 'MANCHESTER, UK', text: 'Free counseling session was genuinely helpful — no pressure, no upselling. They were honest about my options. Now I am at University of Manchester. The IELTS coaching here also made a big difference.' },
  { name: 'Anisha Maharjan', tag: 'CANADA', text: 'Best consultancy in Jadibuti without a doubt. Very easy to reach — just 2 minutes from the bus park. Staff are knowledgeable and always available to answer questions even after office hours on WhatsApp.' },
]

const Star = () => <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 3 6.6 7 .8-5.2 4.8 1.4 7L12 17.8 5.8 21.2l1.4-7L2 9.4l7-.8z" /></svg>
const initials = (n) => n.split(' ').map(p => p[0]).join('').slice(0, 2)

export default function GoogleReviews() {
  return (
    <section className="section" id="reviews">
      <div className="wrap section-rule">
        <SectionHead label="GOOGLE REVIEWS" title="Started in Jadibuti. Studying abroad now.">
          <a className="link-u" href={MAPS_URL} target="_blank" rel="noopener noreferrer">See all reviews on Google</a>
        </SectionHead>
        <div className="grid grid-270">
          {reviews.map(r => (
            <figure className="review" key={r.name}>
              <div className="head">
                <span className="mono mono-red">{r.tag}</span>
                <span className="stars" role="img" aria-label="5 out of 5 stars"><Star /><Star /><Star /><Star /><Star /></span>
              </div>
              <blockquote>“{r.text}”</blockquote>
              <figcaption><span className="avatar">{initials(r.name)}</span>{r.name}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
