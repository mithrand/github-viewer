import { RequestHandler, graphql } from 'msw'
import repositories from '../mocks/repositoires'

const getRepositoriesQueryhandler = graphql.query(
  'GetRepositories',
  (req, res, ctx) => {
    const { first, query } = req.variables
    return res(
      ctx.data({
        search: {
          nodes: repositories
            .filter(({ name }) =>
              name.toLowerCase().includes(query.toLowerCase()),
            )
            .slice(0, first),
        },
      }),
    )
  },
)

const handlers: Array<RequestHandler> = [getRepositoriesQueryhandler]

export default handlers
