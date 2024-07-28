import { MongoMemoryServer } from "mongodb-memory-server";
import usersDB from "../user/user.mongo";
import { mongoConnect, mongoDisconnect } from "../../services/mongo";
import { removeRecipe, saveRecipe } from "./user.model";
import { mockCredentials } from "../../../test-utils/constants.tests";

describe("User model tests", () => {
  let mongoServer: MongoMemoryServer;
  const mockRecipeId = "mockRecipeId";
  let mockUserId = "";

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoConnect(mongoServer.getUri());
    const userData = await usersDB.create(mockCredentials);
    mockUserId = userData?._id as unknown as string;
  });

  afterAll(async () => {
    await mongoDisconnect();
    await mongoServer.stop();
  });

  describe("saveRecipe tests", () => {
    it("succesfully saves the recipe ID and returns an updated list of saved recipes", async () => {
      const savedRecipesList = (await saveRecipe(
        mockUserId,
        mockRecipeId
      )) as string[];
      expect(savedRecipesList).toHaveLength(1);
      expect(savedRecipesList[0]).toBe(mockRecipeId);
    });
  });

  describe("removeRecipe tests", () => {
    beforeEach(async () => {
      await usersDB.findByIdAndUpdate(mockUserId, {
        $push: { savedRecipes: mockRecipeId },
      });
    });

    it("succesfully removes the recipe ID and returns an updated list of saved recipes", async () => {
      const savedRecipesList = (await removeRecipe(
        mockUserId,
        mockRecipeId
      )) as string[];
      expect(savedRecipesList).toHaveLength(0);
    });
  });
});
