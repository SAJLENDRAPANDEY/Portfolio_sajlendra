/** Animate a number from 0 to target over duration ms */
export function animateCount(el, target, duration = 1500) {
  if (!el) return
  const start = performance.now()
  const isNum = /^\d+$/.test(String(target).replace(/[^0-9]/g, ''))
  const suffix = String(target).replace(/[0-9]/g, '')
  const num = parseInt(String(target).replace(/[^0-9]/g, ''), 10)

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    el.textContent = Math.floor(eased * num) + suffix
    if (progress < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

/** Truncate text to maxLen chars */
export function truncate(str, maxLen = 100) {
  return str.length > maxLen ? str.slice(0, maxLen) + '…' : str
}

/** Smooth scroll to element by id */
export function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/** Format ISO date string */
export function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })
}
