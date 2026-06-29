import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { personalInfo, stats } from '../data/data'
import './Hero.css'

import profileImg from '../assets/profile.jpg'

const phrases = ['Data Analyst', 'ML Engineer', 'Full-Stack Developer', 'Open Source Contributor']

const BURST_ANGLES = Array.from({ length: 10 }, (_, i) => (360 / 10) * i)

function useTypewriter(phrases) {
  const [text, setText] = useState('')
  const [pIdx, setPIdx] = useState(0)
  const [cIdx, setCIdx] = useState(0)
  const [del, setDel] = useState(false)

  useEffect(() => {
    const cur = phrases[pIdx]
    let innerTimeout
    const t = setTimeout(() => {
      if (!del) {
        setText(cur.slice(0, cIdx + 1))
        if (cIdx + 1 === cur.length) innerTimeout = setTimeout(() => setDel(true), 1800)
        else setCIdx((c) => c + 1)
      } else {
        setText(cur.slice(0, cIdx - 1))
        if (cIdx - 1 === 0) {
          setDel(false)
          setPIdx((i) => (i + 1) % phrases.length)
          setCIdx(0)
        } else setCIdx((c) => c - 1)
      }
    }, del ? 55 : 95)
    return () => { clearTimeout(t); clearTimeout(innerTimeout) }
  }, [cIdx, del, pIdx, phrases])

  return text
}

export default function Hero() {
  const typed = useTypewriter(phrases)
  const [burst, setBurst] = useState(false)

  const triggerBurst = () => {
    setBurst(true)
    setTimeout(() => setBurst(false), 900)
  }

  return (
    <section id="hero" className="hero-section">
      <div className="container">
        <div className="hero-inner">

          {/* LEFT */}
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="hero-badge">
              <span className="dot" />
              Available for Internships &amp; Freelance
            </div>

            <h1 className="hero-name">
              <span className="hi">Hi, I'm</span>
              <span className="highlight">{personalInfo.name}</span>
            </h1>

            <div className="hero-typewriter" aria-hidden="true">
              <span style={{ color: 'var(--muted)', marginRight: '8px', fontFamily: 'var(--sans)', fontSize: '0.9rem' }}>{'>'}</span>
              {typed}<span className="cursor" />
            </div>
            <span className="sr-only">{phrases.join(', ')}</span>

            <p className="hero-desc">
              {personalInfo.degree} student at {personalInfo.college} — turning raw data into
              actionable insights with Python, ML, and BI tools. Currently building data
              pipelines, prediction models, and full-stack analytics platforms.
            </p>

            <div className="hero-btns">
              <a
                href={personalInfo.resumeLink}
                download="Sajlendra_Pandey_Resume.pdf"
                className="btn-primary"
              >
                <i className="fas fa-download" /> Download Resume
              </a>
              <a href="#contact" className="btn-outline">
                <i className="fas fa-paper-plane" /> Contact Me
              </a>
            </div>

            <div className="hero-socials">
              <a href={personalInfo.github} target="_blank" rel="noreferrer" className="social-link" title="GitHub" aria-label="Visit GitHub profile"><i className="fab fa-github" aria-hidden="true" /></a>
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="social-link" title="LinkedIn" aria-label="Visit LinkedIn profile"><i className="fab fa-linkedin-in" aria-hidden="true" /></a>
              <a href={personalInfo.leetcode} target="_blank" rel="noreferrer" className="social-link" title="LeetCode" aria-label="Visit LeetCode profile"><i className="fas fa-code" aria-hidden="true" /></a>
              <a href={personalInfo.gfg} target="_blank" rel="noreferrer" className="social-link" title="GeeksForGeeks" aria-label="Visit GeeksforGeeks profile"><i className="fas fa-laptop-code" aria-hidden="true" /></a>
              <a href={personalInfo.blog} target="_blank" rel="noreferrer" className="social-link" title="Blog" aria-label="Visit Hashnode blog"><i className="fas fa-pen-nib" aria-hidden="true" /></a>
            </div>

            <div className="hero-stats">
              {stats.map((s) => (
                <div className="stat" key={s.label}>
                  <div className="stat-num">{s.num}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            className="hero-image-wrap"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="hero-img-ring">
              <div className="hero-float-badge">
                <i className="fas fa-brain" /> AI / ML
              </div>

              <AnimatePresence>
                {burst && (
                  <>
                    <motion.div
                      className="burst-glow-ring"
                      initial={{ scale: 0.6, opacity: 0.85 }}
                      animate={{ scale: 1.9, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                    <motion.div
                      className="burst-glow-ring burst-glow-ring--delay"
                      initial={{ scale: 0.6, opacity: 0.6 }}
                      animate={{ scale: 2.3, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.9, ease: 'easeOut', delay: 0.1 }}
                    />
                    {BURST_ANGLES.map((angle, i) => (
                      <motion.span
                        key={i}
                        className="burst-particle"
                        initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                        animate={{
                          x: Math.cos((angle * Math.PI) / 180) * 118,
                          y: Math.sin((angle * Math.PI) / 180) * 118,
                          opacity: 0,
                          scale: 0.3,
                        }}
                        transition={{ duration: 0.72, ease: 'easeOut' }}
                      />
                    ))}
                  </>
                )}
              </AnimatePresence>

              <motion.div
                className="hero-img-inner"
                animate={{ y: [0, -12, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
                whileTap={{ scale: 0.96 }}
                onClick={triggerBurst}
                role="button"
                tabIndex={0}
                aria-label="Sajlendra Pandey profile photo — click for a surprise"
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') triggerBurst() }}
              >
                <img src={profileImg} alt="Sajlendra Pandey" className="profile-photo" />
              </motion.div>
            </div>

            <motion.div
              className="exp-badge"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 0.4 }}
            >
              <span className="exp-badge-num">2+</span>
              <span className="exp-badge-label">Years Coding</span>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
