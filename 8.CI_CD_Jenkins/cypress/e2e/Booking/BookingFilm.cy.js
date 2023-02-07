const user = require("../../fixtures/users");
const selectors = require("../../fixtures/selectors");
const msg = require("../../fixtures/msg");
const seats = require("../../fixtures/seats");

beforeEach(() => {
  cy.visit("/");
});

it("Booking film", () => {
  cy.visit("/admin/");
  cy.login(user.validEmail, user.validPassword);
  cy.get(selectors.stepInAdmin)
    .then((elements) => elements[0].validationMessage)
    .should("contain", msg.stepOneInAdmin);
  cy.get(selectors.activeFilmInAdmin).then(($film) => {
    const filmName = $film.text();
    cy.visit("/");
    cy.get(selectors.day).click();
    cy.get(selectors.movie)
      .contains(filmName)
      .get(selectors.filmSession)
      .click();
    cy.get(
      `body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(${seats.row}) > span:nth-child(${seats.seat})`
    ).click();
    cy.get(selectors.acceptinButton).click();
    cy.contains(msg.checkTicket).should("be.visible");
    cy.get(selectors.acceptinButton).click();
    cy.get(selectors.checkTitle)
      .contains(msg.bookingSuccess)
      .should("be.visible");
  });
});
