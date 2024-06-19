describe('Teste CareSync', () => {
  it('Acesso ao site caresync e adicionar pulseira', () => {

    // Entrar no site rodando
    cy.visit('http://localhost:8080');

    // Logar
    cy.get('#cpf').type('admin');
    cy.get('#senha').type('admin');
    cy.get('.botao').click();

    // Verifica se login foi bem-sucedido e página foi carregada
    cy.get('.menu-options').should('be.visible');

    // Clica em pulseiras
    cy.get('.menu-options > :nth-child(1)').click();

    // ADD pulseira - Primeiro teste
    cy.get('.adicionar-btn').click();
    cy.get('.btn').click(); // Tenta criar pulseira sem preencher os campos
    cy.get('.btn').click();
    cy.get('#cor').type('Azul');
    cy.get('#quantidade').type('dois'); // Tenta digitar palavras e não números
    cy.get('#quantidade').clear().type('1');
    cy.get('#status').select('Ativo');
    cy.get('.btn').click();

    //EDITAR PULSEIRA
    cy.get('.editar-btn').click();
    cy.get('#produtoId').type('1010');
    cy.get('#cor').type('Vermelho');
    cy.get('#quantidade').type('1');
    cy.get('.btn').click();

    //REMOVER A PULSEIRA
    cy.get('#produtoId').type('1023');
    // cy.get('#produtoId').type('1');
    cy.get('.remover-btn').click();

    //VOLTAR PARA O INICIO
    cy.get('.logo > a > img').click();

     // CLICA EM USUÁRIOS
     cy.get('.menu-options > :nth-child(2) > a').click();

     // ADD USUÁRIO
     cy.get('.adicionar-btn').click();
     cy.get('.btn').click(); // Tenta criar pulseira sem preencher os campos
     cy.get('.btn').click();
     cy.get('#nome').type('Lucas');
     cy.get('#cpf').type('12345678890')
     cy.get('#senha').type('1234');
     cy.get('.btn').click();

     //EDITAR USUARIO
     cy.get('.editar-btn').click();
     cy.get('#usuarioId').type('2');
     cy.get('#nome').type('Zé');
     cy.get('#cpf').type('99999999999');
     cy.get('#senha').type('1234');
     cy.get('.btn').click();

     //REMOVER USUARIO
     cy.get('#usuarioId').type('199');
     cy.get('.remover-btn').click();
    
     //VOLTAR PARA O INICIO
     cy.get('.logo > a > img').click();

     //VOLTAR PARA PÁGINA DE LOGIN
     cy.get('.return-home > a > img').click();

  });
});