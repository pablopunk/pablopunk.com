// describe('Theme control', () => {
//   it('can toggle between themes', () => {
//     cy.visit('/')
//     cy.get('body')
//       .invoke('css', 'background-color')
//       .then((initialBg) => {
//         cy.get('.toggle-theme-button').click()
//         cy.get('body')
//           .should('have.css', 'background-color')
//           .and('not.contain', initialBg)
//         cy.get('.toggle-theme-button').click()
//         cy.get('body')
//           .should('have.css', 'background-color')
//           .and('contain', initialBg)
//       })
//   })
// })
