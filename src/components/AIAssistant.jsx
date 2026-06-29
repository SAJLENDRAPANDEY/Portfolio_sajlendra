import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './AIAssistant.css'

// 🔒 SECURITY NOTE:
// The Groq API key is NEVER referenced here anymore. It used to be read
// from import.meta.env.VITE_GROQ_API_KEY, but any VITE_-prefixed env var
// gets baked into the built JS bundle and is fully visible to anyone who
// opens DevTools → Sources/Network. That let anyone steal the key and
// burn through your Groq quota.
//
// Now the browser talks to OUR OWN backend route (/api/chat), and that
// backend route (see api/chat.js) is the only place that holds the real
// key, read from a server-side env var (GROQ_API_KEY, no VITE_ prefix).
//
//   React (browser)  →  /api/chat (serverless function)  →  Groq API
//
// See api/chat.js for the proxy implementation and deployment notes.
const CHAT_ENDPOINT = '/api/chat'

const QUICK_PROMPTS = [
  "Why should we hire Sajlendra?",
  "What projects has Sajlendra built?",
  "Is Sajlendra available for internships?",
  "What are Sajlendra's strongest technical skills?",
  "Tell me about the House Price Prediction project",
  "Can Sajlendra work with Power BI and SQL?",
]

export default function AIAssistant() {
  const [open, setOpen]       = useState(false)
  const [input, setInput]     = useState('')
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm Sajlendra's portfolio assistant. I can tell you about his projects, skills, and experience — ask me anything, or pick a question below." }
  ])
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  // Focus the input the moment the panel opens, and let Escape close it
  // — both are expected keyboard behaviors for a chat overlay.
  useEffect(() => {
    if (!open) return
    const t = setTimeout(() => inputRef.current?.focus(), 50)
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => { clearTimeout(t); window.removeEventListener('keydown', onKey) }
  }, [open])

  const send = async (text) => {
    const query = text || input.trim()
    if (!query || loading) return
    setInput('')

    const newMessages = [...messages, { role: 'user', content: query }]
    setMessages(newMessages)
    setLoading(true)

    try {
      const apiMessages = newMessages
        .filter((m) => m.role !== 'system')
        .map((m) => ({ role: m.role, content: m.content }))

      // Calls OUR backend, not Groq directly. The real key + system
      // prompt live server-side in api/chat.js, never in this bundle.
      const res = await fetch(CHAT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      })

      if (!res.ok) throw new Error('API error')
      const data = await res.json()
      const reply = data.reply || 'Sorry, I could not get a response.'
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }])
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: '⚠️ Could not connect right now. Please try again in a moment.' },
      ])
    } finally {
      setLoading(false)
    }
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  return (
    <>
      {/* Floating button */}
      <motion.button
        className="ai-fab"
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        title="Ask AI about Sajlendra"
        aria-label={open ? 'Close AI assistant' : 'Open AI assistant'}
        aria-expanded={open}
      >
        {open
          ? <i className="fas fa-times" aria-hidden="true" />
          : <><i className="fas fa-robot" aria-hidden="true" /><span className="ai-fab-label">Ask AI</span></>
        }
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="ai-panel"
            role="dialog"
            aria-modal="false"
            aria-label="AI assistant chat"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.22 }}
          >
            {/* Header */}
            <div className="ai-header">
              <div className="ai-header-left">
                <div className="ai-avatar" aria-hidden="true"><i className="fas fa-robot" /></div>
                <div>
                  <div className="ai-title">Sajlendra's AI Assistant</div>
                  <div className="ai-subtitle">
                    <span className="ai-dot" aria-hidden="true" /> Powered by Groq · Llama 3
                  </div>
                </div>
              </div>
              <button className="ai-close" onClick={() => setOpen(false)} aria-label="Close AI assistant">
                <i className="fas fa-times" aria-hidden="true" />
              </button>
            </div>

            {/* Messages */}
            <div className="ai-messages" role="log" aria-live="polite" aria-label="Chat messages">
              {messages.map((m, i) => (
                <div key={i} className={`ai-msg ai-msg-${m.role}`}>
                  {m.role === 'assistant' && (
                    <div className="ai-msg-icon" aria-hidden="true"><i className="fas fa-robot" /></div>
                  )}
                  <div className="ai-msg-bubble">{m.content}</div>
                </div>
              ))}
              {loading && (
                <div className="ai-msg ai-msg-assistant">
                  <div className="ai-msg-icon" aria-hidden="true"><i className="fas fa-robot" /></div>
                  <div className="ai-msg-bubble ai-typing" aria-label="AI is typing">
                    <span /><span /><span />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick prompts — shown until the user has sent their first message */}
            {messages.length <= 1 && (
              <div className="ai-quick">
                {QUICK_PROMPTS.map((q) => (
                  <button key={q} className="ai-quick-btn" onClick={() => send(q)}>
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="ai-input-row">
              <label htmlFor="ai-chat-input" className="sr-only">Ask the AI assistant a question</label>
              <input
                id="ai-chat-input"
                ref={inputRef}
                className="ai-input"
                placeholder="Ask about skills, projects, experience..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                disabled={loading}
              />
              <button className="ai-send" onClick={() => send()} disabled={!input.trim() || loading} aria-label="Send message">
                <i className="fas fa-paper-plane" aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
