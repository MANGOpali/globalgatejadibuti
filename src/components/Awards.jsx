const credentials = [
  { big: 'UK', color: '#FF8A94', title: "Nepal's exclusive UK university partner", desc: 'Officially authorized by top UK universities — a direct partnership.' },
  { big: '98%', title: 'Visa approval rate', desc: 'Across every destination we send students to.' },
  { big: '5,000+', title: 'Students placed', desc: 'Nepali students now studying abroad — from Jadibuti to universities worldwide.' },
  { big: '10+', title: 'Years of experience', desc: "Trusted by Nepali families since 2014, backed by Global Gate's track record." },
]

export default function Awards() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="trust">
          <span className="mono" style={{ color: 'var(--on-navy-2)', display: 'block', marginBottom: 10 }}>WHY TRUST US</span>
          <h2 className="h3" style={{ marginBottom: 36, maxWidth: 620 }}>Credentials you can check.</h2>
          <div className="trust-grid">
            {credentials.map(c => (
              <div key={c.title}>
                <b style={c.color ? { color: c.color } : undefined}>{c.big}</b>
                <strong>{c.title}</strong>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
