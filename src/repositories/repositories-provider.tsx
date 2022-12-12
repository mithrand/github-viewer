import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react'

const noop = () => {}

type State = {
  query: string
  pageSize: number
  currentPage: number
}

const StateContext = createContext<State>({
  query: 'react',
  pageSize: 100,
  currentPage: 0,
})

type Actions = {
  setQuery(query: string): void
  setPageSize(pageSize: number): void
  setCurrentPage(currentPage: number): void
}
const ActionsContext = createContext<Actions>({
  setQuery: noop,
  setPageSize: noop,
  setCurrentPage: noop,
})

type Props = {
  children: ReactNode
}

export const RepositoryProvider = ({ children }: Props) => {
  const [query, setQuery] = useState('')
  const [pageSize, setPageSize] = useState(100)
  const [currentPage, setCurrentPage] = useState(1)

  const state = useMemo(
    () => ({ query, pageSize, currentPage }),
    [query, pageSize, currentPage],
  )
  const actions = useMemo(
    () => ({
      setQuery,
      setPageSize,
      setCurrentPage,
    }),
    [],
  )

  return (
    <StateContext.Provider value={state}>
      <ActionsContext.Provider value={actions}>
        {children}
      </ActionsContext.Provider>
    </StateContext.Provider>
  )
}

export const useRepositoriesActions = () => useContext(ActionsContext)

export const useRepositoriesState = () => useContext(StateContext)
