import bcrypt from "bcrypt";
import { MongoMemoryServer } from "mongodb-memory-server";
import { mockCredentials } from "../../../test-utils/constants.tests";
import usersDB from "../user/user.mongo";
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

  describe("Sign Up tests", () => {
    beforeEach(async () => {
      await usersDB.deleteMany({});
    });

    it("throws an error if any of the fields are missing", async () => {
      let errorMsg = "";
      try {
        await signUpUser({ ...mockCredentials, username: "" });
      } catch (err) {
        errorMsg = (err as Error).message;
      }

      expect(errorMsg).toEqual("All fields must be filled");
    });

    it("throws an error if email is already in use", async () => {
      await signUpUser({ ...mockCredentials, username: "anotherusername" });
      let errorMsg = "";
      try {
        await signUpUser({ ...mockCredentials });
      } catch (err) {
        errorMsg = (err as Error).message;
      }

      expect(errorMsg).toEqual("Email already in use");
    });

    it("throws an error if username is already in use", async () => {
      await signUpUser({ ...mockCredentials, email: "another@gmail.com" });
      let errorMsg = "";
      try {
        await signUpUser({ ...mockCredentials });
      } catch (err) {
        errorMsg = (err as Error).message;
      }

      expect(errorMsg).toEqual("Username already in use");
    });

    it("successfully signs up the user and encrypts the password", async () => {
      const user = await signUpUser(mockCredentials);
      const isUserSaved = Boolean(await usersDB.findOne({ email: user.email }));
      const isPasswordEncrypted = await bcrypt.compare(
        mockCredentials.password,
        user.password
      );

      expect(isUserSaved).toBe(true);
      expect(isPasswordEncrypted).toBe(true);
    });
  });

  describe("Sign In tests", () => {
    beforeAll(async () => {
      await usersDB.deleteMany({});
      await signUpUser(mockCredentials);
    });

    it("successfully signs in the user", async () => {
      const user = await signInUser({
        email: mockCredentials.email,
        password: mockCredentials.password,
      });

      expect(user).toBeTruthy();
    });

    it("throws an error if the email doesn't match any users", async () => {
      let errorMsg = "";
      try {
        await signInUser({ ...mockCredentials, email: "wrongemail@gmail.com" });
      } catch (err) {
        errorMsg = (err as Error).message;
      }

      expect(errorMsg).toEqual("No users matching this email");
    });

    it("throws an error if the email is invalid", async () => {
      let errorMsg = "";
      try {
        await signInUser({ ...mockCredentials, email: "invalidemail" });
      } catch (err) {
        errorMsg = (err as Error).message;
      }

      expect(errorMsg).toEqual("Email is not valid");
    });

    it("throws an error if an incorrect password is passed", async () => {
      let errorMsg = "";
      try {
        await signInUser({
          email: mockCredentials.email,
          password: "wrong-pass",
        });
      } catch (err) {
        errorMsg = (err as Error).message;
      }

      expect(errorMsg).toEqual("Incorrect password");
    });
  });
});
