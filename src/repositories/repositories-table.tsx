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
  Skeleton,
} from '@chakra-ui/react'
import useRepositories from './use-repositories'
import { useRepositoriesState } from './repositories-provider'
import { Repository } from './types'

const TableRow = ({
  repository: { url, name, stargazerCount, forkCount },
  index,
}: {
  repository: Repository
  index: number
}) => (
  <Tr data-testid={`repository-${index}`}>
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
)

const TableSkeleton = () => {
  const { pageSize } = useRepositoriesState()

  return (
    <>
      {Array.from({ length: pageSize }).map((_, index) => (
        <Tr
          key={`skeleton-${index + 1}`}
          data-testid={`repository-skeleton-${index}`}
        >
          <Td aria-label="name">
            <Skeleton height="20px" />
          </Td>
          <Td aria-label="stars">
            <Skeleton height="20px" />
          </Td>
          <Td aria-label="forks">
            <Skeleton height="20px" />
          </Td>
        </Tr>
      ))}
    </>
  )
}

const RepositoriesTable = () => {
  const { query, pageSize } = useRepositoriesState()
  const { repositories, isFetching } = useRepositories(query, pageSize)

  return (
    <TableContainer aria-label="repositories">
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
          {isFetching ? (
            <TableSkeleton />
          ) : (
            repositories.map((repository, index) => (
              <TableRow
                key={repository.url}
                repository={repository}
                index={index}
              />
            ))
          )}
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
}

export default RepositoriesTable
