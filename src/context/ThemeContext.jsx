import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Persist theme across sessions
    return localStorage.getItem('sp-theme') || 'dark'
  })

  useEffect(() => {
    localStorage.setItem('sp-theme', theme)
    document.documentElement.className = theme === 'light' ? 'light' : ''
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
