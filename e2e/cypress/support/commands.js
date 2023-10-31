import "@testing-library/cypress/add-commands";

Cypress.Commands.add("login", (user) => {
  cy.visit("/user-sessions/new");
  cy.get("form").within(() => {
    cy.findByLabelText("Email").type(user.email);

    cy.findByLabelText("Password").type(user.password);

    cy.root().submit();

    cy.url().should("eq", `${Cypress.config().baseUrl}/`);
  });
  cy.contains("Sign Out");
});
