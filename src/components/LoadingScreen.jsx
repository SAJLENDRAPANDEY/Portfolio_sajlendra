import { useEffect, useState } from 'react'
import './LoadingScreen.css'

const STAGES = ['S', 'Sa', 'Saj', 'Sajl', 'Sajle', 'Sajlendra', 'Sajlendra Pandey']

export default function LoadingScreen({ onDone }) {
  const [stage, setStage] = useState(0)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    let i = 0
    const iv = setInterval(() => {
      i++
      setStage(i)
      if (i >= STAGES.length - 1) {
        clearInterval(iv)
        setTimeout(() => {
          setExiting(true)
          setTimeout(onDone, 500)
        }, 700)
      }
    }, 160)
    return () => clearInterval(iv)
  }, [onDone])

  return (
    <div className={`loading-screen${exiting ? ' exiting' : ''}`} role="status" aria-live="polite">
      <div className="loading-inner">
        <div className="loading-name">
          {STAGES[stage]}<span className="loading-cursor" aria-hidden="true">_</span>
        </div>
        <div className="loading-bar" role="progressbar" aria-valuenow={Math.round(((stage + 1) / STAGES.length) * 100)} aria-valuemin={0} aria-valuemax={100} aria-label="Loading portfolio">
          <div
            className="loading-fill"
            style={{ width: `${((stage + 1) / STAGES.length) * 100}%` }}
          />
        </div>
        <div className="loading-sub">Initializing portfolio...</div>
      </div>
    </div>
  )
}
