import { certifications } from '../data/data'
import './Certifications.css'

export default function Certifications() {
  return (
    <section id="certifications" className="certs-section">
      <div className="container">
        <div className="fade-in">
          <p className="section-label">06 — Certifications</p>
          <h2 className="section-title">Credentials &amp; Learning</h2>
          <div className="divider" />
        </div>
        <div className="certs-grid fade-in">
          {certifications.map((c) => (
            <div className="cert-card" key={c.title}>
              <div className="cert-icon"><i className={`fas ${c.icon}`}  aria-hidden="true" /></div>
              <div className="cert-title">{c.title}</div>
              <div className="cert-issuer">{c.issuer}</div>
              <div className="cert-badge">{c.badge}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
