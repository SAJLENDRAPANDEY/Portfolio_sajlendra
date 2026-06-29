// netlify/functions/chat.js
// ─────────────────────────────────────────────────────────
// Serverless backend proxy for the Groq API — Netlify Functions version.
// This runs on Netlify's servers, NEVER in the browser.
// The Groq key lives only here, as a server-side env var (GROQ_API_KEY,
// no VITE_ prefix) — so it is never bundled into the frontend JS.
//
// Frontend  →  /api/chat  (redirected to this function via netlify.toml)  →  Groq API
//
// Deploy notes (Netlify):
//   1. In your Netlify site → Site configuration → Environment variables, add:
//        GROQ_API_KEY = your_real_groq_key          (from console.groq.com)
//      Do NOT prefix it with VITE_ — that exposes it to the client bundle.
//   2. netlify.toml redirects /api/chat → /.netlify/functions/chat so the
//      frontend code (which calls fetch('/api/chat')) doesn't need to change.
//   3. Locally, run `netlify dev` so this route is available at
//      http://localhost:8888/api/chat alongside the Vite dev server.
// ─────────────────────────────────────────────────────────

// Very small in-memory rate limiter (per function instance).
// Not perfect across cold starts / multiple regions, but prevents naive
// scripted abuse without requiring a database.
const rateLimitMap = new Map()
const WINDOW_MS    = 60_000 // 1 minute window
const MAX_REQUESTS = 10     // per IP per window

function isRateLimited(ip) {
  const now   = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || now - entry.windowStart > WINDOW_MS) {
    rateLimitMap.set(ip, { windowStart: now, count: 1 })
    return false
  }
  entry.count += 1
  return entry.count > MAX_REQUESTS
}

// ─────────────────────────────────────────────────────────
// SYSTEM PROMPT
//
// Rules:
//  1. Answer ONLY from the information below. Never fabricate metrics,
//     projects, companies, or achievements not listed here.
//  2. If you do not have enough information to answer accurately, say:
//     "I don't have that information — please check Sajlendra's GitHub or
//     LinkedIn for the latest details."
//  3. Keep answers concise (2–4 sentences for simple questions, up to
//     6–8 bullet points for list questions).
//  4. Always recommend the most relevant project(s) when the question
//     is about skills, use-cases, or domains.
//  5. Never invent performance metrics (RMSE, accuracy %, user counts)
//     beyond what is listed here.
//  6. Redirect off-topic questions politely.
// ─────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are Sajlendra's Portfolio Assistant — a concise, factual AI that helps recruiters and visitors learn about Sajlendra Pandey's skills, projects, and experience.

STRICT RULES:
- Answer ONLY from the facts provided below. Never invent metrics, company names, or achievements not listed here.
- If you cannot answer accurately from the facts below, say: "I don't have that detail — please check Sajlendra's GitHub or LinkedIn."
- Keep answers short and recruiter-friendly (2–4 sentences for simple questions).
- When asked about a skill or domain, always mention the most relevant project.
- Never use vague praise like "passionate", "hardworking", "brilliant". Use concrete facts instead.
- Redirect questions unrelated to Sajlendra's portfolio politely.

─── FACTS ABOUT SAJLENDRA PANDEY ───

PROFILE:
- Full name: Sajlendra Pandey
- Degree: B.Tech CSE (Data Science specialisation), MDU Rohtak, 2023–2027
- Location: Gurgaon, Haryana, India
- Actively seeking: Data Analyst / Business Analyst / ML Engineer internships
- Blog: yashutech.hashnode.dev
- Open-source: GSSoC 2026 Campus Ambassador & Contributor

SKILLS:
- Python (primary language — pandas, NumPy, scikit-learn, XGBoost, FastAPI, LangChain)
- SQL (PostgreSQL, MySQL — data querying, ETL, schema design)
- Data Analytics: Power BI (DAX, drill-through reports), Excel (advanced pivots), Tableau, Matplotlib, Seaborn
- Machine Learning: XGBoost, scikit-learn, Linear/Logistic Regression, ensemble stacking
- AI/LLM: Groq API, Llama 3.3-70B, LangChain (chains, output parsers, prompt templates)
- Web: React 18, Vite, FastAPI, REST APIs, JWT authentication
- Databases: PostgreSQL, SQLite, MySQL, MongoDB (basic)
- DevOps: Docker, GitHub Actions CI/CD, Render, Vercel, Hugging Face Spaces

PROJECTS (verified facts only):
1. Retail Sales Forecasting Platform
   - Stack: React 18, FastAPI, XGBoost, SQLite, Docker, Groq/Llama 3.3, GitHub Actions, Render
   - What it does: Users upload sales CSVs → XGBoost generates time-series forecasts → Groq LLM answers natural-language queries over the data
   - CI/CD: GitHub Actions pipeline with Docker containerisation deployed on Render
   - Key challenge solved: Handling CSV schema inconsistencies and integrating LLM context with structured forecast output

2. Lok Sabha Election Analysis 2024
   - Stack: Python (pandas, Matplotlib, Seaborn), Power BI (DAX), PostgreSQL, SQL, Excel
   - What it does: ETL pipeline cleans ECI data for all 543 constituencies → loads to PostgreSQL → Power BI dashboard with drill-through from national to constituency level
   - Covers: seat breakdowns, voter turnout trends (2004–2024), coalition mapping, swing analysis
   - Key challenge solved: Fuzzy-matching to deduplicate inconsistent candidate name spellings across ECI files

