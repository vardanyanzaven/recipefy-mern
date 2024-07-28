import request from "supertest";
import app from "../../app";
import usersDB from "../../models/user/user.mongo";
import { mongoConnect, mongoDisconnect } from "../../services/mongo";
import { MongoMemoryServer } from "mongodb-memory-server";

describe("Auth controller tests", () => {
  let mongoServer: MongoMemoryServer;
  const baseUrl = "/api/auth";

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoConnect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoDisconnect();
    await mongoServer.stop();
  });

  const mockCredentials = {
    username: "mockuser",
    email: "mock@gmail.com",
    password: "8CharLong$",
    age: 44,
    calories: 700,
    diets: ["none"],
  };

  const agent = request.agent(app);

  describe("Sign Up tests", () => {
    afterEach(async () => {
      await usersDB.deleteMany();
    });

    it("returns a status code 201, user info and sets the cookie", async () => {
      const res = await agent
        .post(`${baseUrl}/signup`)
        .send(mockCredentials)
        .expect("Content-Type", /json/)
        .expect(201);

      expect(res.body).toEqual({
        ...mockCredentials,
        password: undefined,
        savedRecipes: [],
      });

      // Checks if the token has been set
      expect(res.headers["set-cookie"]).toHaveLength(1);
    });

    it("returns a status code of 400 and an error if an error occurs", async () => {
      const res = await agent
        .post(`${baseUrl}/signup`)
        .send({ ...mockCredentials, username: "" })
        .expect(400);

      expect(res.body.credentialErr).toBeDefined();
    });
  });

  describe("Sign In tests", () => {
    beforeAll(async () => {
      await agent.post(`${baseUrl}/signup`).send(mockCredentials);
    });

    it("returns a status code 200, user info and sets the cookie", async () => {
      const res = await agent
        .post(`${baseUrl}/signin`)
        .send({
          email: mockCredentials.email,
          password: mockCredentials.password,
        })
        .expect("Content-Type", /json/)
        .expect(200);

      expect(res.body).toEqual({
        ...mockCredentials,
        password: undefined,
        savedRecipes: [],
      });

      // Checks if the token has been set
      // Checks the first character after "auth-token="
      expect(res.headers["set-cookie"][0][11]).not.toBe(";");
    });

    it("returns a status code 400 and an error if an error occurs", async () => {
      const res = await agent
        .post(`${baseUrl}/signin`)
        .send({
          email: mockCredentials.email,
          password: "wrongpass",
        })
        .expect(400);
      expect(res.body.credentialErr).toBeDefined();
    });
  });

  describe("User logout tests", () => {
    it("returns a status code 200 and successfully clears the cookie", async () => {
      const res = await agent.post(`${baseUrl}/logout`).expect(200);

      // Checks if the token has been set
      // Checks the first character after "auth-token="
      expect(res.headers["set-cookie"][0][11]).toBe(";");
    });
  });

  describe("Delete user tests", () => {
    it("returns a status code 200 and deletes the user from the database", async () => {
      await agent.post(`${baseUrl}/signup`).send(mockCredentials);
      const res = await agent.delete(`${baseUrl}/${mockCredentials.username}`).expect(200);

      expect(res.headers["set-cookie"][0][11]).toBe(";");
    });
  });
});
