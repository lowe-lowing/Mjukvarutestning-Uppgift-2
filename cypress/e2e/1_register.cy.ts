describe("Register user", () => {
  it("should register user", () => {
    cy.fixture("user").then((user) => {
      cy.visit("http://localhost:3000/register");

      cy.get('input[id="username"]').type(user.username);
      cy.get('input[id="password"]').type(user.password);

      cy.get('input[type="submit"]').click();

      cy.get('p[id="message"]').should("contain", "Användare skapad");
    });
  });
});
