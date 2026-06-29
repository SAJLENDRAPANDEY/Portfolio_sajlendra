import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { pageVariants } from '../animations/pageTransition'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import './NotFound.css'

export default function NotFound() {
  useDocumentMeta({ title: 'Page Not Found', description: 'The page you are looking for does not exist.', path: '/404' })

  useEffect(() => {
    let robots = document.head.querySelector('meta[name="robots"]')
    if (!robots) {
      robots = document.createElement('meta')
      robots.setAttribute('name', 'robots')
      document.head.appendChild(robots)
    }
    robots.setAttribute('content', 'noindex')
    return () => robots.setAttribute('content', 'index, follow')
  }, [])

  return (
    <motion.div
      className="notfound"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="nf-code">404</div>
      <h1 className="nf-title">Page Not Found</h1>
      <p className="nf-desc">This route doesn't exist. Maybe you mistyped it, or the page was moved.</p>
      <Link to="/" className="btn-primary">
        <i className="fas fa-arrow-left" aria-hidden="true" /> Back to Home
      </Link>
    </motion.div>
  )
}
