import { useEffect, useRef } from 'react'

export default function NeuralCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    // Respect the user's reduced-motion preference — this canvas runs
    // continuously in the background on every page, so for someone who's
    // asked the OS for less motion (or just wants to save battery/CPU),
    // skip it entirely rather than rendering anyway.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    let paused = document.hidden

    let W = (canvas.width = window.innerWidth)
    let H = (canvas.height = window.innerHeight)

    const resize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', resize, { passive: true })

    // Pause the rAF loop entirely while the tab is backgrounded, instead
    // of redrawing 55 nodes' worth of physics + O(n²) connections every
    // frame for a canvas nobody can see.
    const onVisibility = () => {
      paused = document.hidden
      if (!paused) { animId = requestAnimationFrame(draw) }
    }
    document.addEventListener('visibilitychange', onVisibility)

    // Neural network nodes
    const nodes = Array.from({ length: 55 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.8 + 0.6,
      pulse: Math.random() * Math.PI * 2,
    }))

    let frame = 0

    function draw() {
      if (paused) return
      frame++
      ctx.clearRect(0, 0, W, H)

      // Move nodes
      nodes.forEach((n) => {
        n.x += n.vx
        n.y += n.vy
        n.pulse += 0.03
        if (n.x < 0) n.x = W
        if (n.x > W) n.x = 0
        if (n.y < 0) n.y = H
        if (n.y > H) n.y = 0
      })

      // Draw connections (neural network edges)
      nodes.forEach((a, i) => {
        nodes.slice(i + 1).forEach((b) => {
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < 130) {
            const alpha = (1 - d / 130) * 0.18
            // Pulse traveling along edge every 120 frames
            const t = (frame % 120) / 120
            const px = a.x + (b.x - a.x) * t
            const py = a.y + (b.y - a.y) * t

            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(129,140,248,${alpha})`
            ctx.lineWidth = 0.6
            ctx.stroke()

            // Signal pulse dot
            if (d < 100 && frame % 120 > 0 && frame % 120 < 30) {
              ctx.beginPath()
              ctx.arc(px, py, 1.5, 0, Math.PI * 2)
              ctx.fillStyle = `rgba(56,189,248,${alpha * 2})`
              ctx.fill()
            }
          }
        })
      })

      // Draw nodes
      nodes.forEach((n) => {
        const glow = (Math.sin(n.pulse) + 1) * 0.5
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r + glow * 0.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(56,189,248,${0.5 + glow * 0.3})`
        ctx.fill()
      })

      animId = requestAnimationFrame(draw)
    }
    if (!paused) draw()

    return () => {
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.28,
      }}
    />
  )
}
