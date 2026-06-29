import { Link } from 'react-router-dom'
import { projects } from '../data/data'
import './Projects.css'

export default function Projects() {
  const featured = projects.filter((p) => p.featured)

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <div className="fade-in">
          <p className="section-label">03 — Work</p>
          <h2 className="section-title">Featured Projects</h2>
          <div className="divider" />
        </div>

        <div className="projects-grid fade-in">
          {featured.map((p) => (
            <div className="project-card" key={p.id}>
              <div className="project-icon"><i className={`fas ${p.icon}`} aria-hidden="true" /></div>
              <span className="project-cat">{p.category}</span>
              <h3 className="project-title">{p.title}</h3>
              <p className="project-desc">{p.shortDesc}</p>
              <div className="project-tech">
                {p.tech.slice(0, 3).map((t) => <span className="tech-tag" key={t}>{t}</span>)}
                {p.tech.length > 3 && <span className="tech-tag">+{p.tech.length - 3}</span>}
              </div>
              <div className="project-links">
                <Link to={`/projects/${p.id}`} className="btn-primary project-btn">
                  <i className="fas fa-eye" aria-hidden="true" /> View Details
                </Link>
                {p.github && p.github !== '#' && (
                  <a href={p.github} target="_blank" rel="noreferrer" className="btn-outline project-btn" aria-label={`View ${p.title} source on GitHub`}>
                    <i className="fab fa-github" aria-hidden="true" />
                  </a>
                )}
                {p.live && p.live !== '#' && (
                  <a href={p.live} target="_blank" rel="noreferrer" className="btn-outline project-btn" aria-label={`Open live demo of ${p.title}`}>
                    <i className="fas fa-external-link-alt" aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="projects-more fade-in">
          <Link to="/projects" className="btn-outline">
            <i className="fas fa-th-large" aria-hidden="true" /> View All {projects.length} Projects
          </Link>
        </div>
      </div>
    </section>
  )
}
