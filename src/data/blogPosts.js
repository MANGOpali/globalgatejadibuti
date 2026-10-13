// Blog posts are written in Sanity Studio (https://ggec-jadibuti.sanity.studio).
// scripts/fetch-content.mjs refreshes this JSON on every build; publishing in Sanity triggers a rebuild.
import posts from './posts.generated.json'

export const blogPosts = posts
export const getPostBySlug = (slug) => blogPosts.find(p => p.slug === slug)