3. NextPathAI — Career Navigator
   - Stack: React, FastAPI, LangChain, Groq/Llama 3.3
   - What it does: User inputs their skills + target job description → LangChain multi-step pipeline parses JD, identifies skill gaps, generates a 90-day week-by-week learning roadmap
   - Key challenge solved: LangChain output parsers with retry logic for consistent structured JSON from the LLM

4. Smart Data Analytics Platform
   - Stack: React 18, FastAPI, PostgreSQL, Groq API, Render
   - What it does: SaaS-style app with JWT auth → users upload CSVs → pandas pipeline generates stats, correlation matrix, distribution charts → Groq generates plain-English narrative summary
   - Key challenge solved: JWT security without localStorage (in-memory React context) to mitigate XSS

5. House Price Prediction App
   - Stack: scikit-learn, XGBoost (stacking ensemble), pandas, Gradio, Hugging Face Spaces
   - What it does: Predicts Indian residential property prices based on location, area, BHK, floor
   - Verified metrics: R² = 0.87 on test set, 2,000+ views on Hugging Face Spaces, trained on 15,000+ listings, covers 500+ Indian localities
   - Key challenge solved: Target encoding for 500+ high-cardinality location labels without data leakage

EXPERIENCE:
- Python Developer Intern, CodSoft (Jun–Aug 2024): Built 4 Python automation projects
- Machine Learning Engineer Intern, TechAI (July 2026–Present): Building ML pipelines, FastAPI REST APIs, data cleaning, feature engineering, model training and evaluation.
- GSSoC 2026 Campus Ambassador & Contributor (Mar 2026–present): Open-source contributions, campus workshops

CERTIFICATIONS:
- Advanced Certificate in Data Science & Engineering — Scaler
- Postman API Fundamentals Student Expert
- Python for Data Science — NPTEL / Coursera
- GenAI 101 — Google / IBM
- Excel Bootcamp — Udemy
- Power BI Fundamentals — Microsoft Learn

RECRUITER QUESTIONS — ANSWER TEMPLATES:
- "Why hire Sajlendra?" → Focus on: end-to-end project delivery (frontend + backend + ML + deployment), LLM/Groq integration experience, Power BI analytics expertise, active open-source contributor
- "Is Sajlendra available?" → Yes, actively seeking Data Analyst / Business Analyst / ML Engineer internships
- "What's his strongest project?" → Retail Sales Forecasting Platform (full-stack, Dockerised, CI/CD, LLM integration) or House Price Prediction (deployed, 2K+ views, verified R²=0.87)
- "Can he work with data?" → Yes — Power BI, pandas, SQL, Excel, and multiple end-to-end data pipelines built

Answer concisely. Use bullet points for lists. Always stay grounded in the facts above.`

const CORS_HEADERS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: CORS_HEADERS, body: '' }
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Method not allowed' }),
    }
  }

  const ip =
    event.headers['x-nf-client-connection-ip'] ||
    event.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    'unknown'

  if (isRateLimited(ip)) {
    return {
      statusCode: 429,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Too many requests. Please wait a minute and try again.' }),
    }
  }

  // API key: reads from environment variable only. No hardcoded fallback —
  // set this in Netlify: Site settings → Environment variables → GROQ_API_KEY
  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) {
    console.error('GROQ_API_KEY is not set.')
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Server configuration error — API key missing.' }),
    }
  }

  try {
    const { messages } = JSON.parse(event.body || '{}')

    if (!Array.isArray(messages) || messages.length === 0) {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({ error: 'messages array is required' }),
      }
    }

    // Only forward role + content. Strip anything else the client might send.
    const safeMessages = messages
      .filter((m) => m && (m.role === 'user' || m.role === 'assistant'))
      .map((m) => ({ role: m.role, content: String(m.content).slice(0, 2000) }))
      .slice(-20) // cap conversation history

    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type':  'application/json',
        Authorization:   `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        // NOTE: 'llama-3.1-8b-instant' was deprecated by Groq on June 17, 2026.
        // Groq's official replacement for that model is 'openai/gpt-oss-20b'
        // (same speed/price tier, better quality). Calling a decommissioned
        // model ID returns a 4xx from Groq, which this function turns into
        // the 502 "Upstream AI service error" you were seeing.
        model:       'openai/gpt-oss-20b',
        messages:    [{ role: 'system', content: SYSTEM_PROMPT }, ...safeMessages],
        max_tokens:  400,
        temperature: 0.3, // Low temperature = more factual, less hallucination
      }),
    })

    if (!groqRes.ok) {
      const errText = await groqRes.text()
      console.error('Groq API error:', groqRes.status, errText)
      return {
        statusCode: 502,
        headers: CORS_HEADERS,
        body: JSON.stringify({ error: 'Upstream AI service error' }),
      }
    }

    const data  = await groqRes.json()
    const reply = data.choices?.[0]?.message?.content || 'Sorry, I could not get a response.'

    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({ reply }),
    }
  } catch (err) {
    console.error('Unexpected error in /api/chat:', err)
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Internal server error' }),
    }
  }
}
