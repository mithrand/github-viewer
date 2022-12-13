import { gql, useQuery } from 'urql'
import { useRepositoriesState } from './repositories-provider'

const defaultSearchTerm = 'react'

const emptyPageInfo = {
  endCursor: null,
  hasNextPage: false,
  hasPreviousPage: false,
  startCursor: null,
}

const GET_REPOSITORIES = gql`
  query GetRepositories(
    $query: String!
    $first: Int
    $last: Int
    $before: String
    $after: String
  ) {
    search(
      type: REPOSITORY
      query: $query
      first: $first
      last: $last
      before: $before
      after: $after
    ) {
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      nodes {
        ... on Repository {
          id
          name
          url
          stargazerCount
          forkCount
        }
      }
    }
  }
`

export type GetRepositoriesQuery = {
  search: {
    pageInfo: {
      endCursor: string | null
      hasNextPage: boolean
      hasPreviousPage: boolean
      startCursor: string | null
    }
    nodes: Array<{
      name: string
      url: string
      stargazerCount: number
      forkCount: number
    }>
  }
}

const useRepositoriesQuery = () => {
  const { query, last, first, before, after } = useRepositoriesState()
  const [{ data, error, fetching }] = useQuery<GetRepositoriesQuery>({
    query: GET_REPOSITORIES,
    variables: {
      query: query || defaultSearchTerm,
      first,
      last,
      before,
      after,
    },
  })

  if (error) {
    throw new Error(`GetRepositoriesQuery - ${error.message}`)
  }

  return {
    pageInfo: data?.search.pageInfo || emptyPageInfo,
    repositories: data?.search.nodes || [],
    isFetching: fetching,
  }
}

export default useRepositoriesQuery
