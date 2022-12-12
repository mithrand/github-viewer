import React from 'react'
import {
  Table,
  TableCaption,
  TableContainer,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Link,
  Text,
} from '@chakra-ui/react'

import { Repository } from './types'

type Props = {
  repositories: Repository[]
}

const RepositoriesTable = ({ repositories }: Props) => (
  <TableContainer aria-label="repositories" maxW="xl">
    <Table variant="striped">
      <TableCaption>Github repository view</TableCaption>
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th isNumeric>Stars</Th>
          <Th isNumeric> Forks</Th>
        </Tr>
      </Thead>
      <Tbody>
        {repositories.map(({ name, url, forkCount, stargazerCount }, index) => (
          <Tr key={url} data-testid={`repository-${index}`}>
            <Td aria-label="name">
              <Link href={url}>{name}</Link>
            </Td>
            <Td aria-label="stars">
              <Text>🌟 {stargazerCount.toLocaleString()}</Text>
            </Td>
            <Td aria-label="forks">
              <Text>🍴 {forkCount.toLocaleString()}</Text>
            </Td>
          </Tr>
        ))}
      </Tbody>
      <Tfoot>
        <Tr>
          <Th>Name</Th>
          <Th isNumeric>Stars</Th>
          <Th isNumeric> Forks</Th>
        </Tr>
      </Tfoot>
    </Table>
  </TableContainer>
)

export default RepositoriesTable
