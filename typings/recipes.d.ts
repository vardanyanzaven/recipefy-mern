export type Instruction = {
  number: number;
  step: string;
};

export type Nutrition = {
  name: string;
  amount: number;
  unit: string;
};

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

export type ResRecipe = {
  title: string;
  sourceUrl: string;
  image: string;
  extendedIngredients: { nameClean: string }[];
  analyzedInstructions: [{ steps: Instruction[] }];
  nutrition: { nutrients: Nutrition[] };
  readyInMinutes: number;
  servings: number;
  diets: string[];
};
