import React from 'react'
import RepositoriesTable from './repositories-table'
import useRepositories from './use-repositories'

const Repositories = () => {
  const repositories = useRepositories('react', 100)

  if (!repositories) {
    return <div>Loading</div>
  }

  return <RepositoriesTable repositories={repositories} />
}

export default Repositories
