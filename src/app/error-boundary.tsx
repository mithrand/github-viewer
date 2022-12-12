import React, { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  error: null | Error
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { error: null }
  }

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { error }
  }

  public componentDidCatch(error: Error) {
    console.warn('Uncaught error:', error.message)
  }

  public render() {
    const { error } = this.state
    const { children } = this.props

    if (error) {
      return <h1>there was an error: {error.message}</h1>
    }

    return children
  }
}

export default ErrorBoundary
