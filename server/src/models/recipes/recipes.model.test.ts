import { MongoMemoryServer } from "mongodb-memory-server";
import { RecipeInfo } from "@typings/recipes";
import { mongoConnect, mongoDisconnect } from "../../services/mongo";
import recipesDB from "./recipes.mongo";
import { mockFetchRecipes } from "../../../test-utils/mockFunctions";
import * as recipesModel from "./recipes.model";

const {
  getAllRecipes,
  getRecipesByIds,
  loadRecipes,
  populateRecipes,
  addRecipe,
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

  const mockRecipe: RecipeInfo = {
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

  describe("getAllRecipes, getRecipesByIds and saveRecipes tests", () => {
    it("doesn't fetch more than 10 recipes, saves recipes and successfully fetches recipes by id", async () => {
      const recipes = await getAllRecipes(1);
      expect(recipes).toHaveLength(10);

      await addRecipe(mockRecipe);

      const recipeById = await getRecipesByIds([mockRecipe.recipeId]);

      expect(recipeById).toBeDefined();
    });
  });

  describe("loadRecipes tests", () => {
    const consoleLogSpy = jest.spyOn(console, "log");

    it("doesn't load recipes if recipes are already loaded", async () => {
      await addRecipe({
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
