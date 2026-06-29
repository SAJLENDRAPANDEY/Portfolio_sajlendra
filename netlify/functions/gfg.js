// netlify/functions/gfg.js
// ─────────────────────────────────────────────────────────
// Server-side proxy for GeeksForGeeks stats.
//
// Why this exists: geeks-for-geeks-api.vercel.app does not send an
// Access-Control-Allow-Origin header, so calling it directly from the
// browser is ALWAYS blocked by CORS — that's not flaky, it's permanent.
// Fetching it from this Netlify Function (server-to-server, no CORS
// concept applies) sidesteps the problem entirely. Result is cached for
// 10 minutes to limit load on the free upstream APIs.
// ─────────────────────────────────────────────────────────

const GFG_USERNAME = 'sajlendra_pandey_72'
const CACHE_TTL_MS = 10 * 60 * 1000

let cache = { data: null, fetchedAt: 0 }

const CORS_HEADERS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

async function fetchFromArnoob16() {
  const res = await fetch(`https://geeks-for-geeks-api.vercel.app/${GFG_USERNAME}`)
  if (!res.ok) throw new Error(`arnoob16 API ${res.status}`)
  const data = await res.json()
  if (data.error) throw new Error(data.error)

  const info = data.info || {}
  const solved = data.solvedStats || {}
  return {
    userName:           info.userName || GFG_USERNAME,
    instituteRank:       info.instituteRank,
    codingScore:         info.codingScore,
    totalProblemsSolved: info.totalProblemsSolved,
    school:              solved.school?.count,
    basic:               solved.basic?.count,
    easy:                solved.easy?.count,
    medium:              solved.medium?.count,
    hard:                solved.hard?.count,
  }
}

async function fetchFromNapiyo() {
  const res = await fetch(`https://geeks-for-geeks-stats-api.vercel.app/?raw=y&userName=${GFG_USERNAME}`)
  if (!res.ok) throw new Error(`napiyo API ${res.status}`)
  const data = await res.json()
  if (data.error || data.status === 'error') throw new Error(data.error || 'napiyo API error')

  return {
    userName:            data.userName || GFG_USERNAME,
    instituteRank:        data.instituteRank,
    codingScore:          data.codingScore,
    totalProblemsSolved:  data.totalProblemsSolved || data.totalProblems,
    school:               data.school,
    basic:                data.basic,
    easy:                 data.easy,
    medium:               data.medium,
    hard:                 data.hard,
  }
}

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: CORS_HEADERS, body: '' }
  }

  const now = Date.now()
  if (cache.data && now - cache.fetchedAt < CACHE_TTL_MS) {
    return { statusCode: 200, headers: CORS_HEADERS, body: JSON.stringify(cache.data) }
  }

  const sources = [fetchFromArnoob16, fetchFromNapiyo]
  for (const source of sources) {
    try {
      const result = await source()
      if (result.totalProblemsSolved == null && result.codingScore == null) {
        throw new Error('Empty response (no stats returned)')
      }
      const final = { ...result, profileUrl: `https://www.geeksforgeeks.org/user/${GFG_USERNAME}/` }
      cache = { data: final, fetchedAt: now }
      return { statusCode: 200, headers: CORS_HEADERS, body: JSON.stringify(final) }
    } catch (err) {
      console.warn(`GFG source "${source.name}" failed:`, err.message)
    }
  }

  if (cache.data) {
    return { statusCode: 200, headers: CORS_HEADERS, body: JSON.stringify(cache.data) }
  }
  return {
    statusCode: 502,
    headers: CORS_HEADERS,
    body: JSON.stringify({ error: 'GFG stats unavailable' }),
  }
}
