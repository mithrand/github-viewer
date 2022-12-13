import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useReducer,
} from 'react'
import {
  changePageSize,
  changeQuery,
  moveFirst,
  moveNext,
  movePrevious,
  RepositoriesReducer,
} from './repositories-reducer'
import { State } from './types'

const noop = () => {}

const initialState: State = {
  query: 'react',
  before: null,
  after: null,
  first: 10,
  last: null,
  pageSize: 10,
}

const StateContext = createContext<State>(initialState)

type Actions = {
  changeQuery(query: string): void
  changePageSize(pageSize: number): void
  moveFirst(): void
  moveNext(nextCursor: string): void
  movePrevious(previousCursor: string): void
}
const ActionsContext = createContext<Actions>({
  changeQuery: noop,
  changePageSize: noop,
  moveFirst: noop,
  moveNext: noop,
  movePrevious: noop,
})

type Props = {
  children: ReactNode
}

export const RepositoryProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(RepositoriesReducer, initialState)

  const actions = useMemo(
    () => ({
      changeQuery: (query: string) => dispatch(changeQuery(query)),
      changePageSize: (pageSize: number) => dispatch(changePageSize(pageSize)),
      moveFirst: () => dispatch(moveFirst()),
      moveNext: (nextCursor: string) => dispatch(moveNext(nextCursor)),
      movePrevious: (previousCursor: string) =>
        dispatch(movePrevious(previousCursor)),
    }),
    [dispatch],
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
