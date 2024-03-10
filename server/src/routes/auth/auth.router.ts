import express from "express";
import { httpSignInUser, httpSignUpUser, httpLogoutUser, httpDeleteUser } from "./auth.controller";

const authRouter = express.Router();

authRouter.post("/signup", httpSignUpUser);

authRouter.post("/signin", httpSignInUser);

authRouter.post("/logout", httpLogoutUser);

authRouter.delete("/:username", httpDeleteUser);

export default authRouter;
