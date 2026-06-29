import { useScrollTop } from '../hooks/useScroll'
import './ScrollTop.css'

export default function ScrollTop() {
  const visible = useScrollTop()

  return (
    <button
      className={`scroll-top ${visible ? 'visible' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
    >
      <i className="fas fa-arrow-up" aria-hidden="true" />
    </button>
  )
}
