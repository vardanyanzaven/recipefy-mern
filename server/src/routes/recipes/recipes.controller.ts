import { Request, Response } from "express";
import {
  getAllRecipes,
  getRecipeById,
} from "../../models/recipes/recipes.model";

const httpGetRecipes = async (req: Request, res: Response) => {
  const { page } = req.query;
  const recipes = await getAllRecipes(Number(page));

  return res.status(200).json(recipes);
};

const httpGetRecipe = async (req: Request, res: Response) => {
  const { recipeId } = req.params;

  const recipe = await getRecipeById(recipeId);

  return res.status(200).json(recipe);
};

export { httpGetRecipes, httpGetRecipe };
