import { Credentials } from "@typings/auth";

const mockUser: Credentials = {
  username: "mockuser",
  email: "mock@gmail.com",
  password: "MockPass1$",
  age: 44,
  calories: 700,
  diets: ["none"],
};

after(() => {
  cy.dropCollection("users");
});

context("Auth E2E tests", () => {
  beforeEach(() => {
    cy.visit("/");

    cy.get("[data-testid=header").as("header");
    cy.contains(/sign up/i).as("signUpBtn");
    cy.contains(/sign in/i).as("signInBtn");
  });
  after(() => {});
  context("Sign Up tests", () => {
    beforeEach(() => {
      // Redirects to /signup
      cy.get("@signUpBtn").click();
    });

    afterEach(() => {
      // Deletes mock user
      cy.request("DELETE", `/api/auth/${mockUser.username}`);
    });

    it("successfully signs up the user, redirects to home page and sets the auth-token", () => {
      // Fills out the inputs
      cy.fillSignUp(mockUser);

      // Submits the form
      cy.get("@signUpBtn").click();

      // Checks if the page has been redirected
      cy.get("@header").should("be.visible");

      // Checks if the auth-token has been set
      cy.getCookie("auth-token").should("not.equal", null);
    });

    it("displays the error helper text and doesn't redirect to home page if there is an error", () => {
      cy.fillSignUp({ ...mockUser, email: "invalid-email" });

      // Submits the form
      cy.get("@signUpBtn").click();

      // Checks if the error helper text is displayed
      cy.get("#email-input-helper-text").should("be.visible");

      // Checks that the website hasn't been redirected to home page
      cy.get("@header").should("not.exist");
    });
  });

  context("Sign In tests", () => {
    before(() => {
      cy.request("POST", "/api/auth/signup", mockUser);
    });

    beforeEach(() => {
      // Redirects to /signin
      cy.get("@signInBtn").click();
    });

    after(() => {
      // Deletes mock user
      cy.request("DELETE", `/api/auth/${mockUser.username}`);
    });

    it("successfully signs up the user, redirects to home page and sets the auth cookie", () => {
      // Fills out the inputs
      cy.fillSignIn({ email: mockUser.email, password: mockUser.password });

      // Submits the form
      cy.get("@signInBtn").click();

      // Checks if the page has been redirected
      cy.get("[data-testid=header]").should("be.visible");

      // Checks if the auth-token has been set
      cy.getCookie("auth-token").should("not.equal", null);
    });

    it("displays the error helper text and doesn't redirect to home page if there is an error", () => {
      // Fills out the inputs
      cy.fillSignIn({ email: "invalid-email", password: mockUser.password });

      // Submits the form
      cy.get("@signInBtn").click();

      // Checks if the error helper text is displayed
      cy.get("#email-input-helper-text").should("be.visible");

      // Checks that the website hasn't been redirected to home page
      cy.get("[data-testid=header]").should("not.exist");
    });
  });

  context("Logout tests", () => {
    before(() => {
      cy.request("POST", "/api/auth/signup", mockUser);
    });

    after(() => {
      cy.request("DELETE", `/api/auth/${mockUser.username}`);
    });

    it("succesfully logs out the user and deletes the auth-token", () => {
      cy.visit("/signin");

      cy.fillSignIn(mockUser);

      cy.get("@signInBtn").click();

      cy.contains(/log out/i).click();

      cy.get("#username").should("not.exist");

      cy.getCookie("auth-token").should("equal", null);
    });
  });
});