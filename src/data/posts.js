import { blogPosts } from './blogPosts'

// newest first, by publish date
export const sortedPosts = [...blogPosts].sort((a, b) => (b.isoDate || '').localeCompare(a.isoDate || '') || new Date(b.date) - new Date(a.date))
