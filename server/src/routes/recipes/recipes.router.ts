import express from "express";
import {httpGetRecipe, httpGetRecipes} from "./recipes.controller";

const recipesRouter = express.Router();

recipesRouter.get("/", httpGetRecipes);

recipesRouter.get("/:recipeId", httpGetRecipe);

export default recipesRouter;