import { mongoConnect, mongoDisconnect } from "../../services/mongo";
import { MongoMemoryServer } from "mongodb-memory-server";
import recipesDB from "./recipes.mongo";
import { mockFetchRecipes } from "../../mockFunctions";
import * as recipesModel from "./recipes.model";

const {
  getAllRecipes,
  getRecipeById,
  loadRecipes,
  populateRecipes,
  saveRecipe,
} = recipesModel;

jest.mock("axios", () => ({
  ...jest.requireActual("axios"),
  get: jest.fn().mockImplementation(() => {
    const recipes = mockFetchRecipes();

    return {
      status: 200,
      data: {
        results: recipes,
      },
    };
  }),
}));

describe("Recipe model tests", () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoConnect(mongoServer.getUri());
    await populateRecipes();
  });

  afterAll(async () => {
    await mongoDisconnect();
    await mongoServer.stop();
  });

  const mockRecipe: recipesModel.MealRecipe = {
    recipeId: "recipe-id",
    title: "Mock Recipe",
    sourceUrl: "mock-url",
    imageUrl: "mock-image-url",
    ingredients: [],
    instructions: [],
    calories: 200,
    readyInMinutes: 40,
    servings: 2,
    diets: [],
  };

    describe("getAllRecipes, getRecipesById and saveRecipes tests", () => {
      it("doesn't fetch more than 10 recipes", async () => {
        const recipes = await getAllRecipes(1);
        expect(recipes).toHaveLength(10);

        await saveRecipe(mockRecipe);

        const recipeById = await getRecipeById(mockRecipe.recipeId);
        expect(recipeById).toBeDefined();
      });
    });

  describe("loadRecipes tests", () => {
    const consoleLogSpy = jest.spyOn(console, "log");

    it("doesn't load recipes if recipes are already loaded", async () => {
      await saveRecipe({
        ...mockRecipe,
        title: "Cannellini Bean and Asparagus Salad with Mushrooms",
        recipeId: "cannelini",
      });
      await loadRecipes();
      expect(consoleLogSpy).toHaveBeenCalledWith("Recipes data already loaded");
    });

    it("calls populateRecipes if the recipes are not loaded", async () => {
      // Clears console.log history
      consoleLogSpy.mockClear();
      await recipesDB.deleteMany({});
      await loadRecipes();
      expect(consoleLogSpy).toHaveBeenCalledTimes(0);
    });
  });
});
