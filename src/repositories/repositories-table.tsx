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
  Center,
  VStack,
} from '@chakra-ui/react'
import useRepositoriesQuery from './use-repositories-query'
import { useRepositoriesState } from './repositories-provider'
import { Repository } from './types'

type TableRowsProps = { repositories: Repository[] }

const TableRows = ({ repositories }: TableRowsProps) => (
  <>
    {repositories.map(({ name, url, stargazerCount, forkCount }, index) => (
      <Tr aria-label="repository" key={url} data-testid={`repository-${index}`}>
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
  </>
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

const TableEmpty = () => (
  <Tr>
    <Td aria-label="name" colSpan={3}>
      <Center h="250px">
        <VStack>
          <Text>No repositories are found.</Text>
          <Text>
            Please use the search box at the top to look for repositories
          </Text>
        </VStack>
      </Center>
    </Td>
  </Tr>
)

const RepositoriesTable = () => {
  const { repositories, isFetching } = useRepositoriesQuery()

  const getContent = () => {
    if (isFetching) {
      return <TableSkeleton />
    }
    if (repositories.length === 0) {
      return <TableEmpty />
    }

    return <TableRows repositories={repositories} />
  }

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
        <Tbody>{getContent()}</Tbody>
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
