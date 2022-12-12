import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'

import GitHubGraphQLProvider from '../api/github-graphql-provider'
import Repositories from '../repositories/repositories'
import ErrorBoundary from './error-boundary'

const App = () => (
  <ChakraProvider>
    <ErrorBoundary>
      <GitHubGraphQLProvider>
        <Repositories />
      </GitHubGraphQLProvider>
    </ErrorBoundary>
  </ChakraProvider>
)

export default App
