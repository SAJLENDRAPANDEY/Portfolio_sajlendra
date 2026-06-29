import { useEffect, useRef } from 'react'
import { skills } from '../data/data'
import './Skills.css'

function SkillBar({ name, level }) {
  const barRef = useRef(null)

  useEffect(() => {
    const el = barRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.width = `${level}%`
          obs.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [level])

  return (
    <div className="skill-bar-item">
      <div className="skill-bar-meta">
        <span className="skill-bar-name">{name}</span>
        <span className="skill-bar-pct" aria-hidden="true">{level}%</span>
      </div>
      <div
        className="skill-bar-track"
        role="progressbar"
        aria-label={name}
        aria-valuenow={level}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="skill-bar-fill" ref={barRef} style={{ width: 0 }} />
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <div className="fade-in">
          <p className="section-label">02 — Skills</p>
          <h2 className="section-title">Tools &amp; Technologies</h2>
          <div className="divider" />
        </div>
        <div className="skills-grid fade-in">
          {skills.map((cat) => (
            <div className="skill-category" key={cat.category}>
              <div className="skill-cat-title">{cat.category}</div>
              <div className="skill-bars">
                {cat.items.map((item) => (
                  <SkillBar key={item.name} name={item.name} level={item.level} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
