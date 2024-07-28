import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import { mongoConnect, mongoDisconnect } from "../../services/mongo";
import { populateRecipes } from "../../models/recipes/recipes.model";
import { mockFetchRecipes } from "../../../test-utils/mockFunctions";
import app from "../../app";

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

describe("Recipes controller tests", () => {
  let mongoServer: MongoMemoryServer;
  const baseUrl = "/api/recipes";

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoConnect(mongoServer.getUri());
    await populateRecipes();
  });

  afterAll(async () => {
    await mongoDisconnect();
    await mongoServer.stop();
  });

  const agent = request.agent(app);

  describe("httpGetAllRecipes tests", () => {
    it("successfully fetches recipes based on page number and returns status code 200", async () => {
      const res = await agent
        .get(baseUrl)
        .query({ page: 1 })
        .expect("Content-Type", /json/)
        .expect(200);

      expect(res.body.at(-1)).toHaveProperty("recipeId", "mock-recipe-10");
    });
  });

  describe("httpGetRecipe tests", () => {
    it("successfully fetches the recipe with id and returns a status code 200", async () => {
      const res = await agent
        .get(`${baseUrl}/mock-recipe-5`)
        .expect("Content-Type", /json/)
        .expect(200);

      // 0 needs to be selected because the recipe is stored in an object with a key of 0
      expect(res.body[0]).toHaveProperty("recipeId", "mock-recipe-5");
    });
  });
});
