export type RecipeInfo = {
    title: string;
    sourceUrl: string;
    imageUrl: string;
    ingredients: string[];
    instructions: object[];
    calories: { name: string; amount: number; unit: string };
    readyInMinutes: number;
    servings: number;
    diets: string[];
  };