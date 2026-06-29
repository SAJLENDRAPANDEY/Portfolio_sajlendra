import { useParams, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { projects } from '../data/data'
import { pageVariants, fadeUp } from '../animations/pageTransition'
import ProjectGallery from '../components/ProjectGallery'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import './ProjectDetail.css'

// ─── Sub-components ───────────────────────────────────────────────────────

function SectionWrap({ icon, title, delay = 0, children }) {
  return (
    <motion.div
      className="pd-section"
      variants={fadeUp}
      initial="initial"
      animate="animate"
      transition={{ delay }}
    >
      <h2 className="pd-section-title">
        <i className={`fas ${icon}`} aria-hidden="true" /> {title}
      </h2>
      {children}
    </motion.div>
  )
}

function ArchitectureTable({ layers }) {
  if (!layers || layers.length === 0) return null
  return (
    <div className="pd-arch-table">
      {layers.map((row) => (
        <div className="pd-arch-row" key={row.layer}>
          <div className="pd-arch-layer">{row.layer}</div>
          <div className="pd-arch-tech">
            <span className="pd-chip">{row.tech}</span>
          </div>
          <div className="pd-arch-role">{row.role}</div>
        </div>
      ))}
    </div>
  )
}

function WorkflowSteps({ steps }) {
  if (!steps || steps.length === 0) return null
  return (
    <ol className="pd-workflow">
      {steps.map((step, i) => (
        <li className="pd-workflow-step" key={i}>
          <span className="pd-workflow-num">{i + 1}</span>
          <span className="pd-workflow-text">{step}</span>
        </li>
      ))}
    </ol>
  )
}

function ApiFlowTable({ endpoints }) {
  if (!endpoints || endpoints.length === 0) return null
  return (
    <div className="pd-api-table">
      <div className="pd-api-header">
        <span>Method</span><span>Endpoint</span><span>Description</span>
      </div>
      {endpoints.map((ep, i) => (
        <div className="pd-api-row" key={i}>
          <span className={`pd-api-method pd-api-${ep.method.toLowerCase()}`}>{ep.method}</span>
          <code className="pd-api-endpoint">{ep.endpoint}</code>
          <span className="pd-api-desc">{ep.desc}</span>
        </div>
      ))}
    </div>
  )
}

function DatabaseDesign({ db }) {
  if (!db) return null
  return (
    <div>
      <div className="pd-db-tables">
        {db.tables.map((t) => (
          <div className="pd-db-card" key={t.name}>
            <div className="pd-db-name">
              <i className="fas fa-table" aria-hidden="true" /> {t.name}
            </div>
            <div className="pd-db-cols">{t.columns}</div>
          </div>
        ))}
      </div>
      {db.notes && <p className="pd-db-notes">{db.notes}</p>}
    </div>
  )
}

function FolderStructure({ tree }) {
  if (!tree) return null
  return (
    <pre className="pd-folder-tree"><code>{tree}</code></pre>
  )
}

function BulletList({ items, icon = "fa-check-circle" }) {
  if (!items || items.length === 0) return null
  return (
    <ul className="pd-bullet-list">
      {items.map((item, i) => (
        <li className="pd-bullet-item" key={i}>
          <i className={`fas ${icon}`} aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────

export default function ProjectDetail() {
  const { id } = useParams()
  const project = projects.find((p) => p.id === id)

  useEffect(() => { window.scrollTo(0, 0) }, [id])

  useDocumentMeta({
    title: project ? `${project.title} — Case Study` : 'Project Not Found',
    description: project
      ? project.shortDesc
      : 'The project you are looking for could not be found.',
    path: `/projects/${id}`,
  })

  if (!project) {
    return (
      <div className="pd-not-found">
        <h2>Project not found</h2>
        <Link to="/projects" className="btn-primary">← Back to Projects</Link>
      </div>
    )
  }

  const { details } = project

  return (
    <motion.div
      className="pd-page"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="container">
        {/* BACK */}
        <Link to="/projects" className="pd-back">
          <i className="fas fa-arrow-left" aria-hidden="true" /> Back to Projects
        </Link>

        {/* HEADER */}
        <motion.div className="pd-header" variants={fadeUp} initial="initial" animate="animate">
          <div className="pd-icon-wrap">
            <i className={`fas ${project.icon}`} aria-hidden="true" />
          </div>
          <div className="pd-header-text">
            <span className="pd-category">{project.category}</span>
            <h1 className="pd-title">{project.title}</h1>
            <p className="pd-short">{project.shortDesc}</p>
            <div className="pd-tech-row">
              {project.tech.map((t) => (
                <span className="pd-chip" key={t}>{t}</span>
              ))}
            </div>
          </div>
          <div className="pd-cta-btns">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="btn-outline pd-btn"
              >
                <i className="fab fa-github" aria-hidden="true" /> GitHub
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="btn-primary pd-btn"
              >
                <i className="fas fa-external-link-alt" aria-hidden="true" /> Live Demo
              </a>
            )}
          </div>
        </motion.div>

        <div className="pd-body">

          {/* 1. BUSINESS PROBLEM */}
          {details.businessProblem && (
            <SectionWrap icon="fa-bullseye" title="Business Problem" delay={0.05}>
              <p className="pd-prose">{details.businessProblem}</p>
            </SectionWrap>
          )}

          {/* 2. SOLUTION */}
          {details.solution && (
            <SectionWrap icon="fa-lightbulb" title="Solution" delay={0.08}>
              <p className="pd-prose">{details.solution}</p>
            </SectionWrap>
          )}

          {/* 3. OVERVIEW */}
          <SectionWrap icon="fa-info-circle" title="Overview" delay={0.1}>
            <p className="pd-prose">{details.overview}</p>
          </SectionWrap>

          {/* 4. SCREENSHOTS */}
          {project.images && project.images.length > 0 && (
            <SectionWrap icon="fa-images" title="Screenshots" delay={0.12}>
              <p className="pd-gallery-note">
                <i className="fas fa-info-circle" aria-hidden="true" />
                {' '}Screenshots load from{' '}
                <code>public/projects/{project.id}/</code> — add your images there.
              </p>
              <ProjectGallery images={project.images} />
            </SectionWrap>
          )}

          {/* 5. SYSTEM ARCHITECTURE */}
          {details.architecture && details.architecture.length > 0 && (
            <SectionWrap icon="fa-sitemap" title="System Architecture" delay={0.15}>
              <ArchitectureTable layers={details.architecture} />
            </SectionWrap>
          )}

          {/* 6. WORKFLOW */}
          {details.workflow && details.workflow.length > 0 && (
            <SectionWrap icon="fa-route" title="Workflow" delay={0.18}>
              <WorkflowSteps steps={details.workflow} />
            </SectionWrap>
          )}

          {/* 7. API FLOW */}
          {details.apiFlow && details.apiFlow.length > 0 && (
            <SectionWrap icon="fa-plug" title="API Flow" delay={0.2}>
              <ApiFlowTable endpoints={details.apiFlow} />
            </SectionWrap>
          )}

          {/* 8. DATABASE DESIGN */}
          {details.database && (
            <SectionWrap icon="fa-database" title="Database Design" delay={0.22}>
              <DatabaseDesign db={details.database} />
            </SectionWrap>
          )}

          {/* 9. FOLDER STRUCTURE */}
          {details.folderStructure && (
            <SectionWrap icon="fa-folder-open" title="Folder Structure" delay={0.24}>
              <FolderStructure tree={details.folderStructure} />
            </SectionWrap>
          )}

          {/* 10. KEY FEATURES */}
          <SectionWrap icon="fa-star" title="Key Features" delay={0.26}>
            <ul className="pd-features">
              {details.features.map((f, i) => (
                <li key={i} className="pd-feature-item">
                  <span className="pd-feature-dot" />
                  {f}
                </li>
              ))}
            </ul>
          </SectionWrap>

          {/* 11. TECH STACK */}
          <SectionWrap icon="fa-layer-group" title="Tech Stack" delay={0.28}>
            <div className="pd-stack-grid">
              {Object.entries(details.techStack).map(([cat, tools]) => (
                <div className="pd-stack-card" key={cat}>
                  <div className="pd-stack-cat">{cat}</div>
                  <div className="pd-stack-tools">
                    {tools.map((t) => (
                      <span className="pd-chip" key={t}>{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </SectionWrap>

          {/* 12. CHALLENGES */}
          <SectionWrap icon="fa-fire" title="Challenges & How I Solved Them" delay={0.3}>
            <div className="pd-challenges">
              <i className="fas fa-quote-left pd-quote-icon" aria-hidden="true" />
              <p>{details.challenges}</p>
            </div>
          </SectionWrap>

          {/* 13. RESULTS */}
          {details.results && details.results.length > 0 && (
            <SectionWrap icon="fa-trophy" title="Results" delay={0.32}>
              <BulletList items={details.results} icon="fa-check-circle" />
            </SectionWrap>
          )}

          {/* 14. LESSONS LEARNED */}
          {details.lessonsLearned && details.lessonsLearned.length > 0 && (
            <SectionWrap icon="fa-graduation-cap" title="Lessons Learned" delay={0.34}>
              <BulletList items={details.lessonsLearned} icon="fa-book-open" />
            </SectionWrap>
          )}

          {/* 15. FUTURE IMPROVEMENTS */}
          {details.futurePlans && details.futurePlans.length > 0 && (
            <SectionWrap icon="fa-rocket" title="Future Improvements" delay={0.36}>
              <BulletList items={details.futurePlans} icon="fa-circle-dot" />
            </SectionWrap>
          )}

          {/* 16. BOTTOM LINKS */}
          <motion.div
            className="pd-bottom-links"
            variants={fadeUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.4 }}
          >
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="btn-outline"
              >
                <i className="fab fa-github" aria-hidden="true" /> View Source Code
              </a>
            )}
            {project.live ? (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                <i className="fas fa-rocket" aria-hidden="true" /> Open Live Demo
              </a>
            ) : (
              <span className="pd-demo-note">
                {/* TODO: Replace this span with a real <a> tag once the project is deployed */}
                <i className="fas fa-clock" aria-hidden="true" /> Live demo coming soon
              </span>
            )}
            <Link to="/projects" className="btn-outline">
              <i className="fas fa-th-large" aria-hidden="true" /> All Projects
            </Link>
          </motion.div>

        </div>
      </div>
    </motion.div>
  )
}
