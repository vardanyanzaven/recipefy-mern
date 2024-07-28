import { Request, Response } from "express";
import {
  getAllRecipes,
  getRecipesByIds,
} from "../../models/recipes/recipes.model";

const httpGetAllRecipes = async (req: Request, res: Response) => {
  const { page } = req.query;
  const recipes = await getAllRecipes(Number(page));

  return res.status(200).json(recipes).end();
};

const httpGetRecipe = async (req: Request, res: Response) => {
  const { recipeId } = req.params;

  const recipe = await getRecipesByIds([recipeId]);

  return res.status(200).json(recipe).end();
};

const httpGetRecipes = async (req: Request, res: Response) => {
  const recipeIds: string[] = req.body;

  const recipes = await getRecipesByIds(recipeIds);

  return res.status(200).json(recipes).end();
};

export { httpGetAllRecipes, httpGetRecipe, httpGetRecipes };
