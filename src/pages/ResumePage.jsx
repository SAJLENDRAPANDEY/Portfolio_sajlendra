import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { personalInfo } from '../data/data'
import { pageVariants } from '../animations/pageTransition'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import './ResumePage.css'

export default function ResumePage() {
  const handlePrint = () => window.print()

  useDocumentMeta({
    title: 'Resume',
    description: `Resume of ${personalInfo.name} — ${personalInfo.degree}, ${personalInfo.college}. Download as PDF or view inline.`,
    path: '/resume',
  })

  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <motion.div
      className="resume-page"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="container">
        {/* Top bar */}
        <div className="resume-topbar">
          <div>
            <p className="section-label">Resume</p>
            <h1 className="section-title" style={{ marginBottom: 0 }}>Sajlendra Pandey</h1>
            <p className="resume-subtitle">{personalInfo.degree} · {personalInfo.college}</p>
          </div>
          <div className="resume-actions">
            <a
              href={personalInfo.resumeLink}
              download="Sajlendra_Pandey_Resume.pdf"
              className="btn-primary"
            >
              <i className="fas fa-download" aria-hidden="true" /> Download PDF
            </a>
            <button className="btn-outline" onClick={handlePrint}>
              <i className="fas fa-print" aria-hidden="true" /> Print
            </button>
            <a
              href={`mailto:?subject=Resume — Sajlendra Pandey&body=Hi,%0A%0ASharing the resume of Sajlendra Pandey:%0A${personalInfo.email}`}
              className="btn-outline"
            >
              <i className="fas fa-share-nodes" aria-hidden="true" /> Share
            </a>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="resume-viewer-wrap">
          <div className="resume-viewer-notice">
            <i className="fas fa-info-circle" aria-hidden="true" />
            Sajlendra Pandey Resume 
          </div>
          <iframe
            src={personalInfo.resumeLink}
            className="resume-iframe"
            title="Sajlendra Pandey Resume"
          />
        </div>
      </div>
    </motion.div>
  )
}
