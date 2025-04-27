/// <reference types="cypress" />

describe('Cadastro de membros', () => {

  beforeEach(() => {
    cy.visit('/')
  });

  it('Deve fazer o cadastro de campo obrigatorios', () => {
    let email = `beatriz${Math.floor(Math.random() * 10000)}@teste.com.br`
    cy.preencherCadastro('Beatriz', 'Morais', email, '11999999999', 'Ebac123456!')
    cy.get('#signup-response').should('contain', 'Cadastro realizado com sucesso')
  });

  it('Deve validar mensagem de erro com o campo nome inválido', () => {
    cy.preencherCadastro('Beatriz1515', 'Morais', 'beatriz@teste.com.br', '1199999999999', 'Ebac123456!')
    cy.get('#signup-response').should('contain', 'Nome deve conter apenas caracteres alfabéticos, acentuados e espaços')
  });

  it.only('Deve validar mensagem de erro campo nome obrigatorio', () => {
    cy.get('#signup-lastname').type('Morais')
    cy.get('#signup-email').type('beatriz@teste.com.br')
    cy.get('#signup-phone').type('11999999999')
    cy.get('#signup-password').type('Ebac123456!')
    cy.get('#signup-button').click()
    cy.get('#signup-response').should('contain', 'Nome não pode estar vazio')
  });

  it('Deve validar formato do email', () => {
    cy.preencherCadastro('Beatriz', 'Morais', 'beatrizteste.com.br', '11999999999', 'Ebac123456!')
    cy.get('#signup-response').should('contain', 'E-mail deve ser um email válido')
  });

});


