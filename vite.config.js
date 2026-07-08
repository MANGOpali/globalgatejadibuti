import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

const BASE_URL = 'https://globalgateconsultancyjadibuti.com.np'

function sitemapPlugin() {
  return {
    name: 'generate-sitemap',
    closeBundle() {
      // Dynamically import blogPosts at build time via file read + eval-free parse
      const postsFile = path.resolve('src/data/blogPosts.js')
      const raw = fs.readFileSync(postsFile, 'utf-8')

      // Extract slugs and dates using regex — no eval needed
      const slugs = [...raw.matchAll(/slug:\s*'([^']+)'/g)].map(m => m[1])
      const dates = [...raw.matchAll(/date:\s*'([^']+)'/g)].map(m => {
        const d = new Date(m[1])
        return isNaN(d) ? new Date().toISOString().split('T')[0] : d.toISOString().split('T')[0]
      })

      const today = new Date().toISOString().split('T')[0]

      const staticUrls = [
        { loc: `${BASE_URL}/`,                        lastmod: today, changefreq: 'monthly', priority: '1.0' },
        { loc: `${BASE_URL}/blog`,                    lastmod: today, changefreq: 'weekly',  priority: '0.9' },
        { loc: `${BASE_URL}/study-in-uk-from-nepal`,             lastmod: today, changefreq: 'monthly', priority: '0.9' },
        { loc: `${BASE_URL}/study-in-australia-from-nepal`,      lastmod: today, changefreq: 'monthly', priority: '0.9' },
        { loc: `${BASE_URL}/study-in-canada-from-nepal`,         lastmod: today, changefreq: 'monthly', priority: '0.9' },
        { loc: `${BASE_URL}/study-in-new-zealand-from-nepal`,    lastmod: today, changefreq: 'monthly', priority: '0.9' },
        { loc: `${BASE_URL}/study-in-usa-from-nepal`,            lastmod: today, changefreq: 'monthly', priority: '0.9' },
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

      fs.writeFileSync(path.resolve('public/sitemap.xml'), xml)
      console.log(`[sitemap] Generated ${slugs.length + 2} URLs → public/sitemap.xml`)
    },
  }
}

export default defineConfig({
  plugins: [react(), sitemapPlugin()],
  server: {
    port: 5000,
  },
})
