import request from "supertest";
import app from "../../app";
import { mongoConnect, mongoDisconnect } from "../../services/mongo";
import { MongoMemoryServer } from "mongodb-memory-server";

describe("Auth controller tests", () => {
  let mongoServer: MongoMemoryServer;
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

  describe("Sign Up tests", () => {
    it("returns a status code 201, user info and sets the cookie", async () => {
      const res = await request(app)
        .post("/auth/signup")
        .send(mockCredentials)
        .expect("Content-Type", /json/)
        .expect(201);

      expect(res.body).toEqual({
        username: mockCredentials.username,
        email: mockCredentials.email,
      });

      // Checks if the token has been set
      expect(res.headers["set-cookie"]).toHaveLength(1);
    });

    it("returns a status code of 400 and an error if an error occurs", async () => {
      const res = await request(app)
        .post("/auth/signup")
        .send({ ...mockCredentials, username: "" })
        .expect(400);

      expect(res.body.credentialErr).toBeDefined();
    });
  });

  describe("Sign In tests", () => {
    it("returns a status code 200, user info and sets the cookie", async () => {
      const res = await request(app)
        .post("/auth/signin")
        .send({
          email: mockCredentials.email,
          password: mockCredentials.password,
        })
        .expect("Content-Type", /json/)
        .expect(200);

      expect(res.body).toEqual({
        username: mockCredentials.username,
        email: mockCredentials.email,
      });

      // Checks if the token has been set
      expect(res.headers["set-cookie"]).toHaveLength(1);
    });

    it("returns a status code 400 and an error if an error occurs", async () => {
      const res = await request(app)
        .post("/auth/signin")
        .send({
          email: mockCredentials.email,
          password: "wrongpass",
        })
        .expect(400);
      expect(res.body.credentialErr).toBeDefined();
    });
  });
});
