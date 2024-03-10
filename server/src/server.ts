import { createServer } from "https";
import { readFileSync } from "fs";
import dotenv from "dotenv";

import app from "./app";
import { mongoConnect } from "./services/mongo";
import { loadRecipes } from "./models/recipes/recipes.model";

dotenv.config();

const server = createServer(
  {
    key: readFileSync("../../recipefy-certs/key.pem"),
    cert: readFileSync("../../recipefy-certs/cert.pem"),
  },
  app
);

server.listen(process.env.PORT as string, async () => {
  await mongoConnect(process.env.NODE_ENV === "test" ? process.env.MONGO_DB_TEST_URL as string : process.env.MONGO_DB_URL as string);
  await loadRecipes();
  console.log(`Server listening on port ${process.env.PORT}...`);
});
