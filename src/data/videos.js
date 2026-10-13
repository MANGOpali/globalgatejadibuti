// Videos are added in Sanity Studio (paste the YouTube link); refreshed on every build.
// Links like youtube.com/shorts/… are vertical Shorts and are shown in their own row.
import videos from './videos.generated.json'

export { videos }
export const longVideos = videos.filter(v => !v.short)
export const shorts = videos.filter(v => v.short)

// categories (as chosen in the Studio) that belong on each destination / service page
const PAGE_TOPICS = {
  'study-in-uk-from-nepal': ['UK Visa', 'UK Study'],
  'study-in-australia-from-nepal': ['Australia'],
  'study-in-canada-from-nepal': ['Canada'],
  'study-in-new-zealand-from-nepal': ['New Zealand'],
  'study-in-usa-from-nepal': ['USA'],
  'study-in-japan-from-nepal': ['Japan'],
  'study-in-south-korea-from-nepal': ['South Korea'],
  'ielts-classes-jadibuti': ['IELTS & PTE'],
  'pte-classes-jadibuti': ['IELTS & PTE'],
  'uk-student-visa-process': ['UK Visa', 'UK Study'],
  'australia-student-visa-process': ['Australia'],
  'scholarships': ['Study Abroad Tips'],
}
export const shortsForPage = (slug) => {
  const topics = PAGE_TOPICS[slug] || []
  return shorts.filter(v => topics.includes(v.category))
}
