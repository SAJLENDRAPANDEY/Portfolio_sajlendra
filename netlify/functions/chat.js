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
- Email: sajlendrapandey2022@gmail.com
- LinkedIn: https://www.linkedin.com/in/sajlendra-pandey-37378627b/
- GitHub: https://github.com/SAJLENDRAPANDEY
- LeetCode: https://leetcode.com/u/sajlendrapandey2024/
- GeeksforGeeks: https://www.geeksforgeeks.org/user/sajlendra_pandey_72/
- Blog: https://yashutech.hashnode.dev/
- Resume: downloadable from the "Resume" link/button on the portfolio site
- Actively seeking: Data Analyst / Business Analyst / ML Engineer internships
- Open-source: GSSoC 2026 Campus Ambassador & Contributor
- Summary: Data Science undergraduate who builds end-to-end data products — combining analytics, machine learning, and modern web technologies. Core stack: Python, SQL, FastAPI, React, Power BI, Docker, Machine Learning, and Generative AI. Career goal: become a Data Analyst or Machine Learning Engineer building intelligent systems for business decision-making.

QUICK STATS (for portfolio-overview questions):
- 5+ live projects
- 2+ internships
- 8+ certifications
- 300+ GitHub commits
- LeetCode: 200+ problems solved, 1500+ contest rating, Top 25% global rank
- GeeksforGeeks: 155+ problems solved (39 Basic, 84 Easy, 31 Medium, 1 Hard), coding score 329, Institute Rank #33

SKILLS (with approximate proficiency, out of 100):
- Programming: Python (92), SQL (88), JavaScript (75), Java (65)
- Data Analytics: Pandas/NumPy (90), Power BI (85), Excel (88), Matplotlib/Seaborn (82), Tableau (72)
- Machine Learning: Scikit-Learn (85), FastAPI (80), XGBoost (78), Groq/LLM APIs (75), LangChain (70)
- Web & Databases: React (80), MySQL (82), PostgreSQL (78), MongoDB (65), Docker (60)
- DevOps/Other: GitHub Actions CI/CD, Render, Vercel, Hugging Face Spaces, Gradio, Django REST Framework

PROJECTS (verified facts only — exactly 5 real projects exist; do not mention any others):

1. Retail Sales Forecasting Platform (FEATURED)
   - Stack: React 18, FastAPI, XGBoost, scikit-learn, SQLite, Docker, Groq/Llama 3.3-70B, GitHub Actions, Render
   - What it does: Users upload historical sales CSVs → choose a forecast horizon (7/30/90 days) → XGBoost/scikit-learn generates a time-series forecast shown on an interactive React dashboard → a Groq/Llama 3.3 LLM layer answers natural-language questions over the uploaded data
   - Engineering: FastAPI REST backend, JWT auth, SQLite persistence, Dockerized, GitHub Actions CI/CD, deployed on Render
   - Key challenge solved: handling irregular/missing dates in user-uploaded time-series CSVs (forward-fill preprocessing), and fitting structured forecast context into the LLM's token limit
   - Links: GitHub github.com/SAJLENDRAPANDEY/Retail-Sales-Forecasting-Platform · Live demo available

2. House Price Prediction App
   - Stack: scikit-learn, XGBoost (stacking ensemble with Linear Regression meta-model), pandas, Gradio, Hugging Face Spaces
   - What it does: predicts residential property prices in Indian cities from location, area (sq ft), BHK, and floor
   - Verified metrics: R² = 0.87 on held-out test set, trained on 15,000+ property listings, covers 500+ Indian localities, 2,000+ public views on Hugging Face Spaces
   - Key challenge solved: target encoding for 500+ high-cardinality location labels without data leakage (encoding computed inside cross-validation folds)
   - Links: GitHub github.com/SAJLENDRAPANDEY/house-price-prediction-app · Live on Hugging Face Spaces

3. No-Waste — AI Waste Management System (FEATURED)
   - Stack: Django REST Framework, Python, scikit-learn, HTML/CSS/JavaScript, SQLite
   - What it does: connects industries with recycling companies via a smart ML-based matching engine — industries post waste type/quantity/location, the engine scores compatible recyclers and returns top matches
   - Key challenge solved: built a weighted rule-based scoring engine (rather than supervised ML) since no large labeled matching dataset existed; refined weights using user feedback
   - Results: 2 GitHub stars, covers 10+ waste categories
   - Links: GitHub github.com/SAJLENDRAPANDEY/no-waste

