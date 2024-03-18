import { RecipeInfo } from "@typings/recipes";

const mockRecipe = {
  recipeId: "recipe-id",
  title: "Mock Recipe",
  sourceUrl: "recipe-source-url",
  imageUrl: "recipe-image-url",
  ingredients: ["Ingr. 1", "Ingr. 2"],
  instructions: [{ step: "Step 1", number: 1 }],
  calories: 200,
  readyInMinutes: 45,
  servings: 3,
  diets: ["none"],
};

const createRecipes = () => {
  const recipesList = new Array(10)
    .fill({})
    .map((recipe: RecipeInfo, i: number) => ({
      ...mockRecipe,
      title: `${mockRecipe.title} ${i + 1}`,
      recipeId: `${mockRecipe.recipeId}-${i + 1}`
    }));

  return recipesList;
};

export default createRecipes;