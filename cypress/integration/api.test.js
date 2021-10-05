describe('API tests', () => {
  it('gets spotify data', () => {
    cy.request('/api/now-playing').should((response) => {
      expect(response.headers['content-type']).to.contain('application/json')
      expect(response.body).to.have.property('isPlaying')
    })
  })

  it('gets stats data', () => {
    cy.request('/api/stats').should((response) => {
      expect(response.headers['content-type']).to.contain('application/json')
      expect(response.body).to.have.property('github')
      expect(response.body).to.have.property('unsplash')
    })
  })
})
