import { gql, useQuery } from 'urql'
import { Repository } from './types'

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

const useRepositories = (query: string, first: number): Repository[] | null => {
  const [{ data, error }] = useQuery<GetRepositoriesQuery>({
    query: GET_REPOSITORIES,
    variables: { query, first },
  })

  if (error) {
    throw new Error(`GetRepositoriesQuery - ${error.message}`)
  }

  return data?.search.nodes || null
}

export default useRepositories
