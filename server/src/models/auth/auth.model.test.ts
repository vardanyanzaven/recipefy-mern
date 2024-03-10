import bcrypt from "bcrypt";
import { MongoMemoryServer } from "mongodb-memory-server";
import usersDB from "./auth.mongo";
import { mongoConnect, mongoDisconnect } from "../../services/mongo";
import { signInUser, signUpUser } from "./auth.model";

describe("Auth model tests", () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoConnect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoDisconnect();
    await mongoServer.stop();
  });

  const mockUser = {
    username: "mockuser",
    email: "mock@gmail.com",
    password: "MockPass1$",
    age: 44,
    calories: 700,
    diets: ["none"],
  };

  describe("Sign Up tests", () => {
    beforeEach(async () => {
      await usersDB.deleteMany({});
    });

    it("throws an error if any of the fields are missing", async () => {
      let errorMsg = "";
      try {
        await signUpUser({ ...mockUser, username: "" });
      } catch (err) {
        errorMsg = (err as Error).message;
      }

      expect(errorMsg).toEqual("All fields must be filled");
    });

    it("throws an error if email is already in use", async () => {
      await signUpUser({ ...mockUser, username: "anotherusername" });
      let errorMsg = "";
      try {
        await signUpUser({ ...mockUser });
      } catch (err) {
        errorMsg = (err as Error).message;
      }

      expect(errorMsg).toEqual("Email already in use");
    });

    it("throws an error if username is already in use", async () => {
      await signUpUser({ ...mockUser, email: "another@gmail.com" });
      let errorMsg = "";
      try {
        await signUpUser({ ...mockUser });
      } catch (err) {
        errorMsg = (err as Error).message;
      }

      expect(errorMsg).toEqual("Username already in use");
    });

    it("successfully signs up the user and encrypts the password", async () => {
      const user = await signUpUser(mockUser);
      const isUserSaved = Boolean(await usersDB.findOne({ email: user.email }));
      const isPasswordEncrypted = await bcrypt.compare(
        mockUser.password,
        user.password
      );

      expect(isUserSaved).toBe(true);
      expect(isPasswordEncrypted).toBe(true);
    });
  });

  describe("Sign In tests", () => {
    beforeAll(async () => {
      await usersDB.deleteMany({});
      await signUpUser(mockUser);
    });

    it("successfully signs in the user", async () => {
      const user = await signInUser({
        email: mockUser.email,
        password: mockUser.password,
      });

      expect(user).toBeTruthy();
    });

    it("throws an error if the email doesn't match any users", async () => {
      let errorMsg = "";
      try {
        await signInUser({ ...mockUser, email: "wrongemail@gmail.com" });
      } catch (err) {
        errorMsg = (err as Error).message;
      }

      expect(errorMsg).toEqual("No users matching this email");
    });

    it("throws an error if the email is invalid", async () => {
      let errorMsg = "";
      try {
        await signInUser({ ...mockUser, email: "invalidemail" });
      } catch (err) {
        errorMsg = (err as Error).message;
      }

      expect(errorMsg).toEqual("Email is not valid");
    });

    it("throws an error if an incorrect password is passed", async () => {
      let errorMsg = "";
      try {
        await signInUser({ email: mockUser.email, password: "wrong-pass" });
      } catch (err) {
        errorMsg = (err as Error).message;
      }

      expect(errorMsg).toEqual("Incorrect password");
    });
  });
});
