// services/leetcodeService.js
// ─────────────────────────────────────────────────────────
// Fetches LeetCode stats via OUR OWN Netlify function (/api/leetcode),
// which proxies alfa-leetcode-api server-side and caches the result for
// 10 minutes. This avoids every visitor's browser hammering the free
// upstream API directly (which was causing 429 Too Many Requests).
//
// TODO: Replace 'sajlendrapandey2024' (in netlify/functions/leetcode.js)
// with your actual LeetCode username if it changes.
// ─────────────────────────────────────────────────────────

const LEETCODE_USERNAME = 'sajlendrapandey2024'

export async function fetchLeetcodeStats() {
  try {
    const res = await fetch('/api/leetcode')
    if (!res.ok) throw new Error(`leetcode proxy ${res.status}`)
    const data = await res.json()
    if (data.error) throw new Error(data.error)
    return data
  } catch (err) {
    console.warn('LeetCode stats fetch failed:', err.message)
    return null
  }
}

export { LEETCODE_USERNAME }
