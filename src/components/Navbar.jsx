import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useScrollProgress } from '../hooks/useScroll'
import './Navbar.css'

const links = [
  { label: 'About',      href: '/#about',      external: false },
  { label: 'Skills',     href: '/#skills',     external: false },
  { label: 'Projects',   href: '/projects',    external: false },
  { label: 'Experience', href: '/experience',  external: false },
  { label: 'GitHub',     href: '/#github',     external: false },
  { label: 'Blogs',      href: '/#blogs',      external: false },
  { label: 'Contact',    href: '/#contact',    external: false, cta: true },
]

// Live IST clock for the navbar — ticks every second.
// Kept local to Navbar (separate from the one in Footer.jsx) since each
// only re-renders its own small corner of the tree, not the whole page.
function useLiveClock() {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return now
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { progress, scrolled } = useScrollProgress()
  const location = useLocation()
  const clock = useLiveClock()

  const timeStr = clock.toLocaleTimeString('en-IN', {
    hour:     '2-digit',
    minute:   '2-digit',
    hour12:   true,
    timeZone: 'Asia/Kolkata',
  })

  // Lock body scroll while the mobile menu is open, and let Escape close it
  // — both are expected behaviors for an overlay nav and were missing.
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  // Close the mobile menu automatically on route change so it never stays
  // open behind a newly-navigated page.
  useEffect(() => { setOpen(false) }, [location.pathname])

  return (
    <>
      <div className="scroll-progress-bar" role="progressbar" aria-label="Page scroll progress" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
        <div className="scroll-progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <nav className={`navbar${scrolled ? ' scrolled' : ''}`} aria-label="Primary">
        <Link to="/" className="nav-logo" aria-label="Sajlendra Pandey — home">SP<span>.</span></Link>

        <ul className={`nav-links${open ? ' open' : ''}`} id="primary-nav-menu">
          {links.map((l) => (
            <li key={l.label}>
              {l.href.startsWith('/') && !l.href.startsWith('/#') ? (
                <Link
                  to={l.href}
                  className={`${l.cta ? 'nav-cta' : ''}${location.pathname === l.href ? ' active' : ''}`}
                  aria-current={location.pathname === l.href ? 'page' : undefined}
                  onClick={() => setOpen(false)}
                >
                  {l.cta ? 'Hire Me' : l.label}
                </Link>
              ) : (
                <a
                  href={l.href}
                  className={l.cta ? 'nav-cta' : ''}
                  onClick={() => setOpen(false)}
                >
                  {l.cta ? 'Hire Me' : l.label}
                </a>
              )}
            </li>
          ))}
          <li>
            <Link to="/resume" className="nav-resume-btn" onClick={() => setOpen(false)}>
              <i className="fas fa-file-pdf" aria-hidden="true" /> Resume
            </Link>
          </li>
        </ul>

        <div className="nav-right">
          <span className="nav-clock" aria-label="Current time, India">
            <i className="fas fa-clock" aria-hidden="true" />
            {timeStr}
          </span>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          >
            {theme === 'dark' ? <i className="fas fa-sun" aria-hidden="true" /> : <i className="fas fa-moon" aria-hidden="true" />}
          </button>
          <button
            className={`hamburger${open ? ' active' : ''}`}
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="primary-nav-menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>
    </>
  )
}
