const posts = [
  {
    img:     'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600&h=260&fit=crop&auto=format',
    cat:     'Study Abroad',
    date:    'May 10, 2026',
    title:   'Complete Guide to Student Visa for Australia in 2026',
    excerpt: 'Everything you need to know — GTE requirements, financial documents, health insurance, and the step-by-step application process.',
  },
  {
    img:     'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=260&fit=crop&auto=format',
    cat:     'Scholarships',
    date:    'April 28, 2026',
    title:   'Top 10 Scholarships for Nepali Students Studying Abroad',
    excerpt: 'From fully-funded government scholarships in Denmark and Finland to merit awards in Australia and the UK — find your best options.',
  },
  {
    img:     'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&h=260&fit=crop&auto=format',
    cat:     'Test Prep',
    date:    'April 15, 2026',
    title:   'IELTS vs PTE in 2026: Which Test Should You Take?',
    excerpt: 'A detailed comparison of IELTS and PTE Academic — acceptance rates, preparation time, computer vs paper, and which is easier for Nepali students.',
  },
]

export default function Blog() {
  return (
    <section className="blog" id="blog">
      <div className="wrap">
        <div className="blog-header">
          <div>
            <span className="badge badge-light">Insights &amp; Guides</span>
            <h2 className="s-title s-title-lg" style={{ marginBottom: 0 }}>
              Latest <em>Articles</em>
            </h2>
          </div>
          <a href="#contact" className="btn-pill btn-blue">
            View All Articles
            <span className="arrow-circle">→</span>
          </a>
        </div>

        <div className="blog-grid reveal-group">
          {posts.map(p => (
            <div className="blog-card" key={p.title}>
              <div className="blog-img">
                <img src={p.img} alt={p.title} loading="lazy" />
                <div className="blog-img-overlay" />
              </div>
              <div className="blog-body">
                <span className="blog-cat">{p.cat}</span>
                <div className="blog-meta">{p.date}</div>
                <div className="blog-title">{p.title}</div>
                <p className="blog-excerpt">{p.excerpt}</p>
                <span className="blog-read">Read Article →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
