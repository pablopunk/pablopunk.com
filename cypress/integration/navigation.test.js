const nextConfig = require('../../next.config')

describe('Navigate between pages', () => {
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
  it('Navigate to a blog post and go back', () => {
    cy.visit('/blog')
    cy.get('h4').first().click()
    cy.url().should('include', '/posts')
    cy.get('.go-back-button').first().click()
    cy.url().should('include', '/blog')
  })
  // it('Goes to /donate and gets redirected', () => {
  //   const urlRedirects = []

  //   cy.visit('/')
  //   cy.on('url:changed', (url) => urlRedirects.push(url))
  //   cy.get('[href="/donate"]').click()
  //   cy.then(() => {
  //     expect(urlRedirects).to.have.length(3)
  //     expect(urlRedirects[1]).to.include('/donate')
  //     expect(urlRedirects[2]).to.include('github.com/sponsors/pablopunk')
  //   })
  // })
})
