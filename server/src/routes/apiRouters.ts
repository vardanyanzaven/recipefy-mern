import express from "express";
import authRouter from "./auth/auth.router";
import recipesRouter from "./recipes/recipes.router";

const apiRouter = express.Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/recipes", recipesRouter);

export default apiRouter;