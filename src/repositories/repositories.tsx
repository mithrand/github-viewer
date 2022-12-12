import React from 'react'
import { Container } from '@chakra-ui/react'

import RepositorySearch from './repositories-search'
import RepositoriesTable from './repositories-table'

const Repositories = () => (
  <Container maxW="50%">
    <RepositorySearch />
    <RepositoriesTable />
  </Container>
)

export default Repositories
