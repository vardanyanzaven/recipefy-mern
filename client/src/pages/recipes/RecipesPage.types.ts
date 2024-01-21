export type RecipeInfo = {
  recipeId: string;
  title: string;
  sourceUrl: string;
  imageUrl: string;
  ingredients: string[];
  instructions: { step: string; number: number }[];
  calories: number;
  readyInMinutes: number;
  servings: number;
  diets: string[];
};
