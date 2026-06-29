import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { CMD_PALETTE_ITEMS } from '../utils/constants'
import { useTheme } from '../context/ThemeContext'
import './CommandPalette.css'

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const inputRef = useRef(null)
  const navigate = useNavigate()
  const { toggleTheme } = useTheme()

  const filtered = CMD_PALETTE_ITEMS.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  )

  // Ctrl+K / Cmd+K to open
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
        setQuery('')
        setSelected(0)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Focus input on open
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50)
  }, [open])

  // Arrow key navigation
  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelected((s) => Math.min(s + 1, filtered.length - 1)) }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setSelected((s) => Math.max(s - 1, 0)) }
    if (e.key === 'Enter')     { e.preventDefault(); runItem(filtered[selected]) }
  }

  const runItem = (item) => {
    if (!item) return
    setOpen(false)
    if (item.type === 'route')    navigate(item.action)
    if (item.type === 'external') window.open(item.action, '_blank', 'noreferrer')
    if (item.type === 'download') { const a = document.createElement('a'); a.href = item.action; a.download = 'Sajlendra_Pandey_Resume.pdf'; a.click() }
    if (item.type === 'action' && item.action === 'theme') toggleTheme()
  }

  if (!open) return (
    <button type="button" className="cmd-hint" onClick={() => setOpen(true)} title="Open Command Palette" aria-label="Open command palette (Ctrl+K)">
      <i className="fas fa-terminal" aria-hidden="true" />
      <span aria-hidden="true">⌘K</span>
    </button>
  )

  return (
    <div className="cmd-overlay" onClick={() => setOpen(false)} role="presentation">
      <div className="cmd-panel" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Command palette">
        <div className="cmd-search">
          <i className="fas fa-search cmd-icon" aria-hidden="true" />
          <label htmlFor="cmd-search-input" className="sr-only">Search commands, pages, and links</label>
          <input
            id="cmd-search-input"
            ref={inputRef}
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelected(0) }}
            onKeyDown={onKeyDown}
            placeholder="Search commands, pages, links..."
            className="cmd-input"
            autoComplete="off"
            role="combobox"
            aria-expanded="true"
            aria-controls="cmd-results-list"
            aria-activedescendant={filtered[selected] ? `cmd-item-${selected}` : undefined}
          />
          <button type="button" className="cmd-esc" onClick={() => setOpen(false)} aria-label="Close command palette">ESC</button>
        </div>
        <div className="cmd-results" id="cmd-results-list" role="listbox">
          {filtered.length === 0 && <div className="cmd-empty">No results for "{query}"</div>}
          {filtered.map((item, i) => (
            <div
              key={item.label}
              id={`cmd-item-${i}`}
              role="option"
              aria-selected={i === selected}
              className={`cmd-item${i === selected ? ' active' : ''}`}
              onClick={() => runItem(item)}
              onMouseEnter={() => setSelected(i)}
            >
              <i className={`fas ${item.icon} cmd-item-icon`} aria-hidden="true" />
              <span>{item.label}</span>
              {item.type === 'external' && <i className="fas fa-arrow-up-right-from-square cmd-item-ext" aria-hidden="true" />}
              {item.type === 'route'    && <kbd className="cmd-item-key">Enter</kbd>}
            </div>
          ))}
        </div>
        <div className="cmd-footer">
          <span><kbd>↑↓</kbd> Navigate</span>
          <span><kbd>↵</kbd> Select</span>
          <span><kbd>ESC</kbd> Close</span>
        </div>
      </div>
    </div>
  )
}
