import React from 'react'
import useRepositories from './use-repositories'

const Repositories = () => {
  const repositories = useRepositories('react', 100)

  if (!repositories) {
    return <div>Loading</div>
  }

  return (
    <ul aria-label="repositories">
      {repositories.map((repo) => (
        <li key={repo.url}>
          {repo.name} - {repo.url} - {repo.forkCount} - {repo.stargazerCount}
        </li>
      ))}
    </ul>
  )
}

export default Repositories
