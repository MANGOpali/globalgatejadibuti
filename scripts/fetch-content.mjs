// Pulls published blog posts and videos from Sanity (project ma4cwx8o, public dataset) at build time
// and writes them as JSON the site imports. Publishing in Sanity triggers a Vercel rebuild via webhook.
// If Sanity can't be reached, the last committed JSON is kept so the build never breaks.
import fs from 'node:fs'
import path from 'node:path'

const PROJECT = 'ma4cwx8o'
const DATASET = 'production'
// live API, not the CDN: a build starts seconds after a publish/delete, and the CDN can still serve the old copy
const API = `https://${PROJECT}.api.sanity.io/v2025-01-01/data/query/${DATASET}`
const OUT = path.resolve('src/data')

const POSTS_QUERY = `*[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))] | order(publishedAt desc) {
  "slug": slug.current, title, metaTitle, metaDescription, publishedAt, category, readTime, excerpt, intro, cta, body,
  "imgUrl": coverImage.asset->url, "imgAlt": coverImage.alt, "hotspot": coverImage.hotspot
}`
const VIDEOS_QUERY = `*[_type == "video" && defined(youtubeUrl) && !(_id in path("drafts.**"))] | order(publishedAt desc, _createdAt asc) {
  title, youtubeUrl, category, publishedAt
}`

async function query(groq) {
  const res = await fetch(`${API}?query=${encodeURIComponent(groq)}`)
  if (!res.ok) throw new Error(`Sanity responded ${res.status}`)
  return (await res.json()).result
}

const longDate = (iso) => new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' })
const shortDate = (iso) => new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' })

function imageUrl(url, hotspot) {
  if (!url) return ''
  const params = new URLSearchParams({ w: '1200', h: '600', fit: 'crop', auto: 'format', q: '80' })
  if (hotspot) { params.set('crop', 'focalpoint'); params.set('fp-x', hotspot.x.toFixed(3)); params.set('fp-y', hotspot.y.toFixed(3)) }
  return `${url}?${params}`
}

// Portable Text span -> small rich-text segment: { t, b?, i?, href? }
function segments(block) {
  const links = Object.fromEntries((block.markDefs || []).filter(m => m._type === 'link').map(m => [m._key, m.href]))
  return (block.children || []).map(c => {
    const s = { t: c.text || '' }
    for (const m of c.marks || []) {
      if (m === 'strong') s.b = 1
      else if (m === 'em') s.i = 1
      else if (links[m]) s.href = links[m]
    }
    return s
  })
}
const plain = (segs) => segs.map(s => s.t).join('')

// Portable Text -> the site's existing { heading, body: [{ type, content }] } sections
function toSections(body = []) {
  const sections = []
  let current = null
  const push = (item) => {
    if (!current) { current = { heading: '', body: [] }; sections.push(current) }
    const last = current.body[current.body.length - 1]
    if ((item.type === 'ul' || item.type === 'ol') && last && last.type === item.type) last.content.push(item.content[0])
    else current.body.push(item)
  }
  for (const b of body) {
    if (b._type === 'callout') { push({ type: 'callout', content: b.text || '' }); continue }
    if (b._type !== 'block') continue
    const segs = segments(b)
    if (!plain(segs).trim()) continue
    if (b.style === 'h2') { current = { heading: plain(segs), body: [] }; sections.push(current); continue }
    if (b.listItem === 'bullet') push({ type: 'ul', content: [segs] })
    else if (b.listItem === 'number') push({ type: 'ol', content: [segs] })
    else if (b.style === 'h3') push({ type: 'h3', content: plain(segs) })
    else push({ type: 'p', content: segs })
  }
  return sections
}

function readTime(p, sections) {
  if (p.readTime) return p.readTime
  const text = [p.intro, ...sections.flatMap(s => [s.heading, ...s.body.map(b => JSON.stringify(b.content))])].join(' ')
  return `${Math.max(1, Math.round(text.split(/\s+/).length / 200))} min read`
}

const ytId = (url) => (url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/) || [])[1]

async function main() {
  const [rawPosts, rawVideos] = await Promise.all([query(POSTS_QUERY), query(VIDEOS_QUERY)])

  const posts = rawPosts.map(p => {
    const sections = toSections(p.body)
    return {
      slug: p.slug,
      title: p.title,
      metaTitle: p.metaTitle || `${p.title} | Global Gate Jadibuti`,
      metaDescription: p.metaDescription || p.excerpt,
      date: longDate(p.publishedAt),
      isoDate: p.publishedAt,
      category: p.category,
      readTime: readTime(p, sections),
      img: imageUrl(p.imgUrl, p.hotspot),
      imgAlt: p.imgAlt || p.title,
      excerpt: p.excerpt,
      intro: p.intro || '',
      sections,
      cta: p.cta || '',
    }
  })
  const videos = rawVideos.map(v => ({ id: ytId(v.youtubeUrl), title: v.title, category: v.category, date: shortDate(v.publishedAt), uploadDate: v.publishedAt })).filter(v => v.id)

  if (!posts.length) throw new Error('No posts returned — keeping the existing files')
  fs.writeFileSync(path.join(OUT, 'posts.generated.json'), JSON.stringify(posts, null, 1))
  fs.writeFileSync(path.join(OUT, 'videos.generated.json'), JSON.stringify(videos, null, 1))
  console.log(`[content] ${posts.length} posts and ${videos.length} videos from Sanity`)
}

main().catch(err => {
  console.warn(`[content] Could not refresh from Sanity (${err.message}); using the last saved content.`)
})
