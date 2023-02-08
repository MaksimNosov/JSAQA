const user = require("../../fixtures/users");
const selectors = require("../../fixtures/selectors");
const msg = require("../../fixtures/msg");

beforeEach(() => {
  cy.visit("/admin/");
});

it("Login with correct credentials", () => {
  cy.login(user.validEmail, user.validPassword);
  cy.get(selectors.stepInAdmin)
    .then((elements) => elements[0].validationMessage)
    .should("contain", msg.stepOneInAdmin);
  Cypress.on("uncaught:exception", (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });
});
