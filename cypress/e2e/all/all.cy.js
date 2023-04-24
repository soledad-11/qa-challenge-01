
describe('Open Test page', () => {

  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })



  it('Open Page', () => {
    cy.visit('http://google.com')
  })
})