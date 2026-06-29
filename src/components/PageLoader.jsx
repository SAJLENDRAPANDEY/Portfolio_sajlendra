import './PageLoader.css'

// Shown briefly by <Suspense> while a lazy-loaded page chunk downloads.
// A subtle skeleton bar feels more "premium" than a spinner and matches
// the loading-skeleton pattern used elsewhere (see ProjectCardSkeleton).
export default function PageLoader() {
  return (
    <div className="page-loader" role="status" aria-live="polite" aria-label="Loading page">
      <div className="page-loader-bar" />
      <span className="sr-only">Loading…</span>
    </div>
  )
}
