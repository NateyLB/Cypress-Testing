describe("Test out inputs and submit out form", function (){
    this.beforeEach(function(){
        cy.visit("http://localhost:3000/");
    });
it("Add text to input and submit form", function(){
    cy.get("[data-cy=name]")
    .type("Nathan")
    .should("have.value", "Nathan");
    cy.get("[data-cy=email]")
    .type("email@email.com")
    .should("have.value", "email@email.com");
    cy.get("[data-cy=role]")
    .select("UI Designer")
    .should("have.value", "UI Designer");
    cy.get("[data-cy=password]")
    .type("password")
    .should("have.value", "password");
    cy.get("[data-cy=terms]")
    .check()
    .should("be.checked");
    cy.get("[data-cy=submit]")
    .click()
});
});