const user = require("../fixtures/users");
const selectors = require("../fixtures/selectors");
const msg = require("../fixtures/msg");

beforeEach(() => {
  cy.visit("/");
});

it("Booking film", () => {
  cy.visit("/admin/");
  cy.login(user.validEmail, user.validPassword);
  cy.get(selectors.stepInAdmin)
    .then((elements) => elements[0].validationMessage)
    .should("contain", msg.stepOneInAdmin);

  cy.get(
    "#grid-session > div > div.conf-step__movies > div:nth-child(1) > h3"
  ).then(($film) => {
    const filmName = $film.text();
    cy.visit("/");
		cy.get("body > nav > a:nth-child(5)").click();
		cy.get(
      "body > main > section:nth-child(1) > div.movie-seances__hall > ul > li:nth-child(3) > a"
    ).should(filmName);
  });

  // const filmName = cy.get(".conf-step__movie-title");

  // cy.visit("/");
  // console.log(filmName);
  // cy.contains(filmName.text()).click();
});
