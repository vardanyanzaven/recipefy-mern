import express, { Request, Response } from "express";
import helmet from "helmet";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.router";

const app = express();

const corsOptions: CorsOptions = {
  origin: "http://localhost:3000",
};

app.use(helmet());

app.use(express.json());

app.use(
  cors(corsOptions)
);

app.use(cookieParser());

app.use(morgan("common"));

app.use("/auth", authRouter);

// TODO: Add res.sendFile for index.html in server/public

export default app;
