const loginSelectors = {
  emailInput: '[data-testid="email"]',
  passwordInput: '[data-testid="senha"]',
  loginButton: '[data-testid="entrar"]',
  welcomeMessage: 'h1:contains("Bem Vindo")',
  storeTitle: 'h1:contains("Serverest Store")',
  errorMessageSpan: "span",
};

Cypress.Commands.add("login", (email, password) => {
  cy.get(loginSelectors.emailInput).clear();
  email &&
    cy.get(loginSelectors.emailInput).type(email).should("have.value", email);

  cy.get(loginSelectors.passwordInput).clear();
  password &&
    cy
      .get(loginSelectors.passwordInput)
      .type(password)
      .should("have.value", password);

  cy.get(loginSelectors.loginButton)
    .should("be.visible")
    .and("not.be.disabled")
    .click();
});

Cypress.Commands.add("validateWelcomeAdminMessage", (userName) => {
  cy.get(loginSelectors.welcomeMessage)
    .should("be.visible")
    .invoke("text")
    .then((text) => {
      const normalizedText = text.trim().replace(/\s+/g, " ");
      expect(normalizedText).to.eq(`Bem Vindo ${userName}`);
    });
});

Cypress.Commands.add("validateStoreTitle", () => {
  cy.get(loginSelectors.storeTitle)
    .should("be.visible")
    .and("contain.text", "Serverest Store");
});

Cypress.Commands.add("validateLoginErrorMessage", (expectedMessage) => {
  cy.get(loginSelectors.errorMessageSpan)
    .contains(expectedMessage)
    .should("be.visible");
});
