const {
  id,
  username,
  firstName,
  lastName,
  email,
  password,
  phone,
  userStatus,
} = require("../fixtures/user.json");

describe("API tests", () => {
  it("Create new user", () => {
    cy.createUser(
      id,
      username,
      firstName,
      lastName,
      email,
      password,
      phone,
      userStatus
    ).then((response) => {
      expect(response.status).to.equal(200);
    });
  });

  it("Update user", () => {
    cy.createUser(
      id,
      username,
      firstName,
      lastName,
      email,
      password,
      phone,
      userStatus
    ).then((response) => {
      expect(response.status).to.equal(200);
    });

    cy.updateUser(
      2,
      username,
      "firstName2",
      "lastName2",
      "name2@test.com",
      "pass2",
      "222222222",
      2
    ).then((response) => {
      expect(response.status).to.equal(200);
    });
  });

  it("Delete user", () => {
    cy.createUser(
      id,
      username,
      firstName,
      lastName,
      email,
      password,
      phone,
      userStatus
    ).then((response) => {
      expect(response.status).to.equal(200);
    });
    cy.deleteUser(username).then((response) => {
      expect(response.status).to.equal(200);
    });
  });
});
