describe("Testes de Login - Serverest Store", () => {
  beforeEach(function () {
    cy.log("🔍 Carregando credenciais do Cypress.env");

    this.email = Cypress.env("email_admin");
    this.password = Cypress.env("password_admin");
    this.email_user = Cypress.env("email_user");
    this.password_user = Cypress.env("password_user");

    cy.log("📩 Credenciais carregadas:", this.email, this.password);

    cy.viewport(1200, 800);
    cy.visit("/login");
  });

  it("Deve realizar login admin", { tags: "@login-ui" }, function () {
    cy.login(this.email, this.password);
    cy.validateWelcomeAdminMessage('Fulano da Silva');
  });

  it("Deve realizar login user", { tags: "@login-ui" }, function () {
    cy.login(this.email_user, this.password_user);
    cy.validateStoreTitle();
  });

  it("Deve realizar login inválido - email ou senha inválidos", { tags: "@login-ui-exception" }, function () {
    cy.login(this.email, '123');
    cy.validateLoginErrorMessage("Email e/ou senha inválidos");
  });

  it("Deve realizar login inválido - email obrigatório", { tags: "@login-ui-exception" }, function () {
    cy.login('', this.password);
    cy.validateLoginErrorMessage("Email é obrigatório");
  });

  it("Deve realizar login inválido - password obrigatório", { tags: "@login-ui-exception" }, function () {
    cy.login(this.email, '');
    cy.validateLoginErrorMessage("Password é obrigatório");
  });
});
