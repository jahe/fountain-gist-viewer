describe('Search Page', function() {
  it('should list the users gists', function() {
    cy.visit('http://localhost:3000')

    cy.get('input')
      .type('jahe')
      .should('have.value', 'jahe')

    cy.get('input').type('{enter}')

    cy.url().should('include', '/jahe')

    cy.contains('jahe')
  })
})
