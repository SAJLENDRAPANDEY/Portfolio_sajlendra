import { useState, useEffect, useCallback } from 'react'

export function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  const [scrolled, setScrolled] = useState(false)

  const onScroll = useCallback(() => {
    const y = window.scrollY
    setScrolled(y > 20)
    const max = document.documentElement.scrollHeight - window.innerHeight
    setProgress(max > 0 ? (y / max) * 100 : 0)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [onScroll])

  return { progress, scrolled }
}

export function useScrollTop() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return visible
}
