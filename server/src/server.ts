import { createServer } from "http";
import dotenv from "dotenv";

import app from "./app";
import { mongoConnect } from "./services/mongo";
import { loadRecipes } from "./models/recipes/recipes.model";

dotenv.config({path: "../.env"});
dotenv.config({path: "../../.env"});

const server = createServer(app);

server.listen(process.env.PORT as string, async () => {
  await mongoConnect(
    process.env.NODE_ENV === "test"
      ? (process.env.MONGO_DB_TEST_URL as string)
      : (process.env.MONGO_DB_URL as string)
  );
  await loadRecipes();
  console.log(`Server listening on port ${process.env.PORT}...`);
});
