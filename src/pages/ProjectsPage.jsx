import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '../data/data'
import { pageVariants, fadeUp, staggerContainer } from '../animations/pageTransition'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import './ProjectsPage.css'

const FILTERS = ['All', 'ML', 'Analytics', 'AI', 'Web']

export default function ProjectsPage() {
  const [filter, setFilter]   = useState('All')
  const [search, setSearch]   = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')

  useDocumentMeta({
    title: 'Projects',
    description: 'Machine learning, data analytics, and full-stack engineering projects by Sajlendra Pandey — with architecture, tech stack, and live demos.',
    path: '/projects',
  })

  useEffect(() => { window.scrollTo(0, 0) }, [])

  // Debounce search so the grid only re-animates once typing pauses,
  // instead of re-mounting (and re-running enter/exit motion) on every
  // keystroke — that was causing visible flicker while typing.
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 200)
    return () => clearTimeout(t)
  }, [search])

  const filtered = useMemo(() => projects.filter((p) => {
    const matchCat    = filter === 'All' || p.category === filter
    const matchSearch = !debouncedSearch ||
                        p.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                        p.tech.some((t) => t.toLowerCase().includes(debouncedSearch.toLowerCase()))
    return matchCat && matchSearch
  }), [filter, debouncedSearch])

  return (
    <motion.div className="projects-page" variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <div className="container">
        <p className="section-label">Portfolio</p>
        <h1 className="section-title">All Projects</h1>
        <div className="divider" />

        {/* Search + Filter row */}
        <div className="pp-controls">
          <div className="pp-search-wrap">
            <i className="fas fa-search pp-search-icon" aria-hidden="true" />
            <label htmlFor="pp-search-input" className="sr-only">Search projects or technologies</label>
            <input
              id="pp-search-input"
              className="pp-search"
              placeholder="Search projects or tech..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="filter-tabs">
            {FILTERS.map((tag) => (
              <button
                key={tag}
                className={`filter-tab${filter === tag ? ' active' : ''}`}
                onClick={() => setFilter(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            className="ppage-grid"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            key={filter + debouncedSearch}
          >
            {filtered.length === 0 && (
              <motion.p variants={fadeUp} className="ppage-empty">
                No projects match "{debouncedSearch || filter}". Try a different search.
              </motion.p>
            )}
            {filtered.map((p) => (
              <motion.div className="ppage-card" key={p.id} variants={fadeUp}>
                {p.featured && <span className="ppage-featured-badge">Featured</span>}
                <div className="ppage-icon"><i className={`fas ${p.icon}`} /></div>
                <span className="ppage-cat-tag">{p.category}</span>
                <h3 className="ppage-title">{p.title}</h3>
                <p className="ppage-desc">{p.shortDesc}</p>
                <div className="ppage-tech">
                  {p.tech.slice(0, 4).map((t) => <span className="tech-chip" key={t}>{t}</span>)}
                  {p.tech.length > 4 && <span className="tech-chip">+{p.tech.length - 4}</span>}
                </div>
                <div className="ppage-links">
                  <Link to={`/projects/${p.id}`} className="btn-primary ppage-btn">
                    <i className="fas fa-eye" /> View Details
                  </Link>
                  {p.github && p.github !== '#' && (
                    <a href={p.github} target="_blank" rel="noreferrer" className="btn-outline ppage-btn" aria-label={`View ${p.title} source on GitHub`}>
                      <i className="fab fa-github" aria-hidden="true" />
                    </a>
                  )}
                  {p.live && p.live !== '#' && (
                    <a href={p.live} target="_blank" rel="noreferrer" className="btn-outline ppage-btn" aria-label={`Open live demo of ${p.title}`}>
                      <i className="fas fa-external-link-alt" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