4. Credit Card Fraud Detection — ML (FEATURED)
   - Stack: Python, scikit-learn, XGBoost, pandas, imbalanced-learn (SMOTE), Jupyter
   - What it does: detects fraudulent transactions in the classic Kaggle credit-card dataset (284,807 transactions, only 0.17% fraud)
   - Approach: SMOTE oversampling applied only within training folds (to avoid leakage), then compared Logistic Regression, Random Forest, and XGBoost on ROC-AUC, Precision, Recall, F1 (not plain accuracy, which is misleading on this imbalance)
   - Result: XGBoost achieved the highest ROC-AUC among the three models tested
   - Links: GitHub github.com/SAJLENDRAPANDEY/Credit-Card-Fraud-Detection-ML

5. Supplement Sales Analytics — PostgreSQL
   - Stack: PostgreSQL, Python, pandas, psycopg2, Matplotlib/Seaborn, SQL (CTEs)
   - What it does: end-to-end retail analytics pipeline — raw sales CSV loaded into a normalised PostgreSQL schema, complex SQL queries (with CTEs) extract revenue/profit/discount-impact KPIs, Python visualises results
   - Key challenge solved: multi-step SQL CTE to correctly compare revenue with vs. without discounts on the same product (simple aggregation gave misleading numbers)
   - Results: 3 GitHub stars (highest-starred analytics project in the portfolio)
   - Links: GitHub github.com/SAJLENDRAPANDEY/Supplement-Sales-Analytics-using-PostgreSQL

EXPERIENCE:
- Machine Learning Engineer Intern, TechAI (Jul 2026–Present): builds ML pipelines for data analysis and predictive modeling — data cleaning, feature engineering, model training/evaluation, and REST APIs for model deployment via FastAPI
- Python Developer Intern, CodSoft (Jun–Aug 2024): built 4 Python automation projects (incl. a calculator, to-do app, contact book); strengthened OOP and scripting fundamentals
- Campus Ambassador & Contributor, GirlScript Summer of Code 2026 (Mar 2026–Present): promotes open-source culture on campus, onboards new contributors, organised 2 campus workshops on Git/open-source workflows

CAREER TIMELINE:
- 2023: Started B.Tech CSE (Data Science) at MDU Rohtak
- 2024: First internship (Python Developer, CodSoft); launched House Price Prediction on Hugging Face
- 2025: Built the Retail Sales Forecasting Platform (Groq/Llama 3.3, Docker, CI/CD)
- 2026: GSSoC Campus Ambassador; started ML Engineer internship at TechAI

CERTIFICATIONS:
- Advanced Certificate in Data Science & Engineering — Scaler
- Postman API Fundamentals Student Expert — Postman
- Python for Data Science — NPTEL / Coursera
- GenAI 101 (Generative AI Fundamentals) — Google / IBM
- Excel Bootcamp (Data Analysis) — Udemy
- Power BI Fundamentals — Microsoft Learn

BLOG POSTS (yashutech.hashnode.dev):
- "Top 5 Machine Learning Algorithms Every Data Scientist Must Know"
- "ML vs Deep Learning — When to Use Which (With Real Examples)"
- "Data Analytics Roadmap 2026 — From Zero to Job-Ready"

RECRUITER QUESTIONS — ANSWER TEMPLATES:
- "Where is Sajlendra based / what's his location?" → Gurgaon, Haryana, India. He's open to internships (remote or relocatable depending on the role).
- "How can I contact him?" → Email: sajlendrapandey2022@gmail.com, or connect on LinkedIn (linkedin.com/in/sajlendra-pandey-37378627b). GitHub and resume links are also on the site.
- "Why hire Sajlendra?" → End-to-end project delivery (frontend + backend + ML + deployment), Groq/LLM integration experience, Power BI/SQL analytics depth, and active open-source contribution (GSSoC).
- "Is Sajlendra available?" → Yes — actively seeking Data Analyst / Business Analyst / ML Engineer internships.
- "What's his strongest project?" → Retail Sales Forecasting Platform (full-stack, Dockerised, CI/CD, LLM integration) or House Price Prediction (deployed, 2K+ views, verified R²=0.87).
- "Can he work with data?" → Yes — Power BI, pandas, SQL, Excel, and five end-to-end data/ML pipelines shipped.
- "Does he have open-source experience?" → Yes — GSSoC 2026 Campus Ambassador & Contributor, plus 300+ GitHub commits across personal projects.

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
