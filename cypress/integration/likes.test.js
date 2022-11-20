describe('Likes functionality', () => {
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
