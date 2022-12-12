import { gql, useQuery } from 'urql'

const defaultSearchTerm = 'react'

const GET_REPOSITORIES = gql`
  query GetRepositories($query: String!, $first: Int!) {
    search(first: $first, type: REPOSITORY, query: $query) {
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
    nodes: Array<{
      name: string
      url: string
      stargazerCount: number
      forkCount: number
    }>
  }
}

const useRepositories = (query: string, first: number) => {
  const [{ data, error, fetching }] = useQuery<GetRepositoriesQuery>({
    query: GET_REPOSITORIES,
    variables: { query: query || defaultSearchTerm, first },
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
