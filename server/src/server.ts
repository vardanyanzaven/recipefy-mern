import { createServer } from "https";
import fs from "fs";
import dotenv from "dotenv";

import app from "./app";
import { mongoConnect } from "./services/mongo";
import { loadRecipes } from "./models/recipes/recipes.model";
import path from "path";

dotenv.config();

const server = createServer({
  key: fs.readFileSync(path.join(__dirname, process.env.NODE_ENV === "production" ? ".." : ".", "..", "..", "certs", "key.pem")),
  cert: fs.readFileSync(path.join(__dirname, process.env.NODE_ENV === "production" ? ".." : ".", "..", "..", "certs", "cert.pem"))
}, app);

server.listen(process.env.PORT as string, async () => {
  await mongoConnect(
    process.env.NODE_ENV === "test"
      ? (process.env.MONGO_DB_TEST_URL as string)
      : (process.env.MONGO_DB_URL as string)
  );
  process.env.NODE_ENV !== "test" && await loadRecipes();
  console.log(`Server listening on port ${process.env.PORT}...`);
});
