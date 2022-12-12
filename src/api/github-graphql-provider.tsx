import React, { ReactNode } from 'react'
import { createClient, Provider } from 'urql'
import config from '../config'

const client = createClient({
  url: config.graphqlUrl,
  fetchOptions: {
    headers: {
      authorization: `Bearer ${config.githubToken}`,
    },
  },
})

const GitHubGraphQLProvider = ({ children }: { children: ReactNode }) => (
  <Provider value={client}>{children}</Provider>
)

export default GitHubGraphQLProvider
