/// <reference types="cypress" />

describe('Recomendações de filmes', () => {

    beforeEach(() => {
        cy.visit('/')
    })

    it('Validar recomendação diária de filmes', () => {
      cy.get('#recommendations > *').should($children => {
        const count = $children.length
        expect(count).to.be.within(4, 5)
      })
    });
  })