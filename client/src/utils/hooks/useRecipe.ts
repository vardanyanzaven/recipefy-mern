import { useCallback, useEffect, useState } from "react";
import { RecipeInfo } from "@typings/recipes";
import { BASE_API_URL } from "../../constants";

const useRecipe = (recipeId: string) => {
  const [values, setValues] = useState<{
    recipe: RecipeInfo;
    isLoading: boolean;
  }>({ recipe: {} as RecipeInfo, isLoading: true });

  const getRecipe = useCallback(async () => {
    const res = await fetch(`/${BASE_API_URL}/recipes/${recipeId}`);
    setValues({ recipe: await res.json(), isLoading: false });
  }, [recipeId]);

  useEffect(() => {
    getRecipe();
  }, [getRecipe]);

  return { recipe: values.recipe, isLoading: values.isLoading };
};

export default useRecipe;
