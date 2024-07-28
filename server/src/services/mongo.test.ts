import mongoose from "mongoose";
import dotenv from "dotenv";
import { mongoConnect, mongoDisconnect } from "./mongo";
import { MongoMemoryServer } from "mongodb-memory-server";

dotenv.config();

describe("Tests for MongoDB connection", () => {
  let mongoServer: MongoMemoryServer;
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
  });

  afterAll(async () => {
    await mongoServer.stop();
  });
  it("successfully connects and disconnects from MongoDB", async () => {
    await mongoConnect(mongoServer.getUri());
    expect(mongoose.connection.readyState).toBe(1);

    await mongoDisconnect();
    expect(mongoose.connection.readyState).toBe(0);
  });
});
