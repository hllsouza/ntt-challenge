import { faker } from "@faker-js/faker";

describe("Criar Usuário API Test", { tags: "@usuarios" }, () => {
  it("Deve criar um novo usuário com sucesso do tipo admin", { tags: "@criar-usuario" }, () => {
    const nome = faker.person.fullName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    const administrador = 'true';

    cy.criarUsuario(nome, email, password, administrador).then((response) => {
      cy.log("🔍 Resposta recebida:", response.body);
      cy.wrap(response).its("status").should("eq", 201);
      cy.wrap(response).its("body.message").should("eq", "Cadastro realizado com sucesso");
      cy.wrap(response).its("body").should("have.property", "_id");
    });
  });

  it("Deve criar um novo usuário com sucesso do tipo cliente", { tags: "@criar-usuario" }, () => {
    const nome = faker.person.fullName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    const administrador = 'false';

    cy.criarUsuario(nome, email, password, administrador).then((response) => {
      cy.log("🔍 Resposta recebida:", response.body);
      cy.wrap(response).its("status").should("eq", 201);
      cy.wrap(response).its("body.message").should("eq", "Cadastro realizado com sucesso");
      cy.wrap(response).its("body").should("have.property", "_id");
    });
  });

  it("Deve falhar ao criar um usuário com email já cadastrado", { tags: "@criar-usuario" }, () => {
    const nome = faker.person.fullName();
    const email = "ralphiro_01@qa.com.br";
    const password = faker.internet.password();
    const administrador = 'true';

    cy.criarUsuario(nome, email, password, administrador).then((response) => {
      cy.log("🔍 Resposta recebida:", response.body);
      cy.wrap(response).its("status").should("eq", 400);
      cy.wrap(response).its("body.message").should("eq", "Este email já está sendo usado");
    });
  });

  it("Deve falhar ao criar um usuário com nome em branco", { tags: "@criar-usuario" }, () => {
    const nome = "";
    const email = "ralphiro_01@qa.com.br";
    const password = faker.internet.password();
    const administrador = 'true';

    cy.criarUsuario(nome, email, password, administrador).then((response) => {
      cy.log("🔍 Resposta recebida:", response.body);
      cy.wrap(response).its("status").should("eq", 400);
      cy.wrap(response).its("body.nome").should("eq", "nome não pode ficar em branco");
    });
  });

  it("Deve falhar ao criar um usuário com email em branco", { tags: "@criar-usuario" }, () => {
    const nome = "Ralphiro";
    const email = "";
    const password = faker.internet.password();
    const administrador = 'true';

    cy.criarUsuario(nome, email, password, administrador).then((response) => {
      cy.log("🔍 Resposta recebida:", response.body);
      cy.wrap(response).its("status").should("eq", 400);
      cy.wrap(response).its("body.email").should("eq", "email não pode ficar em branco");
    });
  });

  it("Deve falhar ao criar um usuário com password em branco", { tags: "@criar-usuario" }, () => {
    const nome = "Ralphiro";
    const email = "ralphiro_01@qa.com.br";
    const password = "";
    const administrador = 'true';

    cy.criarUsuario(nome, email, password, administrador).then((response) => {
      cy.log("🔍 Resposta recebida:", response.body);
      cy.wrap(response).its("status").should("eq", 400);
      cy.wrap(response).its("body.password").should("eq", "password não pode ficar em branco");
    });
  });

  it("Deve falhar ao criar um usuário com administrador inválido", { tags: "@criar-usuario" }, () => {
    const nome = "Ralphiro";
    const email = "ralphiro_01@qa.com.br";
    const password = faker.internet.password();
    const administrador = true

    cy.criarUsuario(nome, email, password, administrador).then((response) => {
      cy.log("🔍 Resposta recebida:", response.body);
      cy.wrap(response).its("status").should("eq", 400);
      cy.wrap(response).its("body.administrador").should("eq", "administrador deve ser 'true' ou 'false'");
    });
  });
});
