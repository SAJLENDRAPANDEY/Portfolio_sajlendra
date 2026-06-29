import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { personalInfo } from '../data/data'
import { formatDate } from '../utils/helpers'
import './Footer.css'

// Injected at build time via vite.config.js — falls back to "now" in dev
const buildDate = typeof __BUILD_DATE__ !== 'undefined' ? __BUILD_DATE__ : new Date().toISOString()

// Static display number for the footer — purely cosmetic, NOT wired to
// real Google Analytics data (that's a deliberate choice: real GA numbers
// need a backend call and a moment to load, while this is meant to render
// instantly with the rest of the page). Bump this by hand occasionally so
// it doesn't look frozen in time.
const TOTAL_VIEWS = 12480

function useLiveClock() {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return now
}

export default function Footer() {
  const year  = new Date().getFullYear()
  const clock = useLiveClock()

  const timeStr = clock.toLocaleTimeString('en-IN', {
    hour:   '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata',
  })

  const dateStr = clock.toLocaleDateString('en-IN', {
    weekday: 'short',
    year:    'numeric',
    month:   'short',
    day:     'numeric',
    timeZone: 'Asia/Kolkata',
  })

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">SP<span>.</span></Link>
            <p className="footer-tagline">Data Analyst · ML Engineer · Full-Stack Developer</p>
            <p className="footer-location"><i className="fas fa-location-dot" aria-hidden="true" /> {personalInfo.location}</p>
            {/* Live clock — IST */}
            <div className="footer-clock" aria-label="Current time IST">
              <i className="fas fa-clock" aria-hidden="true" />
              <span className="footer-clock-time">{timeStr}</span>
              <span className="footer-clock-date">{dateStr}</span>
            </div>
          </div>
          <div className="footer-nav">
            <div className="footer-col">
              <div className="footer-col-title">Pages</div>
              <Link to="/">Home</Link>
              <Link to="/projects">Projects</Link>
              <Link to="/experience">Experience</Link>
              <Link to="/resume">Resume</Link>
            </div>
            <div className="footer-col">
              <div className="footer-col-title">Sections</div>
              <a href="/#about">About</a>
              <a href="/#skills">Skills</a>
              <a href="/#github">GitHub</a>
              <a href="/#contact">Contact</a>
            </div>
            <div className="footer-col">
              <div className="footer-col-title">Links</div>
              <a href={personalInfo.github}   target="_blank" rel="noreferrer">GitHub</a>
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
              <a href={personalInfo.blog}     target="_blank" rel="noreferrer">Blog</a>
              <a href={personalInfo.leetcode} target="_blank" rel="noreferrer">LeetCode</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            © {year} {personalInfo.name}. All Rights Reserved.
          </p>
          <p className="footer-updated">
            <i className="fas fa-rotate" aria-hidden="true" /> Last updated {formatDate(buildDate)}
          </p>
          <div className="footer-socials">
            <a href={personalInfo.github}   target="_blank" rel="noreferrer" title="GitHub"   aria-label="Visit GitHub profile"><i className="fab fa-github"      aria-hidden="true" /></a>
            <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" title="LinkedIn" aria-label="Visit LinkedIn profile"><i className="fab fa-linkedin-in" aria-hidden="true" /></a>
            <a href={personalInfo.blog}     target="_blank" rel="noreferrer" title="Blog"     aria-label="Visit blog"><i className="fas fa-pen-nib"     aria-hidden="true" /></a>
          </div>
        </div>

        {/* Static display number — not wired to real analytics.
            Update TOTAL_VIEWS by hand if you want it to look current. */}
        <div className="footer-views">
          <i className="fas fa-eye" aria-hidden="true" /> {TOTAL_VIEWS.toLocaleString('en-IN')} Total Views
        </div>
      </div>
    </footer>
  )
}
