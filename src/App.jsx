import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Navbar         from './components/Navbar'
import Footer         from './components/Footer'
import ScrollTop      from './components/ScrollTop'
import NeuralCanvas   from './components/NeuralCanvas'
import Cursor         from './components/Cursor'
import CommandPalette from './components/CommandPalette'
import LoadingScreen  from './components/LoadingScreen'
import AIAssistant    from './components/AIAssistant'
import ErrorBoundary  from './components/ErrorBoundary'
import AppRoutes      from './routes/AppRoutes'
import { useState }   from 'react'

export default function App() {
  const [loading, setLoading] = useState(true)

  if (loading) return <LoadingScreen onDone={() => setLoading(false)} />

  return (
    <BrowserRouter>
      <ThemeProvider>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <Cursor />
        <NeuralCanvas />
        <Navbar />
        <main id="main-content">
          <ErrorBoundary>
            <AppRoutes />
          </ErrorBoundary>
        </main>
        <Footer />
        <ScrollTop />
        <CommandPalette />
        <AIAssistant />
      </ThemeProvider>
    </BrowserRouter>
  )
}
