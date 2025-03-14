describe("Login Admin API Test", { tags: "@login" }, () => {
  beforeEach(function () {
    cy.log("🔍 Carregando credenciais do Cypress.env");

    this.email = Cypress.env("email_admin");
    this.password = Cypress.env("password_admin");

    cy.log("📩 Credenciais carregadas:", this.email, this.password);
    cy.log("✅ Cypress Grep Ativo:", Cypress.env("grep"));
  });

  it("Deve realizar login com sucesso", { tags: "@login-admin" }, function () {
    cy.login_admin(this.email, this.password).then((response) => {
      cy.log("🔍 Resposta recebida:", response.body);

      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("message", "Login realizado com sucesso");
      expect(response.body).to.have.property("authorization");
    });
  });

  it("Deve realizar login inválido - email ou senha inválidos", { tags: "@login-admin" }, function () {
    cy.login_admin(this.email, "123").then((response) => {
      cy.log("🔍 Resposta recebida:", response.body);

      expect(response.status).to.eq(401);
      expect(response.body).to.have.property("message", "Email e/ou senha inválidos");
    });
  });

  it("Deve realizar login inválido - email obrigatório", { tags: "@login-admin" }, function () {
    cy.login_admin("", this.password).then((response) => {
      cy.log("🔍 Resposta recebida:", response.body);

      expect(response.status).to.eq(400);
      expect(response.body).to.have.property("email", "email não pode ficar em branco");
    });
  });

  it("Deve realizar login inválido - password obrigatório", { tags: "@login-admin" }, function () {
    cy.login_admin(this.email, "").then((response) => {
      cy.log("🔍 Resposta recebida:", response.body);

      expect(response.status).to.eq(400);
      expect(response.body).to.have.property("password", "password não pode ficar em branco");
    });
  });
});
