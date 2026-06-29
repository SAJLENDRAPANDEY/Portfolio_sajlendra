// services/githubService.js
// ─────────────────────────────────────────────────────────
// Fetches live GitHub data for SAJLENDRAPANDEY.
//
// Public GitHub REST API: 60 requests/hour unauthenticated.
// For higher limits add a Personal Access Token:
//   1. github.com → Settings → Developer Settings → Personal Access Tokens → Fine-grained
//   2. Select: Public repositories (read-only)
//   3. Copy the token
//   4. Add to Vercel Environment Variables:
//        VITE_GITHUB_TOKEN = ghp_xxxxxxxxxxxxxxxxxxxx
//   NOTE: Use VITE_ prefix so Vite injects it into the frontend bundle.
//   Do NOT commit the token to git.
//
// TODO: Add VITE_GITHUB_TOKEN to your Vercel project env variables
// ─────────────────────────────────────────────────────────

const BASE = 'https://api.github.com'

// TODO: Replace 'SAJLENDRAPANDEY' with your actual GitHub username if different
const GITHUB_USERNAME = 'SAJLENDRAPANDEY'

// Token from Vite env (optional — raises rate limit from 60 to 5000 req/hr)
// TODO: Add VITE_GITHUB_TOKEN to .env.local for dev and Vercel env vars for prod
const TOKEN = import.meta.env.VITE_GITHUB_TOKEN

function authHeaders() {
  const h = { 'Accept': 'application/vnd.github+json' }
  if (TOKEN) h['Authorization'] = `Bearer ${TOKEN}`
  return h
}

async function ghFetch(path) {
  const res = await fetch(`${BASE}${path}`, { headers: authHeaders() })
  if (!res.ok) throw new Error(`GitHub API ${res.status}: ${path}`)
  return res.json()
}

// ─── Main stats fetch ───────────────────────────────────
export async function fetchGithubStats() {
  try {
    const [user, repos] = await Promise.all([
      ghFetch(`/users/${GITHUB_USERNAME}`),
      ghFetch(`/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`),
    ])

    const totalStars = Array.isArray(repos)
      ? repos.reduce((s, r) => s + (r.stargazers_count || 0), 0)
      : 0

    // Top languages by number of repos
    const langCount = {}
    if (Array.isArray(repos)) {
      repos.forEach((r) => {
        if (r.language) langCount[r.language] = (langCount[r.language] || 0) + 1
      })
    }
    const topLangs = Object.entries(langCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([lang, count]) => ({ lang, count }))

    // Most recently updated repos (exclude forks for cleaner display)
    const recentRepos = Array.isArray(repos)
      ? repos
          .filter((r) => !r.fork)
          .slice(0, 6)
          .map((r) => ({
            name:        r.name,
            description: r.description || '',
            url:         r.html_url,
            stars:       r.stargazers_count,
            forks:       r.forks_count,
            language:    r.language,
            updatedAt:   r.updated_at,
          }))
      : []

    return {
      followers:   user.followers  || 0,
      following:   user.following  || 0,
      publicRepos: user.public_repos || 0,
      totalStars,
      topLangs,
      recentRepos,
      avatarUrl:   user.avatar_url,
      bio:         user.bio,
      username:    GITHUB_USERNAME,
      profileUrl:  user.html_url,
      createdAt:   user.created_at,
    }
  } catch (err) {
    console.warn('GitHub stats fetch failed:', err.message)
    return null
  }
}

// ─── Pinned repos (requires GraphQL — needs token) ──────
// Falls back gracefully to empty array if no token.
export async function fetchPinnedRepos() {
  if (!TOKEN) return [] // GraphQL API requires auth

  try {
    const query = `{
      user(login: "${GITHUB_USERNAME}") {
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              name
              description
              url
              stargazerCount
              forkCount
              primaryLanguage { name }
              updatedAt
            }
          }
        }
      }
    }`

    const res = await fetch('https://api.github.com/graphql', {
      method:  'POST',
      headers: { ...authHeaders(), 'Content-Type': 'application/json' },
      body:    JSON.stringify({ query }),
    })

    if (!res.ok) throw new Error(`GraphQL ${res.status}`)
    const data = await res.json()
    const nodes = data?.data?.user?.pinnedItems?.nodes || []

    return nodes.map((n) => ({
      name:        n.name,
      description: n.description || '',
      url:         n.url,
      stars:       n.stargazerCount,
      forks:       n.forkCount,
      language:    n.primaryLanguage?.name || null,
      updatedAt:   n.updatedAt,
    }))
  } catch (err) {
    console.warn('Pinned repos fetch failed (needs token):', err.message)
    return []
  }
}

export { GITHUB_USERNAME }
