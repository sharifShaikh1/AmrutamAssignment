import React from 'react'

interface ErrorBoundaryProps {
  children: React.ReactNode
  onReset?: () => void
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error | null
  errorInfo?: React.ErrorInfo | null
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
   
    this.setState({ error, errorInfo })
    
  }

  reset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
    if (this.props.onReset) this.props.onReset()
  }

  renderFallback() {
    const { error, errorInfo } = this.state

    return (
      <div className="flex items-center justify-center h-full p-6">
        <div className="max-w-2xl w-full bg-white rounded-lg border p-6 shadow-sm text-sm">
          <h2 className="text-lg font-semibold text-red-600 mb-2">Something went wrong</h2>
          <p className="text-slate-600 mb-4">An unexpected error occurred. You can reload the page or try again.</p>

          <div className="flex gap-2 mb-4">
            <button
              className="btn primary"
              onClick={() => window.location.reload()}
            >
              Reload page
            </button>
            <button
              className="btn outline"
              onClick={this.reset}
            >
              Try again
            </button>
          </div>

          {error && (
            <details className="text-xs text-muted mt-2 whitespace-pre-wrap border-t pt-3">
              <summary className="cursor-pointer text-slate-500">Error details</summary>
              <div className="mt-2 text-xs text-slate-700">
                <div><strong>Message:</strong> {error.message}</div>
                {errorInfo?.componentStack && (
                  <pre className="mt-2 text-xs text-slate-600">{errorInfo.componentStack}</pre>
                )}
              </div>
            </details>
          )}
        </div>
      </div>
    )
  }

  render() {
    if (this.state.hasError) {
      return this.renderFallback()
    }
    return this.props.children
  }
}

export default ErrorBoundary
