import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

const BASE_URL = 'https://globalgateconsultancyjadibuti.com.np'

function sitemapPlugin() {
  return {
    name: 'generate-sitemap',
    closeBundle() {
      // posts come from Sanity via scripts/fetch-content.mjs (src/data/posts.generated.json)
      const posts = JSON.parse(fs.readFileSync(path.resolve('src/data/posts.generated.json'), 'utf-8'))
      const slugs = posts.map(p => p.slug)
      const dates = posts.map(p => p.isoDate)

      const today = new Date().toISOString().split('T')[0]

      const staticUrls = [
        { loc: `${BASE_URL}/`,                        lastmod: today, changefreq: 'monthly', priority: '1.0' },
        { loc: `${BASE_URL}/blog`,                    lastmod: today, changefreq: 'weekly',  priority: '0.9' },
        { loc: `${BASE_URL}/videos`,                  lastmod: today, changefreq: 'weekly',  priority: '0.8' },
        { loc: `${BASE_URL}/study-in-uk-from-nepal`,             lastmod: today, changefreq: 'monthly', priority: '0.9' },
        { loc: `${BASE_URL}/study-in-australia-from-nepal`,      lastmod: today, changefreq: 'monthly', priority: '0.9' },
        { loc: `${BASE_URL}/study-in-canada-from-nepal`,         lastmod: today, changefreq: 'monthly', priority: '0.9' },
        { loc: `${BASE_URL}/study-in-new-zealand-from-nepal`,    lastmod: today, changefreq: 'monthly', priority: '0.9' },
        { loc: `${BASE_URL}/study-in-usa-from-nepal`,            lastmod: today, changefreq: 'monthly', priority: '0.9' },
        { loc: `${BASE_URL}/study-in-japan-from-nepal`,          lastmod: today, changefreq: 'monthly', priority: '0.9' },
        { loc: `${BASE_URL}/study-in-south-korea-from-nepal`,    lastmod: today, changefreq: 'monthly', priority: '0.9' },
        { loc: `${BASE_URL}/ielts-classes-jadibuti`,             lastmod: today, changefreq: 'monthly', priority: '0.9' },
        { loc: `${BASE_URL}/pte-classes-jadibuti`,               lastmod: today, changefreq: 'monthly', priority: '0.9' },
        { loc: `${BASE_URL}/uk-student-visa-process`,            lastmod: today, changefreq: 'monthly', priority: '0.9' },
        { loc: `${BASE_URL}/australia-student-visa-process`,     lastmod: today, changefreq: 'monthly', priority: '0.9' },
        { loc: `${BASE_URL}/scholarships`,                       lastmod: today, changefreq: 'monthly', priority: '0.9' },
        { loc: `${BASE_URL}/study-abroad-consultancy-jadibuti`,  lastmod: today, changefreq: 'monthly', priority: '0.8' },
        { loc: `${BASE_URL}/educational-consultancy-jadibuti`,   lastmod: today, changefreq: 'monthly', priority: '0.8' },
        { loc: `${BASE_URL}/study-abroad-consultancy-koteshwor`, lastmod: today, changefreq: 'monthly', priority: '0.8' },
        { loc: `${BASE_URL}/study-abroad-consultancy-baneshwor`, lastmod: today, changefreq: 'monthly', priority: '0.8' },
        { loc: `${BASE_URL}/study-abroad-consultancy-pepsicola`, lastmod: today, changefreq: 'monthly', priority: '0.8' },
      ]

      const postUrls = slugs.map((slug, i) => ({
        loc: `${BASE_URL}/blog/${slug}`,
        lastmod: dates[i] || today,
        changefreq: 'monthly',
        priority: '0.8',
      }))

      const xml = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...[...staticUrls, ...postUrls].map(u =>
          `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`
        ),
        '</urlset>',
      ].join('\n')

      // write into the build output (what gets deployed) and public/ (for local dev)
      fs.writeFileSync(path.resolve('public/sitemap.xml'), xml)
      if (fs.existsSync(path.resolve('dist'))) fs.writeFileSync(path.resolve('dist/sitemap.xml'), xml)
      console.log(`[sitemap] Generated ${staticUrls.length + postUrls.length} URLs → dist/sitemap.xml`)
    },
  }
}

export default defineConfig({
  plugins: [react(), sitemapPlugin()],
  server: {
    port: 5000,
  },
})
