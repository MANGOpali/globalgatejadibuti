// Runs after `vite build`. Writes one HTML file per route (dist/blog/<slug>.html, dist/study-in-uk-from-nepal.html, …)
// with that page's own <title>, description, canonical URL, Open Graph / Twitter preview tags and structured data,
// so Google and link previews (WhatsApp, Facebook, LinkedIn) see the right details without running JavaScript.
// The React app still boots normally on top. Vercel serves these files first (cleanUrls), then falls back to index.html.
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const SITE = 'https://globalgateconsultancyjadibuti.com.np'
const DIST = path.resolve('dist')
const LOGO = `${SITE}/global_gate.png`
const DEFAULT_IMAGE = `${SITE}/hearder.webp`
const ORG = 'Global Gate Educational Consultancy — Jadibuti Branch'

const load = async (file) => import(pathToFileURL(path.resolve(file)).href)
const { destinations } = await load('src/data/destinations.js')
const { servicePages } = await load('src/data/servicePages.js')
const { localPages } = await load('src/data/localPages.js')
const posts = JSON.parse(fs.readFileSync(path.resolve('src/data/posts.generated.json'), 'utf-8'))
const videos = JSON.parse(fs.readFileSync(path.resolve('src/data/videos.generated.json'), 'utf-8'))

const template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf-8')

const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const breadcrumb = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: it.url })),
})
const faqSchema = (faqs) => faqs?.length ? {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
} : null

function render({ route, title, description, image = DEFAULT_IMAGE, type = 'website', ld = {}, extraHead = '' }) {
  const url = `${SITE}${route}`
  let html = template
  const meta = (attr, key, value) => {
    const re = new RegExp(`(<meta\\s+${attr}="${key}"\\s+content=")[^"]*(")`)
    html = re.test(html) ? html.replace(re, `$1${esc(value)}$2`) : html.replace('</head>', `    <meta ${attr}="${key}" content="${esc(value)}" />\n  </head>`)
  }
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
  meta('name', 'description', description)
  meta('property', 'og:type', type)
  meta('property', 'og:url', url)
  meta('property', 'og:title', title)
  meta('property', 'og:description', description)
  meta('property', 'og:image', image)
  meta('name', 'twitter:title', title)
  meta('name', 'twitter:description', description)
  meta('name', 'twitter:image', image)
  // the home page FAQ markup only belongs on the home page
  html = html.replace(/\s*<!-- JSON-LD Structured Data: FAQ Page[\s\S]*?<\/script>/, '')
  // same ids the pages use at runtime, so the app reuses these tags instead of adding duplicates
  const scripts = Object.entries(ld).filter(([, v]) => v)
    .map(([id, v]) => `    <script type="application/ld+json" id="${id}">${JSON.stringify(v).replace(/</g, '\\u003c')}</script>`).join('\n')
  html = html.replace('</head>', `${extraHead}${scripts}\n  </head>`)

  const file = path.join(DIST, `${route.replace(/^\//, '')}.html`)
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, html)
}

const pages = []

pages.push({
  route: '/blog',
  title: 'UK Study Abroad Blog — Visa Guides, University Tips & IELTS Advice | Global Gate Jadibuti',
  description: "Expert guides for Nepali students studying in the UK — visa process, university rankings, IELTS tips, cost breakdowns, and post-study work rights. From Nepal's exclusive UK consultancy in Jadibuti.",
})

pages.push({
  route: '/videos',
  title: 'Videos — UK Visa & Study Abroad Tips for Nepali Students | Global Gate Jadibuti',
  description: 'Watch our expert videos on UK student visa interviews, study abroad tips, and IELTS guidance for Nepali students. Global Gate Consultancy Jadibuti.',
  image: videos[0] ? `https://img.youtube.com/vi/${videos[0].id}/hqdefault.jpg` : DEFAULT_IMAGE,
  ld: {
    'video-schema': {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Study Abroad Video Guides — Global Gate Jadibuti',
      url: `${SITE}/videos`,
      itemListElement: videos.map((v, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'VideoObject',
          name: v.title,
          description: v.title,
          thumbnailUrl: `https://img.youtube.com/vi/${v.id}/maxresdefault.jpg`,
          uploadDate: v.uploadDate,
          embedUrl: `https://www.youtube.com/embed/${v.id}`,
          url: `https://www.youtube.com/watch?v=${v.id}`,
          publisher: { '@type': 'Organization', name: 'Global Gate Educational Consultancy Jadibuti', url: SITE },
        },
      })),
    },
  },
})

