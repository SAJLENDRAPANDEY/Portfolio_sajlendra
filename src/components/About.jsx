import { personalInfo, experiences } from '../data/data'
import './About.css'

export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="fade-in">
          <p className="section-label">01 — About Me</p>
          <h2 className="section-title">The Story Behind the Data</h2>
          <div className="divider" />
        </div>

        <div className="about-grid fade-in">
          {/* LEFT */}
          <div className="about-text">
            {personalInfo.bio.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
            <div className="about-facts">
              <div className="fact-item"><i className="fas fa-map-marker-alt"  aria-hidden="true" /> {personalInfo.location}</div>
              <div className="fact-item"><i className="fas fa-graduation-cap"  aria-hidden="true" /> {personalInfo.degree} · {personalInfo.year}</div>
              <div className="fact-item"><i className="fas fa-code-branch"  aria-hidden="true" /> GSSoC 2026 Ambassador</div>
              <div className="fact-item"><i className="fas fa-pen-nib"  aria-hidden="true" /> Technical Blogger</div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="about-right">
            {experiences.map((exp, i) => (
              <div className="exp-card" key={i}>
                <div className="exp-head">
                  <div className="exp-role">{exp.role}</div>
                  <div className="exp-date">{exp.date}</div>
                </div>
                <div className="exp-company">{exp.company}</div>
                <div className="exp-desc">{exp.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
