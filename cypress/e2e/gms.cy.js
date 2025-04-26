/// <reference types="cypress" />


describe('Cadastro de membros', () => {
  it('Deve fazer o cadastro de campo obrigatorios', () => {
    cy.visit('http://192.168.2.104:8080')
    cy.get('#signup-firstname').type('Maria Beatriz')
    cy.get('#signup-lastname').type('de Lima Morais')
    cy.get('#signup-email').type('bea@teste.com.br')
    cy.get('#signup-phone').type('11972408800')
    cy.get('#signup-password').type('Ebac123456!')
    cy.get('#signup-button').click()
    cy.get('#signup-response').should('contain', 'Cadastro realizado com sucesso')
    cy.get('#signup-response').should('be.visible')
  });

  it('Deve validar formato campo nome obrigatorio', () => {
    cy.visit('http://192.168.2.104:8080')
    cy.get('#signup-lastname').type('Lima')
    cy.get('#signup-email').type('bea@teste.com.br')
    cy.get('#signup-password').type('Ebac123456!')
    cy.get('#signup-button').click()
    cy.get('#signup-response').should('contain', 'Nome não pode estar vazio')
  });

  it('Deve validar formato do email', () => {
    cy.visit('http://192.168.2.104:8080')
    cy.get('#signup-firstname').type('Beatriz')
    cy.get('#signup-lastname').type('de Lima')
    cy.get('#signup-email').type('beamorais.com.br')
    cy.get('#signup-password').type('Ebac1234006!')
    cy.get('#signup-button').click()
    cy.get('#signup-response').should('contain', 'E-mail deve ser um email válido')
  });
});

describe('Busca de Filmes', () => {
  it('Deve realizar a busca de um filme com sucesso utilizando palavra-chave', () => {
    cy.visit('http://192.168.2.104:8080')
    cy.get('#search-input').type('Star Wars')
    cy.get('#search-button').click()
    cy.get('#results-section').should('contain', 'Star Wars')
    cy.get('#results-section > :nth-child(10)').scrollIntoView()
  });

  it('Deve exibir mensagem de erro ao buscar filme inexistente', () => {
    cy.visit('http://192.168.2.104:8080')
    cy.get('#search-input').type('ZZZZZZZZZZZZZ')
    cy.get('#search-button').click()
    cy.get('#results-section > p').should('contain', 'Filme não encontrado')
  })

  it('Deve realizar limpar o resultado dos filme com sucesso', () => {
    cy.visit('http://192.168.2.104:8080')
    cy.get('#search-input').type('Star Wars')
    cy.get('#search-button').click()
    cy.get('#results-section').should('contain', 'Star Wars')

    cy.get('#clear-button').click()
    cy.get('#results-section').should('has.to.be.empty')
    cy.get('#search-input').should('has.to.be.empty')
  });

})

describe('Recomendações de filmes', () => {
  it('Validar recomendação diária de filmes', () => {
    cy.visit('http://192.168.2.104:8080')
    cy.get('#recommendations > *').should($children => {
      const count = $children.length
      expect(count).to.be.within(4, 5)
    })
  });
})