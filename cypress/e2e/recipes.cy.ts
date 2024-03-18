before(() => {
  cy.createCollection("recipes");
});

context("Recipes tests", () => {
  before(() => {
    cy.task("createRecipes").then((recipes) => {
      cy.insertMany(recipes as Document[], { collection: "recipes" });
      cy.intercept(
        { method: "GET", url: "http://localhost:8000/api/recipes?page=1" },
        {
          status: 200,
          body: recipes,
        }
      );
    });
  });

  after(() => {
    cy.deleteMany({}, { collection: "recipes" });
  });

  it("successfully navigates to recipes page, renders 10 recipe cards and displays info on recipe page", () => {
    cy.visit("/");

    cy.contains(/recipes/i).click();

    // Checks if there are exactly 10 recipe cards
    cy.get("[data-testid=recipe-card]")
      .as("recipeCards")
      .should("have.length", 10);

    // Navigates to recipe page
    cy.get("@recipeCards").first().find("[data-testid=view-more-btn]").click();

    // Checks if the page is displayed
    cy.contains(/additional information/i).should("be.visible");

    // Opens the ingredients section and checks if the ingredients are rendered
    cy.contains(/ingredients/i).click();
    cy.contains("Ingr. 1").should("be.visible");
  });
});
