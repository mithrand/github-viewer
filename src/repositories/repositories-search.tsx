import React, { FormEventHandler, useState } from 'react'
import { Input, Button, Flex, Spacer } from '@chakra-ui/react'
import { useRepositoriesActions } from './repositories-provider'

const RepositorySearch = () => {
  const { setQuery } = useRepositoriesActions()
  const [searchText, setSearchText] = useState('')

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (searchText !== '') {
      setSearchText('')
      setQuery(searchText)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Flex minWidth="max-content" alignItems="center" gap="2">
        <Input
          aria-label="search"
          placeholder="enter your search term for example react"
          autoFocus
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <Spacer />
        <Button type="submit">Search</Button>
      </Flex>
    </form>
  )
}

export default RepositorySearch
