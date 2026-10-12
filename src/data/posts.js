import { blogPosts } from './blogPosts'

// newest first, by publish date
export const sortedPosts = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date))
