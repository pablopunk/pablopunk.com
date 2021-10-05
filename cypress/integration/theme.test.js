const blackBg = /rgb\(0, 0, 0\)/

describe('Theme control', () => {
  it('can toggle between themes', () => {
    cy.visit('/')
    // default theme is black in cypress (see cypress/plugins/index.js)
    cy.get('body').should('have.css', 'background-color').and('match', blackBg)
    cy.get('.toggle-theme-button').click() // change to light
    cy.get('body')
      .should('have.css', 'background-color')
      .and('not.match', blackBg)
    cy.get('.toggle-theme-button').click() // change to dark again
    cy.get('body').should('have.css', 'background-color').and('match', blackBg)
  })
})
