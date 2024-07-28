import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../../app";
import usersDB from "../../models/user/user.mongo";
import { mongoConnect, mongoDisconnect } from "../../services/mongo";
import { mockFetchRecipes } from "../../../test-utils/mockFunctions";
import { populateRecipes } from "../../models/recipes/recipes.model";

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

describe("User controller tests", () => {
  let mongoServer: MongoMemoryServer;
  const agent = request.agent(app);
  const baseUrl = "/api/user";
  const mockUser = {
    username: "mockuser",
    email: "mock@gmail.com",
    password: "MockPass1$",
    age: 44,
    calories: 700,
    diets: ["none"],
  };
  const recipesList = ["mock-recipe-1", "mock-recipe-2"];

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    mongoConnect(mongoServer.getUri());
    await agent.post("/api/auth/signup").send(mockUser);
    await populateRecipes();
  });

  beforeEach(async () => {
    await agent.post("/api/auth/signup").send(mockUser);
  });

  afterEach(async () => {
    await agent.delete(`/api/auth/${mockUser.username}`);
  });

  afterAll(async () => {
    await mongoDisconnect();
    await mongoServer.stop();
  });

  it("successfully fetches saved recipes", async () => {
    const res = await agent
      .post(`${baseUrl}/saved`)
      .send(recipesList)
      .expect("Content-Type", /json/)
      .expect(200);
    expect(res.body[0].recipeId).toBe("mock-recipe-1");
  });

  describe("User verification tests", () => {
    it("successfully verifies the user if authencticated", async () => {
      const res = await agent
        .get(`${baseUrl}/verify`)
        .expect("Content-Type", /json/)
        .expect(200);
      expect(res.body).toBe("Verification successful!");
    });

    it("returns an error with status code 401 if the user is not authenticated", async () => {
      await agent.post("/api/auth/logout");
      const res = await agent.get(`${baseUrl}/verify`).expect(401);
      expect(res.body.error).toBe("User not authenticated");
    });

    it("returns an error with status code 401 if the user id doesn't match the db", async () => {
      // Clears the DB so that the user cannot be found
      await usersDB.deleteMany();
      const res = await agent.get(`${baseUrl}/verify`).expect(401);
      expect(res.body.error).toBe("Invalid user ID");
    });
  });

  it("successfully saves and removes a recipe", async () => {
    let res = await agent
      .post(`${baseUrl}/saved/mock-recipe-test`)
      .expect("Content-Type", /json/)
      .expect(200);
    expect(res.body).toHaveLength(1);
    expect(res.body.at(0)).toBe("mock-recipe-test");

    res = await agent
      .delete(`${baseUrl}/saved/mock-recipe-test`)
      .expect("Content-Type", /json/)
      .expect(200);
    expect(res.body).toHaveLength(0);
    expect(res.body.at(0)).toBeUndefined();
  });
});
