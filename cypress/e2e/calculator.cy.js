describe("Calculator Tests", () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/app/index.html'); // URL onde o projeto está rodando
  });

  it('deve somar 1 + 2 e mostrar 3', () => {
    cy.get('.btn-key').contains('1').click();
    cy.get('.btn-key').contains('+').click();
    cy.get('.btn-key').contains('2').click();
    cy.get('.btn-key').contains('=').click();

    cy.get('#expression-input').should('have.value', '3');
  });
});
