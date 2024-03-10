import path from "path";
import express, { Request, Response } from "express";
import helmet from "helmet";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import apiRouter from "./routes/apiRouters";

const app = express();

const corsOptions: CorsOptions = {
  origin: "https://localhost:3000",
};

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      imgSrc: ["null", "*"],
    },
  })
);

app.use(express.json());

app.use(cors(corsOptions));

app.use(cookieParser());

app.use(morgan("common"));

app.use(express.static(path.join(__dirname, "..", process.env.NODE_ENV === "dev" ? "dist" : "..", "public")));

app.use("/api", apiRouter);

app.get("/*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "..", "..", "public", "index.html"));
});

export default app;
