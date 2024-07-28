import { defineConfig } from "cypress";
import { configurePlugin } from "cypress-mongodb";
import {MongoMemoryServer} from "mongodb-memory-server";
import createRecipes from "./cypress/plugins/createRecipes";
import * as dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  env: {
    mongodb: {
      uri: process.env.MONGO_DB_TEST_URL,
      database: "test",
    },
  },
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        createRecipes,
      });
      configurePlugin(on);
    },
    baseUrl: "https://localhost:8000",
    experimentalStudio: true
  },
});