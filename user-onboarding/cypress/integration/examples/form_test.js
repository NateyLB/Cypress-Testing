describe("Test out inputs and submit out form", function (){
    this.beforeEach(function(){
        cy.visit("http://localhost:3000/");
    });
it("Checks validation and error messages", function(){
    //checking form validation and error messages
    //checming name validation
    cy.get("[data-cy=name]")
    .type("n{backspace}");
    cy.get("[data-cy=nameError]")
    .should("have.text", "Name is a required field");
    //checking email validation
    cy.get("[data-cy=email]")
    .type("n");
    cy.get("[data-cy=emailError]")
    .should("have.text", "Please enter a valid email");
    cy.get("[data-cy=email]")
    .type("{backspace}");
    cy.get("[data-cy=emailError]")
    .should("have.text", "Email is a required field");
    //checking role validation
    cy.get("[data-cy=role]")
    .select("UI Designer")
    .select("")
    cy.get("[data-cy=roleError]")
    .should("have.text", "Must select a role");
    //checking password validation
    cy.get("[data-cy=password]")
    .type("n{backspace}");
    cy.get("[data-cy=passwordError]")
    .should("have.text", "Must enter a password");
});
it ("adds text to input and submits form", function(){
    //input into forms and submit
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
    //check if the user is as expected
    cy.get("[data-cy=0]")
    .should("have.text", "Name: Nathan Email: email@email.com Role: UI Designer");
});
});
