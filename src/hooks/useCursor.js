import { useEffect } from 'react'

export function useCursor() {
  useEffect(() => {
    const dot = document.getElementById('cursor-dot')
    const ring = document.getElementById('cursor-ring')
    if (!dot || !ring) return

    let mx = 0, my = 0, rx = 0, ry = 0

    const move = (e) => {
      mx = e.clientX
      my = e.clientY
      dot.style.transform = `translate(${mx - 4}px, ${my - 4}px)`
    }

    const lerp = () => {
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      ring.style.transform = `translate(${rx - 20}px, ${ry - 20}px)`
      requestAnimationFrame(lerp)
    }

    const hover = () => ring.classList.add('hovered')
    const leave = () => ring.classList.remove('hovered')

    window.addEventListener('mousemove', move)
    const links = document.querySelectorAll('a, button, [data-hover]')
    links.forEach((el) => { el.addEventListener('mouseenter', hover); el.addEventListener('mouseleave', leave) })

    const id = requestAnimationFrame(lerp)
    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(id)
    }
  }, [])
}
