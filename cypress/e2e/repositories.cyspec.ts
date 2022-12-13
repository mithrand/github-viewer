import * as actions from './repositories.actions'

describe('Githubs repos', () => {
  beforeEach(() => {
    actions.visitPage()
  })

  it('Fetchs repository data', () => {
    actions.type('react testing library{enter}')
    actions.getByTestId('repository-0').within(() => {
      actions.textShouldBeVisible('react-testing-library')
      actions.textShouldBeVisible('🌟')
      actions.textShouldBeVisible('🍴')
    })
  })

  it('Navigate to next page', () => {
    actions.type('react testing library{enter}')
    actions.getByLabel('next page').click()
    actions.getByTestId('repository-0').within(() => {
      actions.textShouldBeVisible('🌟')
      actions.textShouldBeVisible('🍴')
    })
  })

  it('Navigate to previous page', () => {
    actions.type('react testing library{enter}')
    actions.getByLabel('next page').click()
    actions.getByTestId('repository-0').within(() => {
      actions.textShouldBeVisible('🌟')
      actions.textShouldBeVisible('🍴')
    })
    actions.getByLabel('previous page').click()
    actions.textShouldBeVisible('react-testing-library')
    actions.textShouldBeVisible('🌟')
    actions.textShouldBeVisible('🍴')
  })
})
