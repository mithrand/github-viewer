import React from 'react'
import { Container } from '@chakra-ui/react'

import RepositorySearch from './repositories-search'
import RepositoriesTable from './repositories-table'
import RepositoriesPagination from './repositories-pagination'
import { RepositoryProvider } from './repositories-provider'

const Repositories = () => (
  <RepositoryProvider>
    <Container maxW="50%">
      <RepositorySearch />
      <RepositoriesPagination />
      <RepositoriesTable />
    </Container>
  </RepositoryProvider>
)

export default Repositories
