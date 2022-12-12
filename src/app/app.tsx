import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'

import GitHubGraphQLProvider from '../api/github-graphql-provider'
import Repositories, { RepositoryProvider } from '../repositories'
import ErrorBoundary from './error-boundary'

const App = () => (
  <ErrorBoundary>
    <ChakraProvider>
      <GitHubGraphQLProvider>
        <RepositoryProvider>
          <Repositories />
        </RepositoryProvider>
      </GitHubGraphQLProvider>
    </ChakraProvider>
  </ErrorBoundary>
)

export default App
