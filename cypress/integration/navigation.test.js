describe('Basic navigation', () => {
  it('/ has content', () => {
    cy.visit('/')
    cy.contains('h1')
  })
  it('can navigate from / to /portfolio', () => {
    cy.visit('/')
    cy.get('[href="/portfolio"]').click()
    cy.url().should('include', '/portfolio')
  })
  it('can navigate from /portfolio to /blog', () => {
    cy.visit('/portfolio')
    cy.get('[href="/blog"]').click()
    cy.url().should('include', '/blog')
  })
  it('can navigate from /blog to /me', () => {
    cy.visit('/blog')
    cy.get('[href="/me"]').click()
    cy.url().should('include', '/me')
  })
  it('can navigate from /me to /', () => {
    cy.visit('/me')
    cy.get('[href="/"]').click()
    cy.url().should('include', '/')
  })
})
