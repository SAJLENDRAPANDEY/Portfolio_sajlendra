import { useEffect, useState } from 'react'
import { personalInfo } from '../data/data'
import { fetchGithubStats } from '../services/github'
import { useTheme } from '../context/ThemeContext'
import './Github.css'

const u = personalInfo.githubUsername

// github-readme-stats theme + colors per site theme, so the embedded
// stat cards actually match the page instead of staying dark always.
const ghTheme = {
  dark: { theme: 'github_dark', bg: '111827', border: '1e2d45', title: '38bdf8', icon: '818cf8', text: 'e2e8f0' },
  light: { theme: 'default', bg: 'ffffff', border: 'e2e8f0', title: '0284c7', icon: '6366f1', text: '1e293b' },
}

export default function Github() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const { theme } = useTheme()
  const c = ghTheme[theme] || ghTheme.dark

  useEffect(() => {
    let cancelled = false
    fetchGithubStats()
      .then((data) => {
        if (cancelled) return
        setStats(data)
        setLoading(false)
      })
      .catch(() => {
        if (cancelled) return
        setError(true)
        setLoading(false)
      })
    return () => { cancelled = true }
  }, [])

  return (
    <section id="github" className="github-section">
      <div className="container">
        <div className="fade-in">
          <p className="section-label">04 — Open Source</p>
          <h2 className="section-title">GitHub Activity</h2>
          <div className="divider" />
        </div>

        {/* Live API stats bar */}
        <div className="gh-live-stats fade-in">
          {loading ? (
            <div className="gh-skel-row" role="status" aria-label="Loading GitHub stats">
              {[0, 1, 2, 3].map((i) => (
                <div className="gh-skel-item" key={i}>
                  <div className="gh-skel-bar gh-skel-num" />
                  <div className="gh-skel-bar" />
                </div>
              ))}
              <span className="sr-only">Loading GitHub stats…</span>
            </div>
          ) : stats ? (
            <>
              <div className="gh-live-item">
                <i className="fas fa-code-branch" />
                <span className="gh-live-num">{stats.publicRepos}</span>
                <span className="gh-live-label">Repositories</span>
              </div>
              <div className="gh-live-item">
                <i className="fas fa-users" />
                <span className="gh-live-num">{stats.followers}</span>
                <span className="gh-live-label">Followers</span>
              </div>
              <div className="gh-live-item">
                <i className="fas fa-star" />
                <span className="gh-live-num">{stats.totalStars}</span>
                <span className="gh-live-label">Total Stars</span>
              </div>
              {stats.topLangs.slice(0, 3).map((l) => (
                <div className="gh-live-item" key={l.lang}>
                  <i className="fas fa-code" />
                  <span className="gh-live-num">{l.lang}</span>
                  <span className="gh-live-label">{l.count} repos</span>
                </div>
              ))}
            </>
          ) : (
            <div className="gh-loading" role="status">
              <i className="fas fa-exclamation-circle" aria-hidden="true" />
              {error ? 'GitHub stats unavailable right now — please retry later.' : 'GitHub stats unavailable (rate limit)'}
            </div>
          )}
        </div>

        {/* Stat cards */}
        <div className="github-stats fade-in">
          <div className="gh-card">
            <img
              src={`https://github-readme-stats.vercel.app/api?username=${u}&show_icons=true&theme=${c.theme}&bg_color=${c.bg}&border_color=${c.border}&title_color=${c.title}&icon_color=${c.icon}&text_color=${c.text}`}
              alt={`GitHub stats summary for ${u}`}
              loading="lazy"
              width="495"
              height="195"
            />
          </div>
          <div className="gh-card">
            <img
              src={`https://github-readme-streak-stats.herokuapp.com/?user=${u}&theme=${theme === 'light' ? 'default' : 'dark'}&background=${c.bg}&border=${c.border}&stroke=${c.title}&ring=${c.title}&fire=${c.icon}&currStreakLabel=${c.title}`}
              alt={`GitHub contribution streak for ${u}`}
              loading="lazy"
              width="495"
              height="195"
            />
          </div>
          <div className="gh-card">
            <img
              src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${u}&layout=compact&theme=${c.theme}&bg_color=${c.bg}&border_color=${c.border}&title_color=${c.title}&text_color=${c.text}`}
              alt={`Most used programming languages for ${u}`}
              loading="lazy"
              width="300"
              height="195"
            />
          </div>
        </div>

        {/* Contribution graph */}
        <div className="gh-contrib fade-in">
          <div className="gh-contrib-label"><i className="fas fa-calendar-check" /> Contribution Graph</div>
          <img
            src={`https://ghchart.rshah.org/${c.title}/${u}`}
            alt={`Yearly GitHub contribution graph for ${u}`}
            loading="lazy"
            width="722"
            height="112"
          />
        </div>

        <div className="gh-cta fade-in">
          <a href={personalInfo.github} target="_blank" rel="noreferrer" className="btn-outline">
            <i className="fab fa-github" /> View Full GitHub Profile
          </a>
        </div>
      </div>
    </section>
  )
}
