import { useCallback, useEffect, useState } from "react";
import { RecipeInfo } from "@typings/recipes";

const useRecipes = (page?: number) => {
  const [values, setValues] = useState<{
    recipes: RecipeInfo[];
    isLoading: boolean;
  }>({ recipes: [] as RecipeInfo[], isLoading: false });

  const getRecipes = useCallback(async () => {
    setValues({ ...values, isLoading: true });
    const res = await fetch(`https://localhost:8000/api/recipes?page=${page}`);
    setValues({ recipes: await res.json(), isLoading: false });
  }, [page, values]);

  useEffect(() => {
    getRecipes();
  }, [getRecipes]);

  return { recipes: values.recipes, isLoading: values.isLoading };
};

export default useRecipes;
