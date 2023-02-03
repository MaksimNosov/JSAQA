Cypress.Commands.add(
  "createUser",
  (id, userName, firstName, lastName, email, password, phone, userStatus) => {
    cy.request({
      method: "POST",
      url: "https://petstore.swagger.io/v2/user",
      body: {
        id: id,
        username: userName,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        phone: phone,
        userStatus: userStatus,
      },
    });
  }
);

Cypress.Commands.add(
  "updateUser",
  (id, userName, firstName, lastName, email, password, phone, userStatus) => {
    cy.request({
      method: "PUT",
      url: `https://petstore.swagger.io/v2/user/${userName}`,
      body: {
        id: id,
        username: userName,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        phone: phone,
        userStatus: userStatus,
      },
    });
  }
);

Cypress.Commands.add("getUser", (userName) => {
  cy.request({
    method: "GET",
    url: `https://petstore.swagger.io/v2/user/${userName}`,
  });
});

Cypress.Commands.add("deleteUser", (userName) => {
  cy.request({
    method: "DELETE",
    url: `https://petstore.swagger.io/v2/user/${userName}`,
  });
});
