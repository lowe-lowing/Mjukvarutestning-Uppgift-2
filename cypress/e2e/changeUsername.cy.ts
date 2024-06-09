describe("Change username", () => {
  it("should login the user", () => {
    cy.fixture("user").then((user) => {
      cy.visit("http://localhost:3000/profile");

      cy.get('input[id="newUsername"]').type(user.newUsername);

      cy.get('input[type="submit"]').click();

      cy.get('span[id="username"]').should("contain", user.newUsername);
    });
  });
});
