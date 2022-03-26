const nextConfig = require('../../next.config')

describe('Navigate between pages', () => {
  it('/ has content', () => {
    cy.visit('/')
    cy.get('h1').contains('Pablo Varela')
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
    cy.get('[href="/home"]').click()
    cy.url().should('include', '/home')
  })
  it('Navigate to a blog post and go back', () => {
    cy.visit('/blog')
    cy.get('h4').first().click()
    cy.url().should('include', '/posts')
    cy.get('.go-back-button').first().click()
    cy.url().should('include', '/blog')
  })
  it('Goes to /donate and gets redirected', () => {
    cy.request('/donate').then((response) => {
      expect(response.redirects[0]).to.include(
        'https://www.buymeacoffee.com/pablopunk',
      )
    })
  })
})
