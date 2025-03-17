const shoppingListSelectors = {
  shoppingListTitle: 'h1:contains("Lista de Compras")',
  shoppingCartProduct: '[data-testid="shopping-cart-product-name"]',
};

Cypress.Commands.add("validateShoppingListPage", () => {
  cy.get(shoppingListSelectors.shoppingListTitle)
    .should("be.visible")
    .and("contain.text", "Lista de Compras");
});

Cypress.Commands.add("validateProductInShoppingList", (productName) => {
  cy.get(shoppingListSelectors.shoppingCartProduct)
    .should("be.visible")
    .and("contain.text", `Produto:${productName}`);
});
