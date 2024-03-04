import express from "express";
import { httpSignInUser, httpSignUpUser } from "./auth.controller";

const authRouter = express.Router();

authRouter.post("/signup", httpSignUpUser);

authRouter.post("/signin", httpSignInUser);

export default authRouter;
