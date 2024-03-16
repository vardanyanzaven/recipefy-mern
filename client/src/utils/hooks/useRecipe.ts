import { useCallback, useEffect, useState } from "react";
import { RecipeInfo } from "@typings/recipes";

const useRecipe = (recipeId: string) => {
  const [values, setValues] = useState<{
    recipe: RecipeInfo;
    isLoading: boolean;
  }>({ recipe: {} as RecipeInfo, isLoading: true });

  const getRecipe = useCallback(async () => {
    const res = await fetch(`http://localhost:8000/api/recipes/${recipeId}`);
    setValues({ recipe: await res.json(), isLoading: false });
  }, [recipeId]);

  useEffect(() => {
    getRecipe();
  }, [getRecipe]);

  return { recipe: values.recipe, isLoading: values.isLoading };
};

export default useRecipe;
