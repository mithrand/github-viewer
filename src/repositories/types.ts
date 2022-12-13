export type Repository = {
  name: string
  url: string
  stargazerCount: number
  forkCount: number
}

export enum ActionType {
  moveFirst = 'moveFirst',
  movePrevious = 'movePrevious',
  moveNext = 'moveNext',
  changeQuery = 'changeQuery',
  changePageSize = 'changePageSize',
}

export type State = {
  query: string
  before: string | null
  after: string | null
  first: number | null
  last: number | null
  pageSize: number
}

export type MoveFirstAction = {
  type: ActionType.moveFirst
  payload: {}
}

export type MovePreviousAction = {
  type: ActionType.movePrevious
  payload: { previousCursor: string }
}

export type MoveNextAction = {
  type: ActionType.moveNext
  payload: { nextCursor: string }
}

export type ChangeQueryAction = {
  type: ActionType.changeQuery
  payload: { query: string }
}

export type ChangePageSizeAction = {
  type: ActionType.changePageSize
  payload: { pageSize: number }
}

export type Action =
  | MoveFirstAction
  | MovePreviousAction
  | MoveNextAction
  | ChangeQueryAction
  | ChangePageSizeAction
