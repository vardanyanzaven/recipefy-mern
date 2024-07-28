import express, { Request, Response } from "express";
import verifyUser from "../../services/middlewares/verifyUser";
import { httpGetRecipes } from "../recipes/recipes.controller";
import { httpToggleRecipe } from "./user.controller";

const userRouter = express.Router();

userRouter.use(verifyUser);
userRouter.get("/verify", (req: Request, res: Response) => res.status(200).json("Verification successful!"));
userRouter.post("/saved", httpGetRecipes);
userRouter.post("/saved/:recipeId", httpToggleRecipe);
userRouter.delete("/saved/:recipeId", httpToggleRecipe);

export default userRouter;
