const user = require("../fixtures/users");
const selectors = require("../fixtures/selectors");

beforeEach(() => {
  cy.visit("/");
});

it("Check page display", () => {
  cy.get(selectors.title).should("be.visible");
  cy.get(selectors.title).should("have.text", "Идёмвкино");
});

it("Check days of week", () => {
  cy.get(selectors.week).should("have.length", 7);
  cy.get(selectors.title).should("have.text", "Идёмвкино");
});