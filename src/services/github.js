// services/github.js
// Re-exports from githubService.js for backward compatibility.
// All new code should import from githubService.js directly.
export { fetchGithubStats, fetchPinnedRepos, GITHUB_USERNAME } from './githubService'
