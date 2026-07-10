const reviews = [
  {
    name: 'Sushant Karki',
    rating: 5,
    date: 'June 2026',
    text: 'Got my UK student visa approved in just 19 days. The team at Global Gate Jadibuti guided me through every document — from CAS to financial proof. Highly recommend to anyone planning to study in the UK.',
    country: '🇬🇧 UK',
  },
  {
    name: 'Priya Shrestha',
    rating: 5,
    date: 'May 2026',
    text: 'I had been rejected by another consultancy before coming here. Global Gate identified exactly what went wrong with my previous application and fixed it. My Australia visa was approved within 5 weeks.',
    country: '🇦🇺 Australia',
  },
  {
    name: 'Rohan Thapa',
    rating: 5,
    date: 'April 2026',
    text: 'Free counseling session was genuinely helpful — no pressure, no upselling. They were honest about my options. Now I am at University of Manchester. The IELTS coaching here also made a big difference.',
    country: '🇬🇧 UK',
  },
  {
    name: 'Anisha Maharjan',
    rating: 5,
    date: 'March 2026',
    text: 'Best consultancy in Jadibuti without a doubt. Very easy to reach — just 2 minutes from the bus park. Staff are knowledgeable and always available to answer questions even after office hours on WhatsApp.',
    country: '🇨🇦 Canada',
  },
]

const Stars = ({ n }) => (
  <div className="gr-stars">
    {Array.from({ length: n }).map((_, i) => (
      <svg key={i} viewBox="0 0 20 20" fill="#FBBF24" width="16" height="16">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
      </svg>
    ))}
  </div>
)

export default function GoogleReviews() {
  return (
    <section className="gr-section">
      <div className="wrap">

        <div className="gr-header">
          <div>
            <span className="badge badge-light">Google Reviews</span>
            <h2 className="s-title s-title-lg">
              What Students <em>Say About Us</em>
            </h2>
          </div>
          <a
            href="https://www.google.com/maps/place/Global+Gate+Educational+Consultancy+Jadibuti/@27.674667,85.3533701,20.75z/data=!4m14!1m7!3m6!1s0x39eb198a307baabf:0x53a05069e2ec6273!2sM9F3%2BVC9,+Kathmandu+44600!3b1!8m2!3d27.6746625!4d85.3536094!3m5!1s0x39eb190025d2c649:0x228047147a2fb3a3!8m2!3d27.67473!4d85.3536363!16s%2Fg%2F11z7rlkfk7"
            target="_blank"
            rel="noreferrer"
            className="gr-google-btn"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            View All Reviews on Google
          </a>
        </div>

        <div className="gr-rating-bar">
          <div className="gr-rating-score">5.0</div>
          <div>
            <Stars n={5} />
            <div className="gr-rating-label">Based on Google Reviews · Global Gate Jadibuti</div>
          </div>
        </div>

        <div className="gr-grid reveal-group">
          {reviews.map(r => (
            <div className="gr-card" key={r.name}>
              <div className="gr-card-top">
                <div className="gr-avatar">{r.name.charAt(0)}</div>
                <div>
                  <div className="gr-name">{r.name}</div>
                  <div className="gr-meta">{r.country} · {r.date}</div>
                </div>
                <svg className="gr-google-icon" viewBox="0 0 24 24" width="20" height="20" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </div>
              <Stars n={r.rating} />
              <p className="gr-text">"{r.text}"</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
