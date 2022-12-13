import React from 'react'

import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons'
import { Flex, IconButton, Select } from '@chakra-ui/react'
import {
  useRepositoriesActions,
  useRepositoriesState,
} from './repositories-provider'

import useRepositoriesQuery from './use-repositories-query'

const RepositoriesPagination = () => {
  const { pageSize } = useRepositoriesState()
  const { changePageSize, moveFirst, moveNext, movePrevious } =
    useRepositoriesActions()
  const {
    pageInfo: { hasNextPage, hasPreviousPage, endCursor, startCursor },
  } = useRepositoriesQuery()

  return (
    <Flex justifyContent="space-between" m={4} alignItems="center">
      <Flex>
        <IconButton
          aria-label="first page"
          onClick={() => {
            moveFirst()
          }}
          isDisabled={!hasPreviousPage}
          icon={<ArrowLeftIcon h={3} w={3} />}
          mr={4}
        />
        <IconButton
          aria-label="previous page"
          onClick={() => {
            if (startCursor) movePrevious(startCursor)
          }}
          isDisabled={!hasPreviousPage}
          icon={<ChevronLeftIcon h={6} w={6} />}
          mr={4}
        />
      </Flex>
      <Flex alignItems="center">
        <Select
          data-testid="pageSizeSelect"
          w={32}
          value={pageSize}
          onChange={(e) => {
            changePageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50, 100].map((size: number) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </Select>
      </Flex>

      <Flex>
        <IconButton
          aria-label="next page"
          onClick={() => {
            if (endCursor) {
              moveNext(endCursor)
            }
          }}
          isDisabled={!hasNextPage}
          icon={<ChevronRightIcon h={6} w={6} />}
          mr={4}
        />
      </Flex>
    </Flex>
  )
}

export default RepositoriesPagination
