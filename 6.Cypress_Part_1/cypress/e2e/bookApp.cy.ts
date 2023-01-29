import { element } from "prop-types";

const validEmail1 = "test@test.com";
const validPassword1 = "test";
const validEmail2 = "bropet@mail.ru";
const validPassword2 = "123";
const invalidEmail = "Something";
const title = "Alphabet";
const description = "Very interesting book";
const authors = "Cyril and Methodius";

it("Check page display", () => {
  cy.visit("/");
  cy.contains("Books list").should("be.visible");
  cy.contains("Log in").should("be.visible");
});

describe("Login tests like lectures", () => {
  beforeEach(() => {
    cy.visit("/");
    // cy.viewport(Cypress.env("viewportWidth"), Cypress.env("viewportHeight"));
  });

  it("Logins user with correct credentials", () => {
    cy.login(validEmail1, validPassword1);
    cy.contains(`Добро пожаловать ${validEmail1}`).should("be.visible");
  });

  it("Shows error in case of empty login", () => {
    cy.login("", validPassword1);
    cy.get("#mail")
      .then((elements) => elements[0].checkValidity())
      .should("be.false");
    cy.get("#mail")
      .then((elements) => elements[0].validationMessage)
      .should("contain", "Заполните это поле.");
  });

  it("Shows error in case of empty password", () => {
    cy.login(validEmail1, "");
    cy.get("#pass")
      .then((elements) => elements[0].checkValidity())
      .should("be.false");
    cy.get("#pass")
      .then((elements) => elements[0].validationMessage)
      .should("contain", "Заполните это поле.");
  });

  it("Shows error in case of non-email login", () => {
    cy.login(invalidEmail, validPassword1);
    cy.get("#mail")
      .then((elements) => elements[0].checkValidity())
      .should("be.false");
    cy.get("#mail")
      .then((elements) => elements[0].validationMessage)
      .should(
        "contain",
        `Адрес электронной почты должен содержать символ "@". В адресе "${invalidEmail}" отсутствует символ "@".`
      );
  });
});

describe("Tests to check the functionality of working with books in favorites", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login(validEmail1, validPassword1);
    cy.addNewBook(title, description, authors);
  });

  it("Add to favorite", () => {
    cy.get("div.card-footer").contains("Add to favorite").click();
    cy.get("h4").click();
    cy.get("#root > div > div > a > div > div.card-body > div").should(
      "contain",
      title
    );
  });

  it("Delete from favorite", () => {
    cy.get("div.card-footer").contains("Add to favorite").click();
    cy.get("h4").click();
    cy.get("div.card-footer").contains("Delete from favorite").click();
    cy.contains("Please add some book to favorit on home page!").should(
      "be.visible"
    );
  });

  it("Favorite books of one user should not be visible to another", () => {
    cy.get("div.card-footer").contains("Add to favorite").click();
    cy.get("h4").click();
    cy.get("#root > div > div > a > div > div.card-body > div").should(
      "contain",
      title
    );
    cy.get("#responsive-navbar-nav > div > button").click();
    cy.login(validEmail2, validPassword2);
    cy.get("#responsive-navbar-nav > a > h4").click();
    cy.contains("Please add some book to favorit on home page!").should(
      "be.visible"
    );
  });
});
