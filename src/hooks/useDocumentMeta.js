import { useEffect } from 'react'

// Deployed on Netlify — domain matches sitemap.xml / robots.txt / netlify.toml
const SITE = 'https://sajlendrapandey.netlify.app'
const DEFAULT_IMAGE = `${SITE}/og-image.png`

function setMeta(attr, key, content) {
  if (!content) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/**
 * Updates document title, meta description, canonical URL, and Open Graph /
 * Twitter tags for the current route. Previously every page (Home, Projects,
 * each project case study, Resume, Experience) shared the single static
 * <title>/<meta> pair from index.html — so a recruiter sharing a project
 * link on LinkedIn, or a search engine indexing /projects/:id, would always
 * see the homepage title/description. This restores it per route without
 * pulling in a new dependency (react-helmet etc).
 */
export function useDocumentMeta({ title, description, path = '', image } = {}) {
  useEffect(() => {
    const fullTitle = title ? `Sajlendra Pandey — ${title}` : 'Sajlendra Pandey — Data Analyst | ML Engineer | Portfolio'
    document.title = fullTitle

    setMeta('name', 'description', description)
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', `${SITE}${path}`)
    setMeta('property', 'og:image', image || DEFAULT_IMAGE)
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', image || DEFAULT_IMAGE)

    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', `${SITE}${path}`)
  }, [title, description, path, image])
}
