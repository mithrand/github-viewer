import {
  Action,
  ActionType,
  ChangePageSizeAction,
  ChangeQueryAction,
  MoveFirstAction,
  MoveNextAction,
  MovePreviousAction,
  State,
} from './types'

export const moveFirst = (): MoveFirstAction => ({
  type: ActionType.moveFirst,
  payload: {},
})

export const movePrevious = (previousCursor: string): MovePreviousAction => ({
  type: ActionType.movePrevious,
  payload: { previousCursor },
})

export const moveNext = (nextCursor: string): MoveNextAction => ({
  type: ActionType.moveNext,
  payload: { nextCursor },
})

export const changeQuery = (query: string): ChangeQueryAction => ({
  type: ActionType.changeQuery,
  payload: { query },
})

export const changePageSize = (pageSize: number): ChangePageSizeAction => ({
  type: ActionType.changePageSize,
  payload: { pageSize },
})

export const RepositoriesReducer = (state: State, action: Action): State => {
  const { type, payload } = action
  switch (type) {
    case ActionType.changeQuery: {
      return {
        ...state,
        query: payload.query,
      }
    }
    case ActionType.changePageSize: {
      return {
        ...state,
        first: payload.pageSize,
        pageSize: payload.pageSize,
        last: null,
        before: null,
        after: null,
      }
    }
    case ActionType.moveFirst: {
      return {
        ...state,
        first: state.pageSize,
        last: null,
        before: null,
        after: null,
      }
    }
    case ActionType.moveNext: {
      return {
        ...state,
        after: payload.nextCursor,
        first: state.pageSize,
        last: null,
        before: null,
      }
    }
    case ActionType.movePrevious: {
      return {
        ...state,
        before: payload.previousCursor,
        last: state.pageSize,
        first: null,
        after: null,
      }
    }
    default: {
      return state
    }
  }
}
