import { gql, useQuery } from 'urql'
import { useRepositoriesState } from './repositories-provider'

const defaultSearchTerm = 'react'

const GET_REPOSITORIES = gql`
  query GetRepositories($query: String!, $first: Int!) {
    search(first: $first, type: REPOSITORY, query: $query) {
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      nodes {
        ... on Repository {
          name
          url
          stargazerCount
          forkCount
        }
      }
    }
  }
`

type GetRepositoriesQuery = {
  search: {
    pageInfo: {
      endCursor?: string
      hasNextPage: boolean
      hasPreviousPage: boolean
      startCursor?: string
    }
    nodes: Array<{
      name: string
      url: string
      stargazerCount: number
      forkCount: number
    }>
  }
}

const useRepositories = () => {
  const { query, pageSize } = useRepositoriesState()
  const [{ data, error, fetching }] = useQuery<GetRepositoriesQuery>({
    query: GET_REPOSITORIES,
    variables: { query: query || defaultSearchTerm, first: pageSize },
  })

  if (error) {
    throw new Error(`GetRepositoriesQuery - ${error.message}`)
  }

  return {
    repositories: data?.search.nodes || [],
    isFetching: fetching,
  }
}

export default useRepositories
