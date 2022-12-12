import React from 'react'

import GitHubGraphQLProvider from '../api/github-graphql-provider'
import Repositories from '../repositories/repositories'
import ErrorBoundary from './error-boundary'

const App = () => (
  <ErrorBoundary>
    <GitHubGraphQLProvider>
      <Repositories />
    </GitHubGraphQLProvider>
  </ErrorBoundary>
)

export default App
