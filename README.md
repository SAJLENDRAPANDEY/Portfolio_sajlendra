# Yashu Garg — Portfolio v3

A production-grade personal developer platform built with React 18 + Vite + Framer Motion.

## 🚀 What's New in v3

- ✅ **Individual Project Detail Pages** (`/projects/:id`) — Architecture, Features, Tech Stack, Challenges
- ✅ **Project Screenshot Gallery** — per-project images with skeleton loading + lightbox preview
- ✅ **AI Portfolio Assistant** — Powered by Groq API (Llama 3-8B) via a **secure backend proxy**
- ✅ **Project Search + Category Filter** on Projects page
- ✅ **Experience Timeline** — Visual journey from 2023 to 2026
- ✅ **Enhanced Experience Cards** — With type badges, periods, and tags
- ✅ **SEO Overhaul** — OpenGraph, Twitter Card, Schema.org JSON-LD, Canonical URLs
- ✅ **Lazy-loaded routes** — each page is its own JS chunk, faster first load
- ✅ **Error Boundary** — one broken page can't crash the whole app
- ✅ **Accessibility pass** — aria-labels, focus states, skip-to-content link, reduced-motion support
- ✅ **Loading skeletons** — GitHub stats & gallery images shimmer instead of spinning

## 🖼️ Adding Project Screenshots

Each project in `src/data/data.js` has an `images` array, e.g.:

```js
images: [
  { src: "/projects/retail-sales-forecasting/dashboard.png", alt: "...", label: "Dashboard" },
]
```

Folders already exist at `public/projects/<project-id>/` — just drop your real
screenshots in there with the matching filenames. Until you do, the gallery shows
a clean "Screenshot coming soon" placeholder instead of a broken image icon.
Recommended size: 1280×800px.

## 🛠️ Setup

```bash
npm install
```

## 🔒 Security: Groq API key (IMPORTANT — read this)

The AI assistant no longer calls Groq directly from the browser. It now goes through
a backend proxy, so the API key is never bundled into your frontend JS and can never
be read from DevTools:

```
React (browser)  →  /api/chat  (Netlify Function)  →  Groq API
```

- The proxy lives in **`netlify/functions/chat.js`**.
- `netlify.toml` redirects `/api/chat` → `/.netlify/functions/chat`, so the frontend
  code (`fetch('/api/chat')`) never needs to change.
- The real key is read from a **server-side** env var: `GROQ_API_KEY` (no `VITE_` prefix).
- A simple per-IP rate limiter (10 requests/min) is built in to reduce abuse.

### Local setup

1. Go to https://console.groq.com → create a free account → get an API key
2. Rename `.env.example` to `.env`
3. Set `GROQ_API_KEY=your_key_here` (NOT `VITE_GROQ_API_KEY` — that exposes it)
4. Install the Netlify CLI once: `npm i -g netlify-cli`
5. Run `netlify dev` — this serves both the Vite frontend AND `/api/chat` together,
   usually at **http://localhost:8888** (NOT 5173)
   (plain `npm run dev` only starts Vite on :5173 and will NOT serve `/api/chat` —
   that route needs Netlify's local function runtime, which is what `netlify dev` adds.
   This is why you'll see a 404 on `/api/chat` if you open :5173 directly.)

### Production setup (Netlify)

In your Netlify site → **Site configuration → Environment variables**, add:

```
GROQ_API_KEY = your_real_groq_key
```

Do **not** prefix it with `VITE_`. That's the whole fix — Netlify will pick up
`netlify/functions/chat.js` automatically on deploy via `netlify.toml`, no extra config needed.

⚠️ **Never paste real keys into any file in this project** (`.env.example`, code,
or otherwise) if that project will ever be zipped, committed, or shared — only paste
real secret values into the Netlify dashboard's Environment variables screen.

## 📝 Where to Add Your Links

All editable content is in `src/data/data.js`:

| Field | What to change |
|-------|---------------|
| `personalInfo.email` | Your real Gmail/email |
| `personalInfo.linkedin` | Your LinkedIn URL |
| `personalInfo.github` | Your GitHub URL |
| `personalInfo.githubUsername` | Your GitHub username (for stats cards) |
| `projects[].github` | Each project's GitHub repo URL |
| `projects[].live` | Each project's live/deployed URL |
| `personalInfo.resumeLink` | Put `resume.pdf` in `/public` folder |

## 📁 Project Structure

```
netlify/
  functions/
    chat.js      ← Groq backend proxy (Netlify Function, holds the real key)
src/
  components/    ← Reusable UI (Navbar, Footer, Hero, ProjectGallery, ErrorBoundary, etc.)
  pages/         ← Route-level pages (lazy-loaded)
  routes/        ← React Router config
  context/       ← ThemeContext
  hooks/         ← useCursor, useScroll
  services/      ← GitHub API service
  animations/    ← Framer Motion variants
  data/          ← data.js (ALL your content here, including project images)
  utils/         ← constants, helpers
public/
  projects/<id>/ ← drop real screenshots here for each project's gallery
```

## 🚢 Deployment (Netlify)

```bash
npm run build
```

Then push to GitHub → New site from Git in Netlify → Add environment variable
`GROQ_API_KEY` (server-side, no `VITE_` prefix — see Security section above).
The included `netlify.toml` makes sure React Router routes don't 404 on page
refresh, and that `/api/chat` is reachable and redirected to the Netlify Function.
