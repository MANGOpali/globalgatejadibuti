import { Link } from 'react-router-dom'
import { blogPosts } from '../data/blogPosts'
import { sortedPosts } from '../data/posts'
import PostCard from './PostCard'
import { SectionHead } from './ui'

export default function Blog() {
  return (
    <section className="section" id="blog">
      <div className="wrap section-rule">
        <SectionHead label="LATEST GUIDES" title="Read before you apply.">
          <Link to="/blog" className="link-u">All {blogPosts.length} articles</Link>
        </SectionHead>
        <div className="grid grid-300">
          {sortedPosts.slice(0, 3).map(p => <PostCard key={p.slug} post={p} />)}
        </div>
      </div>
    </section>
  )
}
