import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import { mongoConnect, mongoDisconnect } from "../../services/mongo";
import {
  getAllRecipes,
  populateRecipes,
} from "../../models/recipes/recipes.model";
import { mockFetchRecipes } from "../../mockFunctions";
import supertest from "supertest";
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
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoConnect(mongoServer.getUri());
    await populateRecipes();
  });

  afterAll(async () => {
    await mongoDisconnect();
    await mongoServer.stop();
  });

  describe("httpGetRecipes tests", () => {
    it("successfully fetches recipes based on page number and returns status code 200", async () => {
      const res = await request(app)
        .get("/recipes")
        .query({ page: 1 })
        .expect("Content-Type", /json/)
        .expect(200);

      expect(res.body.at(-1)).toHaveProperty("recipeId", "mock-recipe-10");
    });
  });

  describe("httGetRecipe tests", () => {
    it("successfully fetches the recipe with id and returns a status code 200", async () => {
      const res = await request(app).get("/recipes/mock-recipe-5").expect("Content-Type", /json/).expect(200);

      expect(res.body).toHaveProperty("recipeId", "mock-recipe-5");
    });
  });
});
