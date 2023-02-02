const user = require("../fixtures/users");
const selectors = require("../fixtures/selectors");
const msg = require("../fixtures/msg");

beforeEach(() => {
  cy.visit("/admin/");
});

it("Login with correct credentials", () => {
	cy.login(user.validEmail, user.validPassword);
	cy.get(selectors.stepInAdmin)
    .then((elements) => elements[0].validationMessage)
    .should(
      "contain",
      msg.stepOneInAdmin
    );
});

it("Shows error in case of invalid login", () => {
  cy.login(user.invalidEmail, user.validPassword);
  cy.contains(msg.authorisationError).should("be.visible");
});

it("Shows error in case of invalid password", () => {
  cy.login(user.validEmail, user.invalidPassword);
  cy.contains(msg.authorisationError).should("be.visible");
});

it("Shows error in case of uncorrectFormat login", () => {
  cy.login(user.uncorrectFormatEmail, user.validPassword);
  cy.get(selectors.email)
    .then((elements) => elements[0].checkValidity())
    .should("be.false");
  cy.get(selectors.email)
    .then((elements) => elements[0].validationMessage)
    .should(
      "contain",
      `Адрес электронной почты должен содержать символ "@". В адресе "${user.uncorrectFormatEmail}" отсутствует символ "@".`
    );
});

it("Shows error in case of empty login", () => {
  cy.login("", user.validPassword);
  cy.get(selectors.email)
    .then((elements) => elements[0].checkValidity())
    .should("be.false");
  cy.get(selectors.email)
    .then((elements) => elements[0].validationMessage)
    .should("contain", msg.emptyField);
});

it("Shows error in case of empty password", () => {
  cy.login(user.validEmail, "");
  cy.get(selectors.password)
    .then((elements) => elements[0].checkValidity())
    .should("be.false");
  cy.get(selectors.password)
    .then((elements) => elements[0].validationMessage)
    .should("contain", msg.emptyField);
});