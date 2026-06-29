// netlify/functions/leetcode.js
// ─────────────────────────────────────────────────────────
// Server-side proxy for alfa-leetcode-api.
//
// Why this exists: calling alfa-leetcode-api.onrender.com directly from the
// browser works most of the time, but that free Render-hosted API rate
// limits aggressively (429) and occasionally throttles by IP. Every visitor's
// browser hitting it directly multiplies the chance of a 429.
//
// This function fetches once on the server and caches the result in memory
// for 10 minutes, so all visitors share one upstream call per cache window
// instead of each browser making its own — drastically cutting 429s.
// ─────────────────────────────────────────────────────────

const LEETCODE_USERNAME = 'sajlendrapandey2024'
const LC_API = 'https://alfa-leetcode-api.onrender.com'
const CACHE_TTL_MS = 10 * 60 * 1000 // 10 minutes

let cache = { data: null, fetchedAt: 0 }

const CORS_HEADERS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: CORS_HEADERS, body: '' }
  }

  const now = Date.now()
  if (cache.data && now - cache.fetchedAt < CACHE_TTL_MS) {
    return { statusCode: 200, headers: CORS_HEADERS, body: JSON.stringify(cache.data) }
  }

  try {
    const res = await fetch(`${LC_API}/${LEETCODE_USERNAME}/solved`)
    if (!res.ok) throw new Error(`alfa-leetcode-api ${res.status}`)
    const data = await res.json()
    if (data.error) throw new Error(data.error)

    const result = {
      totalSolved:        data.solvedProblem || 0,
      easySolved:         data.easySolved || 0,
      mediumSolved:       data.mediumSolved || 0,
      hardSolved:         data.hardSolved || 0,
      ranking:            data.ranking || null,
      acceptanceRate:     data.acceptanceRate ? Number(data.acceptanceRate).toFixed(1) : null,
      contributionPoints: data.contributionPoints || 0,
      reputation:         data.reputation || 0,
      username:           LEETCODE_USERNAME,
      profileUrl:         `https://leetcode.com/${LEETCODE_USERNAME}/`,
    }

    cache = { data: result, fetchedAt: now }
    return { statusCode: 200, headers: CORS_HEADERS, body: JSON.stringify(result) }
  } catch (err) {
    console.warn('LeetCode proxy fetch failed:', err.message)
    // Serve stale cache if we have it, rather than nothing.
    if (cache.data) {
      return { statusCode: 200, headers: CORS_HEADERS, body: JSON.stringify(cache.data) }
    }
    return {
      statusCode: 502,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'LeetCode stats unavailable', detail: err.message }),
    }
  }
}
