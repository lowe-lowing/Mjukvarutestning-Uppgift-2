describe("Login user", () => {
  it("should login user", () => {
    cy.fixture("user").then((user) => {
      cy.visit("http://localhost:3000/login");

      cy.get('input[id="username"]').type(user.username);
      cy.get('input[id="password"]').type(user.password);

      cy.get('input[type="submit"]').click();

      cy.get('p[id="message"]').should("contain", "Login Successful");
    });
  });
});
