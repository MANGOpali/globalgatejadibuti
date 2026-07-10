import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import BlogListPage from './pages/BlogListPage'
import BlogPostPage from './pages/BlogPostPage'
import DestinationPage from './pages/DestinationPage'
import ServicePage from './pages/ServicePage'
import LocalPage from './pages/LocalPage'
import VideosPage from './pages/VideosPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
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
  )
}
