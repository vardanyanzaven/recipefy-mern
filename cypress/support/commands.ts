import { SignInData, SignUpData } from "@typings/auth";

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Fills the Sign Up form with given user credentials
       *
       * @example
       * cy.fillSignUp({...userInfo})
       */
      fillSignUp(userInfo: SignUpData): Chainable<JQuery<HTMLBodyElement>>;

      /**
       * Fills the Sign In form with given user credentials
       *
       * @example
       * cy.fillSignIn({...userInfo})
       */
      fillSignIn(userInfo: SignInData): Chainable<Element>;
    }
  }
}

Cypress.Commands.add("fillSignUp", (userInfo: SignUpData) => {
  cy.get("#username-input").type(userInfo.username);

  cy.get("#email-input").type(userInfo.email);

  cy.get("#password-input").type(userInfo.password);

  cy.get("#age-input").type(userInfo.age.toString());

  cy.contains("4 or more").click();

  cy.get("[data-testid=diets-input]").click();
  cy.contains("FODMAP Friendly").click();

  return cy.get("body").click();
});

Cypress.Commands.add("fillSignIn", (userInfo: SignInData) => {
  cy.get("#email-input").type(userInfo.email);

  cy.get("#password-input").type(userInfo.password);
});
