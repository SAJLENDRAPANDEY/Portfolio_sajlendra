// services/gfgService.js
// ─────────────────────────────────────────────────────────
// Fetches GeeksForGeeks stats via OUR OWN Netlify function (/api/gfg),
// which tries multiple community scrapers server-side and caches the
// result for 10 minutes.
//
// Calling the GFG scraper APIs directly from the browser was failing
// permanently with a CORS error (geeks-for-geeks-api.vercel.app never
// sends Access-Control-Allow-Origin) — fetching server-to-server from a
// Netlify Function sidesteps that entirely.
//
// TODO: Replace 'sajlendra_pandey_72' (in netlify/functions/gfg.js)
// with your actual GFG username if it changes.
// ─────────────────────────────────────────────────────────

const GFG_USERNAME = 'sajlendra_pandey_72'

export async function fetchGfgStats() {
  try {
    const res = await fetch('/api/gfg')
    if (!res.ok) throw new Error(`gfg proxy ${res.status}`)
    const data = await res.json()
    if (data.error) throw new Error(data.error)
    return data
  } catch (err) {
    console.warn('GFG stats fetch failed:', err.message)
    return null
  }
}

export { GFG_USERNAME }
