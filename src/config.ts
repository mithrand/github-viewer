export type Config = {
  url: string
}

const config = {
  graphqlUrl:
    process.env.REACT_APP_GRAPHQL_URL || 'https://api.github.com/graphql',
  githubToken: process.env.REACT_APP_GITHUB_TOKEN,
}

export default config
