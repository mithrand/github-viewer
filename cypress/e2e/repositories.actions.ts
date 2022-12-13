export const visitPage = () => cy.visit('/')
export const getTextInput = () => cy.get('input[type="text"]')
export const getByLabel = (label) => cy.get(`[aria-label="${label}"`)
export const type = (text) => getTextInput().type(text)
export const getByTestId = (testId: string) =>
  cy.get(`[data-testid="${testId}"]`)
export const textShouldBeVisible = (text: string) =>
  cy.contains(text).should('be.visible')
