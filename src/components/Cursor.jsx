import { useEffect } from 'react'
import './Cursor.css'

const HOVER_SELECTOR = 'a, button, [data-hover], input, textarea, select, [role="button"]'

export default function Cursor() {
  useEffect(() => {
    // Skip entirely on touch devices — a custom cursor has no meaning there
    // and the extra listeners just cost battery/perf for nothing.
    if (window.matchMedia('(pointer: coarse)').matches) return

    const dot  = document.getElementById('cursor-dot')
    const ring = document.getElementById('cursor-ring')
    if (!dot || !ring) return

    let mx = -100, my = -100, rx = -100, ry = -100, rafId

    const onMove = (e) => {
      mx = e.clientX; my = e.clientY
      dot.style.left = mx + 'px'
      dot.style.top  = my + 'px'
    }

    const loop = () => {
      rx += (mx - rx) * 0.13
      ry += (my - ry) * 0.13
      ring.style.left = rx + 'px'
      ring.style.top  = ry + 'px'
      rafId = requestAnimationFrame(loop)
    }

    // Event delegation instead of querySelectorAll + per-element listeners:
    // the previous version only found elements present at mount, so any
    // link/button rendered afterward (i.e. nearly everything, since every
    // route is lazy-loaded) silently never got the hover effect, and its
    // listeners were never removed on unmount either. Delegating to
    // window covers current AND future elements with two listeners total.
    const onOver = (e) => {
      if (e.target.closest(HOVER_SELECTOR)) {
        ring.classList.add('hovered'); dot.classList.add('hovered')
      }
    }
    const onOut = (e) => {
      if (e.target.closest(HOVER_SELECTOR)) {
        ring.classList.remove('hovered'); dot.classList.remove('hovered')
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    window.addEventListener('mouseout', onOut, { passive: true })

    rafId = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mouseout', onOut)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div id="cursor-ring" className="cursor-ring" aria-hidden="true" />
      <div id="cursor-dot"  className="cursor-dot"  aria-hidden="true" />
    </>
  )
}
