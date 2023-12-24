import express from "express";
import { httpSignUpUser } from "./auth.controller";

const authRouter = express.Router();

authRouter.post("/sign-up", httpSignUpUser);

authRouter.post("/sign-in", () => {});

export default authRouter;