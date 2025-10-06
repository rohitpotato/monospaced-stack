// Example React Error Boundary integration with MonitorBoi
import type { ErrorInfo, ReactNode } from 'react'
import type MonitorBoi from './index'
import React, { Component } from 'react'

interface Props {
  children: ReactNode
  monitorBoi: MonitorBoi
}

interface State {
  hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Track the error with MonitorBoi
    this.props.monitorBoi.trackCustomError(error, { componentStack: errorInfo.componentStack || '' })

    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          <h2>Something went wrong.</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

// Usage example:
/*
import MonitorBoi from './monitor-boi'
import ErrorBoundary from './error-boundary-example'

const monitorBoi = new MonitorBoi({
  endpoint: 'https://your-backend.com'
})

function App() {
  return (
    <ErrorBoundary monitorBoi={monitorBoi}>
      <YourApp />
    </ErrorBoundary>
  )
}
*/
