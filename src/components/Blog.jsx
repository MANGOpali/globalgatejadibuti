import { Link } from 'react-router-dom'
import { blogPosts } from '../data/blogPosts'

const preview = blogPosts.slice(0, 3)

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
          <Link to="/blog" className="btn-pill btn-blue">
            View All Articles
            <span className="arrow-circle">→</span>
          </Link>
        </div>

        <div className="blog-grid reveal-group">
          {preview.map(p => (
            <Link to={`/blog/${p.slug}`} key={p.slug} className="blog-card" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
              <div className="blog-img">
                <img src={p.img} alt={p.title} loading="lazy" />
                <div className="blog-img-overlay" />
              </div>
              <div className="blog-body">
                <span className="blog-cat">{p.category}</span>
                <div className="blog-meta">{p.date}</div>
                <div className="blog-title">{p.title}</div>
                <p className="blog-excerpt">{p.excerpt}</p>
                <span className="blog-read">Read Article →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
