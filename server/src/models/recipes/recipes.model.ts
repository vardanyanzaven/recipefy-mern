import dotenv from "dotenv";
import axios from "axios";
import recipesDB from "./recipes.mongo";
import { ResRecipe, RecipeInfo, Instruction } from "@typings/recipes";

dotenv.config();

const SPOONACULAR_API_URL = `https://api.spoonacular.com/recipes/complexSearch?number=100&apiKey=${process.env.SPOONACULAR_API_KEY}&minCalories=0&instructionsRequired=true&addRecipeInformation=true&fillIngredients=true&includeNutrition=true`;

const addRecipe = async (recipe: RecipeInfo) => {
  await recipesDB.findOneAndUpdate(
    {
      title: recipe.title,
    },
    recipe,
    { upsert: true }
  );
};

const getAllRecipes = async (page: number) =>
  await recipesDB
    .find({}, { _id: 0, __v: 0 })
    .skip((page - 1) * 10)
    .limit(10);

const getRecipesByIds = async (recipeIds: string[]) =>
  await recipesDB.find({ recipeId: { $in: recipeIds } }, { _id: 0, __v: 0 });

const populateRecipes = async () => {
  const res = await axios.get(SPOONACULAR_API_URL);

  if (res.status !== 200) {
    console.log("Problem fetching recipe data");
    throw new Error("Recipe data download failed");
  }

  const recipeData: ResRecipe[] = res.data.results;

  for (const meal of recipeData) {
    const {
      title,
      sourceUrl,
      image: imageUrl,
      extendedIngredients,
      analyzedInstructions,
      nutrition,
      readyInMinutes,
      servings,
      diets,
    } = meal;

    const ingredients: string[] = [];
    extendedIngredients.forEach((ingredientData) => {
      ingredients.push(ingredientData.nameClean);
    });

    const instructions: Instruction[] = [];
    analyzedInstructions[0]?.steps.forEach((instructionData) => {
      const instruction = {
        number: instructionData.number,
        step: instructionData.step,
      };

      instructions.push(instruction);
    });

    const calories = Math.floor(
      Math.floor(nutrition.nutrients[0].amount / 10) * 10
    );

    const recipeId = title.toLowerCase().split(" ").join("-");

    const recipe = {
      recipeId,
      title,
      sourceUrl,
      imageUrl,
      ingredients,
      instructions,
      calories,
      readyInMinutes,
      servings,
      diets,
    };

    await addRecipe(recipe);
  }

  await getAllRecipes(1);
};

const loadRecipes = async () => {
  const firstRecipe = await recipesDB.findOne({
    title: "Cannellini Bean and Asparagus Salad with Mushrooms",
  });

  if (firstRecipe) console.log("Recipes data already loaded");
  else await populateRecipes();
};

export {
  addRecipe,
  getAllRecipes,
  getRecipesByIds,
  populateRecipes,
  loadRecipes,
};
