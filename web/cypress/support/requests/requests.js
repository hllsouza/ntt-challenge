Cypress.Commands.add("apiLogin", (email, password) => {
    return cy.request({
      method: "POST",
      url: "https://serverest.dev/login",
      headers: { "Content-Type": "application/json" },
      body: { email, password },
    }).then((response) => {
      expect(response.status).to.eq(200);
      return response.body.authorization;
    });
  });
  
  Cypress.Commands.add("createProduct", ({ nome, preco, descricao, quantidade, token }) => {
    return cy.request({
      method: "POST",
      url: "https://serverest.dev/produtos",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `${token}`,
      },
      body: { nome, preco, descricao, quantidade },
      failOnStatusCode: false
    }).then((response) => {
      expect([201, 400]).to.include(response.status);
      return response;
    });
  });
  