import { Link } from 'react-router-dom'

export default function PostCard({ post }) {
  return (
    <Link to={`/blog/${post.slug}`} className="post-card">
      <div className="meta"><span className="cat">{post.category}</span><span>{post.date}</span></div>
      <h3>{post.title}</h3>
      <p>{post.excerpt}</p>
      <span className="more">{post.readTime} →</span>
    </Link>
  )
}
