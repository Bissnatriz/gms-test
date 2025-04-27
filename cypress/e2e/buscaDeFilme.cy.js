/// <reference types="cypress" />

describe('Busca de Filmes', () => {

    beforeEach(() => {
        cy.visit('/')
    });

    it('Deve realizar a busca de um filme com sucesso utilizando palavra-chave', () => {
        cy.get('#search-input').type('Star Wars')
        cy.get('#search-button').click()
        cy.get('#results-section').should('contain', 'Star Wars')
    });

    it.only('Deve realizar a busca de filmes de uma lista', () => {
        cy.fixture('filmes').then((filmes) => {
            filmes.forEach((filme) => {
                cy.get('#search-input').clear().type(filme.titulo)
                cy.get('#search-button').click()
                cy.get('#results-section').should('contain', filme.titulo)
            })
        })
    });

    it('Deve exibir mensagem de erro ao buscar filme inexistente', () => {
        cy.get('#search-input').type('ZZZZZZZZZZZZZ')
        cy.get('#search-button').click()
        cy.get('#results-section > p').should('contain', 'Filme não encontrado')
    })

    it('Deve realizar limpar o resultado dos filme com sucesso', () => {
        cy.get('#search-input').type('Star Wars')
        cy.get('#search-button').click()
        cy.get('#results-section').should('contain', 'Star Wars')

        cy.get('#clear-button').click()
        cy.get('#results-section').should('has.to.be.empty')
        cy.get('#search-input').should('has.to.be.empty')
    });

})