after(function () {
  cy.dropCollection("users");
});

context("Auth E2E tests", function () {
  beforeEach(function () {
    cy.visit("/");

    cy.fixture("../fixtures/mockUser.json").as("mockUser");
    cy.get("[data-testid=header]").as("header");
    cy.contains(/sign up/i).as("signUpBtn");
    cy.contains(/sign in/i).as("signInBtn");
  });

  context("Sign Up tests", function () {
    beforeEach(function () {
      // Redirects to /signup
      cy.get("@signUpBtn").click();
    });

    afterEach(function () {
      // Deletes mock user
      cy.request("DELETE", `/api/auth/${this.mockUser.username}`);
    });

    it("successfully signs up the user, redirects to home page and sets the auth-token", function () {
      // Fills out the inputs
      cy.fillSignUp(this.mockUser);

      // Submits the form
      cy.get("@signUpBtn").click();

      // Checks if the page has been redirected
      cy.get("@header").should("be.visible");

      // Checks if the auth-token has been set
      cy.getCookie("auth-token").should("not.equal", null);
    });

    it("displays the error helper text and doesn't redirect to home page if there is an error", function () {
      cy.fillSignUp({ ...this.mockUser, email: "invalid-email" });

      // Submits the form
      cy.get("@signUpBtn").click();

      // Checks if the error helper text is displayed
      cy.get("#email-input-helper-text").should("be.visible");

      // Checks that the website hasn't been redirected to home page
      cy.get("@header").should("not.exist");
    });
  });

  context("Sign In tests", function () {
    before(function () {
      cy.request("POST", "/api/auth/signup", this.mockUser);
    });

    beforeEach(function () {
      // Redirects to /signin
      cy.get("@signInBtn").click();
    });

    after(function () {
      // Deletes mock user
      cy.request("DELETE", `/api/auth/${this.mockUser.username}`);
    });

    it("successfully signs up the user, redirects to home page and sets the auth cookie", function () {
      // Fills out the inputs
      cy.fillSignIn({
        email: this.mockUser.email,
        password: this.mockUser.password,
      });

      // Submits the form
      cy.get("@signInBtn").click();

      // Checks if the page has been redirected
      cy.get("[data-testid=header]").should("be.visible");

      // Checks if the auth-token has been set
      cy.getCookie("auth-token").should("not.equal", null);
    });

    it("displays the error helper text and doesn't redirect to home page if there is an error", function () {
      // Fills out the inputs
      cy.fillSignIn({
        email: "invalid-email",
        password: this.mockUser.password,
      });

      // Submits the form
      cy.get("@signInBtn").click();

      // Checks if the error helper text is displayed
      cy.get("#email-input-helper-text").should("be.visible");

      // Checks that the website hasn't been redirected to home page
      cy.get("[data-testid=header]").should("not.exist");
    });
  });

  context("Logout tests", function () {
    before(function () {
      cy.request("POST", "/api/auth/signup", this.mockUser);
    });

    after(function () {
      cy.request("DELETE", `/api/auth/${this.mockUser.username}`);
    });

    it("succesfully logs out the user and deletes the auth-token", function () {
      cy.visit("/signin");

      cy.fillSignIn(this.mockUser);

      cy.get("@signInBtn").click();

      cy.contains(/log out/i).click();

      cy.get("#username").should("not.exist");

      cy.getCookie("auth-token").should("equal", null);
    });
  });
});
