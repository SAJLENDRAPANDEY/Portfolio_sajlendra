import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { lazy, Suspense } from 'react'
import PageLoader from '../components/PageLoader'

// Lazy-load route-level pages so each one becomes its own JS chunk and
// is only downloaded when the user actually navigates there. Cuts the
// initial bundle size and improves first-load / Lighthouse performance.
const Home           = lazy(() => import('../pages/Home'))
const ResumePage     = lazy(() => import('../pages/ResumePage'))
const ExperiencePage = lazy(() => import('../pages/ExperiencePage'))
const ProjectsPage   = lazy(() => import('../pages/ProjectsPage'))
const ProjectDetail  = lazy(() => import('../pages/ProjectDetail'))
const NotFound       = lazy(() => import('../pages/NotFound'))

export default function AppRoutes() {
  const location = useLocation()
  return (
    <Suspense fallback={<PageLoader />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/"                    element={<Home />} />
          <Route path="/resume"              element={<ResumePage />} />
          <Route path="/experience"          element={<ExperiencePage />} />
          <Route path="/projects"            element={<ProjectsPage />} />
          <Route path="/projects/:id"        element={<ProjectDetail />} />
          <Route path="*"                    element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  )
}