for (const p of posts) {
  const url = `${SITE}/blog/${p.slug}`
  pages.push({
    route: `/blog/${p.slug}`,
    title: p.metaTitle,
    description: p.metaDescription,
    image: p.img || DEFAULT_IMAGE,
    type: 'article',
    extraHead: `    <meta property="article:published_time" content="${esc(p.isoDate)}" />\n    <meta property="article:section" content="${esc(p.category)}" />\n`,
    ld: {
      'article-ld': {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: p.title,
        description: p.metaDescription,
        image: p.img,
        datePublished: p.isoDate,
        mainEntityOfPage: url,
        author: { '@type': 'Organization', name: ORG, url: SITE },
        publisher: { '@type': 'Organization', name: 'Global Gate Educational Consultancy', logo: { '@type': 'ImageObject', url: LOGO } },
      },
      'breadcrumb-ld': breadcrumb([{ name: 'Home', url: `${SITE}/` }, { name: 'Blog', url: `${SITE}/blog` }, { name: p.title, url }]),
    },
  })
}

for (const d of destinations) {
  const url = `${SITE}/${d.slug}`
  pages.push({
    route: `/${d.slug}`,
    title: d.metaTitle,
    description: d.metaDescription,
    image: d.heroImg,
    ld: {
      'dest-breadcrumb-ld': breadcrumb([{ name: 'Home', url: `${SITE}/` }, { name: 'Destinations', url: `${SITE}/#destinations` }, { name: `Study in ${d.country}`, url }]),
      'dest-edu-ld': {
        '@context': 'https://schema.org',
        '@type': 'EducationalOrganization',
        name: ORG,
        url: SITE,
        description: d.metaDescription,
        address: { '@type': 'PostalAddress', addressLocality: 'Jadibuti, Kathmandu', addressCountry: 'NP' },
      },
    },
  })
}

for (const s of servicePages) {
  const url = `${SITE}/${s.slug}`
  pages.push({
    route: `/${s.slug}`,
    title: s.metaTitle,
    description: s.metaDescription,
    image: s.heroImg,
    ld: {
      'sp-breadcrumb-ld': breadcrumb([{ name: 'Home', url: `${SITE}/` }, { name: 'Services', url: `${SITE}/#services` }, { name: s.title, url }]),
      'sp-faq-ld': faqSchema(s.faqs),
    },
  })
}

for (const l of localPages) {
  const url = `${SITE}/${l.slug}`
  pages.push({
    route: `/${l.slug}`,
    title: l.metaTitle,
    description: l.metaDescription,
    image: l.heroImg,
    ld: {
      'lp-breadcrumb-ld': breadcrumb([{ name: 'Home', url: `${SITE}/` }, { name: l.title, url }]),
      'lp-localbiz-ld': {
        '@context': 'https://schema.org',
        '@type': 'EducationalOrganization',
        name: ORG,
        url: `${SITE}/`,
        telephone: '+977-1-5253297',
        address: { '@type': 'PostalAddress', streetAddress: 'Jadibuti, Near Jadibuti Bus Park', addressLocality: 'Kathmandu', addressCountry: 'NP' },
        areaServed: l.areaName,
        openingHours: 'Su-Fr 08:00-18:00',
        description: l.metaDescription,
      },
      'lp-faq-ld': faqSchema(l.faqs),
    },
  })
}

pages.forEach(render)
console.log(`[prerender] Wrote ${pages.length} page files with their own title, description and preview tags`)
