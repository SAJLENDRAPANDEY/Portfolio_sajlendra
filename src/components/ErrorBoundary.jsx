import { Component } from 'react'
import './ErrorBoundary.css'

// Catches JS errors anywhere in the component tree below it and shows a
// friendly fallback instead of a blank white screen. Without this, a
// single uncaught error in any page (a bad project id, a failed render,
// a third-party script throwing, etc.) crashes the ENTIRE React app —
// the navbar, footer, AI assistant, everything disappears.
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    // Hook up Sentry / LogRocket / etc. here later if you add one.
    console.error('Uncaught error in component tree:', error, info)
  }

  handleReset = () => {
    this.setState({ hasError: false })
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="eb-wrap" role="alert">
          <div className="eb-icon"><i className="fas fa-triangle-exclamation" /></div>
          <h2 className="eb-title">Something went wrong</h2>
          <p className="eb-desc">
            An unexpected error occurred while rendering this page. You can try
            going back to the homepage.
          </p>
          <button className="btn-primary" onClick={this.handleReset}>
            <i className="fas fa-house" /> Back to Home
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
