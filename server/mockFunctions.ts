import { RecipeInfo, ResRecipe } from "@typings/recipes";

const mockRecipe: ResRecipe = {
  title: "Mock Recipe",
  sourceUrl: "mock-url",
  image: "mock-image-url",
  extendedIngredients: [],
  analyzedInstructions: [{ steps: [] }],
  nutrition: { nutrients: [{ name: "Calories", unit: "cal", amount: 200 }] },
  readyInMinutes: 40,
  servings: 2,
  diets: [],
};

const mockFetchRecipes = () => {
  const recipesList = new Array(10)
    .fill({})
    .map((recipe: RecipeInfo, i: number) => ({
      ...mockRecipe,
      title: `${mockRecipe.title} ${i + 1}`,
    }));

  return recipesList;
};

export { mockFetchRecipes };
