import express from "express";
import authRouter from "./auth/auth.router";
import userRouter from "./user/user.router";
import recipesRouter from "./recipes/recipes.router";

const apiRouter = express.Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/user", userRouter);
apiRouter.use("/recipes", recipesRouter);

export default apiRouter;