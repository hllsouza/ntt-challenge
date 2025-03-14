Cypress.Commands.add("criarUsuario", (nome, email, password, administrador) => {
    return cy.api({
      method: "POST",
      url: "/usuarios",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: {
        nome,
        email,
        password,
        administrador,
      },
      failOnStatusCode: false,
    }).then((response) => {
      cy.log("📩 Resposta da criação do usuário:", response.status, response.body);
      return cy.wrap(response);
    });
  });
  