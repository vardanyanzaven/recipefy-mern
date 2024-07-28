import usersDB from "../../server/src/models/user/user.mongo";

before(function () {
  cy.task("createRecipes").then((recipes) => {
    cy.insertMany(recipes as Document[], { collection: "recipes" });
    cy.intercept(
      {
        method: "GET",
        url: "/api/recipes?page=1",
      },
      { status: 200, body: recipes }
    );
  });

  cy.fixture("../fixtures/mockUser.json").as("mockUser");
});

after(function () {
  cy.dropCollection("recipes");
  cy.dropCollection("users");
});

context("User functionality tests", function () {
  beforeEach(function () {
    cy.visit("/signup");
    cy.fillSignUp(this.mockUser);
    cy.contains(/sign up/i).click();
    cy.contains(/recipes/i).click();
  });

  afterEach(function () {
    cy.request("DELETE", `/api/auth/${this.mockUser.username}`);
  })

  it("renders snackbars when user tries to save recipes or navigate to /saved while unauthenticated", function () {
    cy.contains(/log out/i).click();
    cy.contains(/recipes/i).click();
    cy.get("[data-testid=recipe-card]").first().find(".save-btn").click();
    cy.get("[data-testid=custom-snackbar]")
      .as("customSnackbar")
      .should("be.visible")
      .contains(/sign in to save recipes!/i);
    cy.contains(/saved/i).click();
    cy.get("@customSnackbar")
      .should("be.visible")
      .contains(/sign in to view saved recipes!/i);
  });

  it("saves and views saved recipe when user is authenticated and displays the recipes after re-logging", function () {
    cy.get("[data-testid=recipe-card]").first().as("savedRecipe")
    cy.get("@savedRecipe").find(".save-btn").click();
    cy.get("[data-testid=custom-snackbar]")
    .as("customSnackbar")
    .should("be.visible")
    .contains(/recipe saved!/i);
    cy.contains(/saved/i).click();
    cy.get("@savedRecipe").should("be.visible");
  });

  it("saves and displays the saved recipes after logging in again", function () {
    cy.get("[data-testid=recipe-card]").first().as("savedRecipe")
    cy.get("@savedRecipe").find(".save-btn").click();

    cy.contains(/log out/i).click();
    cy.contains(/sign in/i).click();
    cy.fillSignIn(this.mockUser);
    cy.contains(/sign in/i).click();
    cy.contains(/saved/i).click();
    cy.get("@savedRecipe").should("be.visible");
  });
});
