import { useState } from 'react'
import { personalInfo } from '../data/data'
import './Contact.css'

// ─── Web3Forms — free, no backend, messages go to your Gmail ───────────────
const ACCESS_KEY = '401134c4-551e-47aa-9608-613809ad5f2c'

export default function Contact() {
  const [form, setForm]   = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState(null) // null | 'sending' | 'success' | 'error' | 'empty'
  const [copied, setCopied] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const sendEmail = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      setStatus('empty')
      setTimeout(() => setStatus(null), 4000)
      return
    }

    setStatus('sending')

    try {
      // ── Web3Forms API (messages sent directly to your Gmail) ──
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          name:       form.name,
          email:      form.email,
          subject:    form.subject || `Portfolio Contact from ${form.name}`,
          message:    form.message,
          from_name:  'Sajlendra Portfolio',
        }),
      })

      const data = await res.json()

      if (data.success) {
        setStatus('success')
        setForm({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => setStatus(null), 6000)
      } else {
        throw new Error(data.message || 'Submission failed')
      }
    } catch (err) {
      console.error('Contact form error:', err)
      // Fallback to mailto so the recruiter's message is never lost
      window.location.href = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
        form.subject || `Portfolio Contact from ${form.name}`
      )}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`
      setStatus('error')
      setTimeout(() => setStatus(null), 6000)
    }
  }

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="fade-in">
          <p className="section-label">08 — Contact</p>
          <h2 className="section-title">Let's Work Together</h2>
          <div className="divider" />
        </div>

        <div className="contact-inner fade-in">
          {/* LEFT INFO */}
          <div className="contact-info">
            <p className="contact-intro">
              Open to Data Analyst, ML Engineer, and SDE internships, freelance analytics projects,
              and open-source collaboration. Usually respond within 24 hours.
            </p>

            {/* Email */}
            <div className="contact-item">
              <div className="contact-icon"><i className="fas fa-envelope" aria-hidden="true" /></div>
              <div className="contact-text">
                <strong>Email</strong>
                <div className="email-row">
                  <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
                  <button className="copy-btn" onClick={copyEmail} title="Copy email"
                    aria-label={copied ? 'Email copied' : 'Copy email address'}>
                    {copied
                      ? <><i className="fas fa-check" aria-hidden="true" /> Copied!</>
                      : <><i className="fas fa-copy"  aria-hidden="true" /> Copy</>}
                  </button>
                </div>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon"><i className="fab fa-linkedin-in" aria-hidden="true" /></div>
              <div className="contact-text">
                <strong>LinkedIn</strong>
                <a href={personalInfo.linkedin} target="_blank" rel="noreferrer">
                  linkedin.com/in/sajlendra-pandey
                </a>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon"><i className="fab fa-github" aria-hidden="true" /></div>
              <div className="contact-text">
                <strong>GitHub</strong>
                <a href={personalInfo.github} target="_blank" rel="noreferrer">
                  github.com/SAJLENDRAPANDEY
                </a>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon"><i className="fas fa-map-marker-alt" aria-hidden="true" /></div>
              <div className="contact-text">
                <strong>Location</strong>
                <span>{personalInfo.location}</span>
              </div>
            </div>

            {/* Response time badge */}
            <div className="contact-badge">
              <span className="contact-badge-dot" />
              Available for internships · Responds within 24h
            </div>
          </div>

          {/* RIGHT FORM */}
          <form className="contact-form" onSubmit={sendEmail} noValidate>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  id="name" name="name" type="text"
                  placeholder="Recruiter Name"
                  value={form.name} onChange={handleChange}
                  required aria-required="true"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email" name="email" type="email"
                  placeholder="recruiter@company.com"
                  value={form.email} onChange={handleChange}
                  required aria-required="true"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                id="subject" name="subject" type="text"
                placeholder="Internship Opportunity / Collaboration"
                value={form.subject} onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message" name="message"
                placeholder="Tell me about the opportunity or project..."
                value={form.message} onChange={handleChange}
                required aria-required="true"
              />
            </div>

            <button type="submit" className="btn-primary" disabled={status === 'sending'}>
              {status === 'sending'
                ? <><i className="fas fa-spinner fa-spin" aria-hidden="true" /> Sending…</>
                : <><i className="fas fa-paper-plane"    aria-hidden="true" /> Send Message</>}
            </button>

            <div role="status" aria-live="polite">
              {status === 'success' && (
                <p className="form-status success">
                  <i className="fas fa-check-circle" aria-hidden="true" />
                  {' '}Message sent! I'll reply within 24 hours.
                </p>
              )}
              {status === 'error' && (
                <p className="form-status error">
                  <i className="fas fa-times-circle" aria-hidden="true" />
                  {' '}Couldn't send via form — opening your email client as backup.
                </p>
              )}
              {status === 'empty' && (
                <p className="form-status error">
                  <i className="fas fa-exclamation-circle" aria-hidden="true" />
                  {' '}Please fill in your name, email, and message.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
