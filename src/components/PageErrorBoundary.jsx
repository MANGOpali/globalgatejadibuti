import { Component } from 'react'
import { isChunkLoadError, reloadOnce } from '../reload'

// Never show a blank white page: reload once for stale code after a deploy, otherwise show a friendly message.
export default class PageErrorBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error) {
    if (isChunkLoadError(error)) reloadOnce()
  }

  render() {
    if (!this.state.error) return this.props.children
    return (
      <section className="nf" role="alert">
        <div className="copy">
          <span className="mono">SOMETHING WENT WRONG</span>
          <h1 className="h2">This page didn't load properly.</h1>
          <p className="lead">The site may have just been updated. Reloading usually fixes it.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            <button type="button" className="btn btn-red" onClick={() => window.location.reload()}>Reload page</button>
            <a href="/" className="btn btn-line">Go to home page</a>
          </div>
        </div>
      </section>
    )
  }
}
