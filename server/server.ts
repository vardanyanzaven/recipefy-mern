import { createServer } from "https";
import { readFileSync } from "fs";
import dotenv from "dotenv";

import app from "./app";
import { mongoConnect } from "./services/mongo";

dotenv.config();

const server = createServer(
  {
    key: readFileSync("../../recipefy-certs/key.pem"),
    cert: readFileSync("../../recipefy-certs/cert.pem"),
  },
  app
);

server.listen(process.env.PORT as string, async () => {
  await mongoConnect();
  console.log(`Server listening on port ${process.env.PORT}...`);
});