import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { experiences, timeline } from '../data/data'
import { pageVariants, fadeUp, staggerContainer } from '../animations/pageTransition'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import './ExperiencePage.css'

export default function ExperiencePage() {
  useDocumentMeta({
    title: 'Experience & Journey',
    description: 'Work experience, internships, and career timeline of Sajlendra Pandey in data analytics and machine learning engineering.',
    path: '/experience',
  })

  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <motion.div className="exp-page" variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <div className="container">
        <p className="section-label">Career</p>
        <h1 className="section-title">Experience &amp; Journey</h1>
        <div className="divider" />

        {/* EXPERIENCE CARDS */}
        <h2 className="exp-sub-heading">Work Experience</h2>
        <motion.div className="exp-cards-grid" variants={staggerContainer} initial="initial" animate="animate">
          {experiences.map((exp, i) => (
            <motion.div className="exp-card" key={i} variants={fadeUp}>
              <div className="exp-card-top">
                <div className="exp-icon"><i className={`fas ${exp.icon}`}  aria-hidden="true" /></div>
                <div>
                  <div className="exp-role">{exp.role}</div>
                  <div className="exp-company"><i className="fas fa-building"  aria-hidden="true" /> {exp.company}</div>
                </div>
                <span className={`exp-type-badge exp-type-${exp.type.replace(/\s/g,'').toLowerCase()}`}>{exp.type}</span>
              </div>
              <div className="exp-period"><i className="fas fa-calendar"  aria-hidden="true" /> {exp.period}</div>
              <p className="exp-desc">{exp.desc}</p>
              <div className="exp-tags">
                {exp.tags.map((t) => <span className="exp-tag" key={t}>{t}</span>)}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* TIMELINE */}
        <h2 className="exp-sub-heading" style={{ marginTop: '64px' }}>Journey Timeline</h2>
        <motion.div className="exp-timeline" variants={staggerContainer} initial="initial" animate="animate">
          {timeline.map((item, i) => (
            <motion.div className={`tl-item ${i % 2 === 0 ? 'left' : 'right'}`} key={i} variants={fadeUp}>
              <div className="tl-content">
                <div className="tl-year" style={{ color: item.color }}>{item.year}</div>
                <div className="tl-icon-wrap" style={{ background: item.color }}>
                  <i className={`fas ${item.icon}`}  aria-hidden="true" />
                </div>
                <div className="tl-body">
                  <div className="tl-title">{item.title}</div>
                  <p className="tl-desc">{item.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
          <div className="tl-line" />
        </motion.div>

        {/* OPEN TO WORK */}
        <motion.div
          className="open-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="open-dot" />
          <div>
            <div className="open-title">Open to New Opportunities</div>
            <div className="open-sub">Actively seeking Data Analyst / ML Engineer / SDE internships — 2026</div>
          </div>
          <a href="/#contact" className="btn-primary">
            <i className="fas fa-paper-plane"  aria-hidden="true" /> Contact Me
          </a>
        </motion.div>
      </div>
    </motion.div>
  )
}
