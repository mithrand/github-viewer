import { RequestHandler, graphql } from 'msw'
import { Repository } from '../../src/repositories/types'
import { GetRepositoriesQuery } from '../../src/repositories/use-repositories-query'
import repositories from '../mocks/repositoires'

const getRepositoriesQueryhandler = graphql.query(
  'GetRepositories',
  (req, res, ctx) => {
    const { first, query, last, before, after } = req.variables

    const nodesByQuery = repositories.filter(({ name }) =>
      name.toLowerCase().includes(query.toLowerCase()),
    )
    let nodes: Repository[]

    if (after) {
      const afterElementPosition = repositories.findIndex(
        (rep) => rep.url === after,
      )
      nodes = nodesByQuery.slice(
        afterElementPosition + 1,
        afterElementPosition + first + 1,
      )
    } else if (before) {
      const beforeElementPosition = repositories.findIndex(
        (rep) => rep.url === before,
      )
      nodes = nodesByQuery.slice(
        beforeElementPosition - last - 2,
        beforeElementPosition,
      )
    } else {
      nodes = nodesByQuery.slice(0, first)
    }

    const endCursor = nodes[nodes.length - 1]?.url || ''
    const startCursor = nodes[0]?.url || ''
    const hasNextPage =
      nodesByQuery.findIndex((repo) => repo.url === endCursor) !==
      repositories.length - 1
    const hasPreviousPage =
      nodesByQuery.findIndex((repo) => repo.url === startCursor) !== 0

    const reponseQuery: GetRepositoriesQuery = {
      search: {
        pageInfo: {
          endCursor,
          hasNextPage,
          hasPreviousPage,
          startCursor,
        },
        nodes,
      },
    }
    return res(ctx.data(reponseQuery))
  },
)

const handlers: Array<RequestHandler> = [getRepositoriesQueryhandler]

export default handlers
