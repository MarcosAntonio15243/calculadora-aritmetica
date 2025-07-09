
describe("Calculator Tests", () => {

  const cases = [
    // Casos de sucesso
    { expression: '1+1', expected: true },
    { expression: '3.14+2', expected: true },
    { expression: '(1+2)*3', expected: true },
    { expression: '4*(2+(6/3))', expected: true },
    { expression: '((7-3)*2)+1', expected: true },
    { expression: '(1+(2.5-0.5)*(3+4/2))-6', expected: true },

    // Casos de falha
    { expression: '(1+2', expected: false },
    { expression: '1+2)', expected: false },
    { expression: '()', expected: false },
    { expression: '1++2', expected: false },
    { expression: '4--3', expected: false },
    { expression: '5**2', expected: false },
    { expression: '1+', expected: false },
    { expression: '(+)1+2', expected: false },
    { expression: '(1+2+)', expected: false },
    { expression: '3..14+1', expected: false },
  ];

  beforeEach(() => {
    // URL onde o projeto está rodando
    cy.visit('http://127.0.0.1:5500/app/index.html');
    // Limpa o input antes de cada teste
    cy.get('.btn-key').contains('CE').click();
  });

  cases.forEach(({ expression, expected }) => {
    it(`Expressão "${expression}" deve ser ${expected ? 'aceita' : 'rejeitada'}`, () => {

      // Separa a entrada por caractere e ativa evento de clique no botão correspondente na UI
      expression.split("").forEach((c) => {
        cy.get('.btn-key').contains(c).click();
      })

      // Ativa evendo de clique no operador de igualdade para computar a operação
      cy.contains('=').click();

      if (expected) {
        // Espera que resultado seja exibido no input, diferente do placeholder "erro"
        cy.get('#expression-input').should('not.have.attr', 'placeholder', 'erro');
      } else {
        // Espera que placeholder seja "erro" e valor limpo
        cy.get('#expression-input').should('have.attr', 'placeholder', 'erro');
        cy.get('#expression-input').should('have.value', '');
      }
    });
  });

});

