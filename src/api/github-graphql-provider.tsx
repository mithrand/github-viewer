import React, { ReactNode } from 'react'
import { createClient, Provider } from 'urql'
import config from '../config'

export const client = createClient({
  url: config.graphqlUrl,
  fetchOptions: {
    headers: {
      authorization: `Bearer ${config.githubToken}`,
    },
  },
  requestPolicy: 'cache-and-network',
})

const GitHubGraphQLProvider = ({ children }: { children: ReactNode }) => (
  <Provider value={client}>{children}</Provider>
)

export default GitHubGraphQLProvider
