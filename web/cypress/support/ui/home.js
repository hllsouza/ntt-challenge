const homeSelectors = {
  searchInput: '[data-testid="pesquisar"]',
  searchButton: '[data-testid="botaoPesquisar"]',
  productTitle: "h5.card-title.negrito",
  addToListButton: '[data-testid="adicionarNaLista"]',
};

Cypress.Commands.add("searchProduct", (productName) => {
  cy.get(homeSelectors.searchInput)
    .clear()
    .type(productName)
    .should("have.value", productName);

  cy.get(homeSelectors.searchButton)
    .should("be.visible")
    .and("not.be.disabled")
    .click();
});

Cypress.Commands.add("validateSearchedProduct", (expectedProductName) => {
  cy.get(homeSelectors.productTitle)
    .should("be.visible")
    .invoke("text")
    .then((text) => {
      const normalizedText = text.trim().replace(/\s+/g, " ");
      expect(normalizedText).to.eq(expectedProductName);
    });
});

Cypress.Commands.add("addProductToList", () => {
  cy.get(homeSelectors.addToListButton)
    .should("be.visible")
    .and("not.be.disabled")
    .click();
});
