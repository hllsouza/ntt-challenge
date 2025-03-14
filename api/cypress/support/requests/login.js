Cypress.Commands.add("login_admin", (email, password) => {
  cy.api({
    method: "POST",
    url: "/login",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: {
      email,
      password,
    },
    failOnStatusCode: false,
  }).then((response) => {
    cy.log("🔍 Resposta do login:", response.status, response.body);
    return cy.wrap(response);;
  });
});