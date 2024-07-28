import { Response } from "express";
import { UserRequest } from "@typings/user";
import { saveRecipe, removeRecipe } from "../../models/user/user.model";

const httpToggleRecipe = async (req: UserRequest, res: Response) => {
  const method = req.method;
  const userId = req.userId;
  const { recipeId } = req.params;

  try {
    let savedRecipes;
    if (method === "POST") {
      savedRecipes = await saveRecipe(userId as string, recipeId);
    }

    if (method === "DELETE") {
      savedRecipes = await removeRecipe(userId as string, recipeId);
    }

    return res.status(200).json(savedRecipes);
  } catch (err) {
    return res.status(400).json({ error: (err as Error).message });
  }
};

export { httpToggleRecipe };
