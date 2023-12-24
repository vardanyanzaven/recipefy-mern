import express from "express";
import { httpSignInUser, httpSignUpUser } from "./auth.controller";

const authRouter = express.Router();

authRouter.post("/sign-up", httpSignUpUser);

authRouter.post("/sign-in", httpSignInUser);

export default authRouter;