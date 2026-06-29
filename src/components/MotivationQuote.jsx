import { useMemo } from 'react'
import { motion } from 'framer-motion'
import './MotivationQuote.css'

// A pool of motivational/tech quotes. Add or edit freely — one is picked
// at random every time this component mounts (i.e. on every page refresh).
const QUOTES = [
  { text: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
  { text: "The best way to learn data science is to do data science.", author: "Anonymous" },
  { text: "Data is the new oil, but insight is the engine.", author: "Anonymous" },
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
  { text: "Machine learning is the last invention humanity will ever need to make.", author: "Nick Bostrom" },
  { text: "Without data, you're just another person with an opinion.", author: "W. Edwards Deming" },
  { text: "It's not a bug, it's an undocumented feature.", author: "Anonymous" },
  { text: "Done is better than perfect.", author: "Sheryl Sandberg" },
  { text: "The expert in anything was once a beginner.", author: "Helen Hayes" },
]

// Picks one random quote. Module-scope randomness (called once per mount,
// not on every render) — see the useMemo below.
function getRandomQuote() {
  return QUOTES[Math.floor(Math.random() * QUOTES.length)]
}

export default function MotivationQuote() {
  // useMemo with an empty dependency array locks in ONE random quote for
  // the lifetime of this mount. Without it, every re-render (e.g. theme
  // toggle, window resize) would silently swap the quote mid-visit, which
  // would look like a bug rather than a feature. A genuinely new quote
  // still appears on every actual page refresh, since the whole app
  // remounts then.
  const quote = useMemo(() => getRandomQuote(), [])

  return (
    <section className="quote-strip" aria-label="Motivational quote">
      <div className="container">
        <motion.blockquote
          className="quote-box"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <i className="fas fa-quote-left quote-mark" aria-hidden="true" />
          <p className="quote-text">{quote.text}</p>
          <cite className="quote-author">— {quote.author}</cite>
        </motion.blockquote>
      </div>
    </section>
  )
}
