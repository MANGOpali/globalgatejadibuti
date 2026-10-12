import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'

// inner pages load on demand so the home page ships less JavaScript
const BlogListPage = lazy(() => import('./pages/BlogListPage'))
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'))
const DestinationPage = lazy(() => import('./pages/DestinationPage'))
const ServicePage = lazy(() => import('./pages/ServicePage'))
const LocalPage = lazy(() => import('./pages/LocalPage'))
const VideosPage = lazy(() => import('./pages/VideosPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

export default function App() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogListPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/study-in-uk-from-nepal" element={<DestinationPage />} />
        <Route path="/study-in-australia-from-nepal" element={<DestinationPage />} />
        <Route path="/study-in-canada-from-nepal" element={<DestinationPage />} />
        <Route path="/study-in-new-zealand-from-nepal" element={<DestinationPage />} />
        <Route path="/study-in-usa-from-nepal" element={<DestinationPage />} />
        <Route path="/ielts-classes-jadibuti" element={<ServicePage />} />
        <Route path="/pte-classes-jadibuti" element={<ServicePage />} />
        <Route path="/uk-student-visa-process" element={<ServicePage />} />
        <Route path="/australia-student-visa-process" element={<ServicePage />} />
        <Route path="/scholarships" element={<ServicePage />} />
        <Route path="/study-abroad-consultancy-jadibuti" element={<LocalPage />} />
        <Route path="/educational-consultancy-jadibuti" element={<LocalPage />} />
        <Route path="/study-abroad-consultancy-koteshwor" element={<LocalPage />} />
        <Route path="/study-abroad-consultancy-baneshwor" element={<LocalPage />} />
        <Route path="/study-abroad-consultancy-pepsicola" element={<LocalPage />} />
        <Route path="/videos" element={<VideosPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  )
}
