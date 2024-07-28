import express from "express";
import {httpGetRecipe, httpGetAllRecipes} from "./recipes.controller";

const recipesRouter = express.Router();

recipesRouter.get("/", httpGetAllRecipes);

recipesRouter.get("/:recipeId", httpGetRecipe);

export default recipesRouter;