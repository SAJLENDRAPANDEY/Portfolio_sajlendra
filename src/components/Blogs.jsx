import { blogs, personalInfo } from '../data/data'
import './Blogs.css'

export default function Blogs() {
  return (
    <section id="blogs" className="blogs-section">
      <div className="container">
        <div className="fade-in">
          <p className="section-label">07 — Writing</p>
          <h2 className="section-title">Technical Blogs</h2>
          <div className="divider" />
        </div>
        <div className="blogs-grid fade-in">
          {blogs.map((b) => (
            <a href={b.link} target="_blank" rel="noreferrer" className="blog-card" key={b.title}>
              <div className="blog-tag">{b.tag}</div>
              <div className="blog-title">{b.title}</div>
              <div className="blog-desc">{b.desc}</div>
              <div className="blog-meta">
                <i className="fas fa-external-link-alt"  aria-hidden="true" /> Read on Hashnode
              </div>
            </a>
          ))}
        </div>
        <div className="blogs-cta fade-in">
          <a href={personalInfo.blog} target="_blank" rel="noreferrer" className="btn-outline">
            <i className="fas fa-pen-nib"  aria-hidden="true" /> Read All Blogs on Hashnode
          </a>
        </div>
      </div>
    </section>
  )
}
