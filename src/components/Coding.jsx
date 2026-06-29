import { useState, useEffect } from 'react'
import { personalInfo, gfgStats, gfgDifficultyStats } from '../data/data'
import { fetchLeetcodeStats } from '../services/leetcodeService'
import { fetchGfgStats }      from '../services/gfgService'
import './Coding.css'

// Skeleton card shown while data loads
function StatSkeleton() {
  return (
    <div className="stat-row" role="status" aria-label="Loading stats">
      {[0, 1, 2].map((i) => (
        <div className="stat-box stat-box--skel" key={i}>
          <div className="skel-bar skel-num" />
          <div className="skel-bar skel-label" />
        </div>
      ))}
      <span className="sr-only">Loading…</span>
    </div>
  )
}

// Single stat box
function StatBox({ num, label }) {
  return (
    <div className="stat-box">
      <div className="stat-box-num">{num ?? '—'}</div>
      <div className="stat-box-label">{label}</div>
    </div>
  )
}

// Format large numbers with comma
function fmt(n) {
  if (n == null) return '—'
  return Number(n).toLocaleString('en-IN')
}

export default function Coding() {
  const [lc,  setLc]  = useState(null)
  const [gfg, setGfg] = useState(null)
  const [lcLoading,  setLcLoading]  = useState(true)
  const [gfgLoading, setGfgLoading] = useState(true)

  useEffect(() => {
    fetchLeetcodeStats().then((d) => { setLc(d);  setLcLoading(false)  })
    fetchGfgStats().then((d)      => { setGfg(d); setGfgLoading(false) })
  }, [])

  return (
    <section id="coding" className="coding-section">
      <div className="container">
        <div className="fade-in">
          <p className="section-label">05 — Coding Profiles</p>
          <h2 className="section-title">Competitive Programming</h2>
          <div className="divider" />
        </div>

        <div className="coding-grid fade-in">

          {/* ── LEETCODE ── */}
          <div className="coding-platform">
            <div className="platform-head">
              <div className="platform-name">
                <div className="platform-logo lc-logo">LC</div>
                LeetCode
              </div>
              <a href={personalInfo.leetcode} target="_blank" rel="noreferrer" className="platform-link">
                View Profile →
              </a>
            </div>

            {lcLoading ? <StatSkeleton /> : lc ? (
              <div className="stat-row">
                <StatBox num={fmt(lc.totalSolved)}  label="Problems Solved" />
                <StatBox num={lc.ranking ? `#${fmt(lc.ranking)}` : '—'} label="Global Rank" />
                <StatBox num={fmt(lc.easySolved)}   label="Easy" />
                <StatBox num={fmt(lc.mediumSolved)} label="Medium" />
                <StatBox num={fmt(lc.hardSolved)}   label="Hard" />
              </div>
            ) : (
              <div className="coding-error">
                <i className="fas fa-exclamation-circle" aria-hidden="true" />
                {' '}Stats unavailable — <a href={personalInfo.leetcode} target="_blank" rel="noreferrer">view profile</a>
              </div>
            )}

            {/* LeetCode stats card widget */}
            <div className="lc-card-wrap">
              <img
                src={`https://leetcard.jacoblin.cool/sajlendrapandey2024?theme=dark&font=Nunito&ext=activity`}
                alt="LeetCode stats card for Sajlendra Pandey"
                loading="lazy"
                className="lc-stats-card"
                onError={(e) => { e.target.style.display = 'none' }}
              />
              {/* TODO: Replace 'SAJLENDRAPANDEY' in the URL above with your actual LeetCode username */}
            </div>
          </div>

          {/* ── GEEKSFORGEEKS ── */}
          <div className="coding-platform">
            <div className="platform-head">
              <div className="platform-name">
                <div className="platform-logo gfg-logo">GFG</div>
                GeeksForGeeks
              </div>
              <a href={personalInfo.gfg} target="_blank" rel="noreferrer" className="platform-link">
                View Profile →
              </a>
            </div>

            {gfgLoading ? <StatSkeleton /> : gfg ? (
              <>
                <div className="stat-row">
                  <StatBox num={fmt(gfg.totalProblemsSolved)} label="Problems Solved" />
                  <StatBox num={gfg.codingScore ? fmt(gfg.codingScore) : '—'} label="Coding Score" />
                  <StatBox num={gfg.instituteRank ? `#${gfg.instituteRank}` : '—'} label="Institute Rank" />
                </div>
                <div className="stat-row">
                  <StatBox num={fmt(gfg.basic)}  label="Basic" />
                  <StatBox num={fmt(gfg.easy)}   label="Easy" />
                  <StatBox num={fmt(gfg.medium)} label="Medium" />
                  <StatBox num={fmt(gfg.hard)}   label="Hard" />
                </div>
              </>
            ) : (
              <>
                {/* All live GFG proxies failed (this happens often — GFG has no
                    official API, so every option here is an unofficial,
                    community-run scraper with no uptime guarantee). Rather than
                    show an empty "unavailable" box, fall back to the last-known
                    real numbers stored in data.js → gfgStats / gfgDifficultyStats.
                    Update those arrays by hand whenever you solve more problems,
                    so they stay reasonably current even if the live fetch never
                    recovers. */}
                <div className="stat-row">
                  {gfgStats.map((s) => (
                    <StatBox key={s.label} num={s.num} label={s.label} />
                  ))}
                </div>
                <div className="stat-row">
                  {gfgDifficultyStats.map((s) => (
                    <StatBox key={s.label} num={s.num} label={s.label} />
                  ))}
                </div>
                <p className="coding-stale-note">
                  <i className="fas fa-clock" aria-hidden="true" /> Live stats unavailable right now — showing last known numbers.{' '}
                  <a href={personalInfo.gfg} target="_blank" rel="noreferrer">View live profile →</a>
                </p>
              </>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
