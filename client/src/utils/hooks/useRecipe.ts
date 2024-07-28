import { useCallback, useEffect, useState } from "react";
import { RecipeInfo } from "@typings/recipes";
import { BASE_API_URL } from "../../constants";

const useRecipe = (recipeId: string) => {
  const [values, setValues] = useState<{
    recipe: RecipeInfo;
    isLoading: boolean;
  }>({ recipe: {} as RecipeInfo, isLoading: true });

  const getRecipe = useCallback(async () => {
    const res = await fetch(`${BASE_API_URL}/recipes/${recipeId}`);
    const recipe = await res.json();

    // 0 needs to be selected because the recipe is stored in an object with a key of 0
    setValues({ recipe: recipe[0], isLoading: false });
  }, [recipeId]);

  useEffect(() => {
    getRecipe();
  }, [getRecipe]);

  return { recipe: values.recipe, isLoading: values.isLoading };
};

export default useRecipe;
