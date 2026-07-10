const partners = [
  // UK
  'University of Manchester', 'University of Leeds', 'University of Sheffield',
  'University of Nottingham', 'University of Birmingham', 'University of Bristol',
  "King's College London", 'Queen Mary University of London',
  // Australia
  'University of Melbourne', 'Australian National University', 'University of Sydney',
  'RMIT University', 'Monash University', 'University of Technology Sydney',
  // Canada
  'University of Toronto', 'University of British Columbia', 'McGill University',
  'Seneca College', 'Humber College', 'Conestoga College',
  // NZ
  'University of Auckland', 'Victoria University of Wellington', 'University of Otago',
  // USA
  'New York University', 'Purdue University', 'Arizona State University',
]

export default function UniPartners() {
  const doubled = [...partners, ...partners]

  return (
    <section className="uni-partners">
      <div className="wrap">
        <div className="uni-header">
          <span className="badge badge-light">Our Network</span>
          <h2 className="s-title s-title-lg">
            200+ Partner <em>Universities</em>
          </h2>
          <p className="uni-sub">
            We have direct admission partnerships with leading universities across
            5 countries — giving our students priority processing and guaranteed guidance.
          </p>
        </div>
      </div>

      <div className="uni-ticker-wrap">
        <div className="uni-ticker">
          {doubled.map((name, i) => (
            <div className="uni-pill" key={i}>
              <span className="uni-dot" />
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
