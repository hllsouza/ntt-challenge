import { faker } from '@faker-js/faker';

describe("Preparar ambiente de teste com produto criado", () => {
  let token;
  let productData;

  beforeEach(function () {
    cy.log("🔍 Carregando credenciais do Cypress.env");
    this.email = Cypress.env("email_admin");
    this.password = Cypress.env("password_admin");
    this.email_user = Cypress.env("email_user");
    this.password_user = Cypress.env("password_user");
    cy.log("📩 Credenciais carregadas:", this.email, this.password);
    cy.log("📩 Credenciais carregadas:", this.email_user, this.password_user);

    productData = {
      nome: faker.commerce.productName(),
      preco: faker.number.int({ min: 50, max: 500 }).toString(),
      descricao: faker.commerce.productDescription(),
      quantidade: faker.number.int({ min: 1, max: 100 }).toString(),
    };

    cy.apiLogin(this.email, this.password).then((authToken) => {
      token = authToken;

      cy.createProduct({
        ...productData,
        token: token,
      }).then((res) => {
        if (res.status === 201) {
          cy.log("✅ Produto criado:", productData.nome);
        } else {
          cy.log("⚠️ Produto já existia ou erro:", productData.nome);
        }
      });
    });

    cy.viewport(1200, 800);
    cy.visit("/login");
    cy.login(this.email_user, this.password_user);
  });

  it("Deve adicionar produto na lista de compra", { tags: "@shopping-list-ui" }, function () {
    cy.searchProduct(productData.nome);
    cy.validateSearchedProduct(productData.nome);
    cy.addProductToList();
    cy.validateShoppingListPage();
    cy.validateProductInShoppingList(productData.nome);
  });
});
