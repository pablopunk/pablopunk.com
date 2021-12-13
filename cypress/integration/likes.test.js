describe('Likes functionality', () => {
  it('loads 2 likes buttons on one article', () => {
    cy.visit('/posts/how-to-create-a-real-time-ui-with-nextjs-and-supabase')
    cy.get('.button-like').should('have.length', 2)
  })
  it('loads likes counter on article', () => {
    cy.visit('/posts/how-to-create-a-real-time-ui-with-nextjs-and-supabase')
    cy.wait(4000) // wait for request to be completed
    cy.get('.button-like')
      .first()
      .invoke('text')
      .then(parseInt)
      .should('be.gt', 0)
  })
})
