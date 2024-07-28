import { useCallback, useEffect, useState } from "react";
import { RecipeInfo } from "@typings/recipes";
import { BASE_API_URL } from "../../constants";

const useRecipes = (page: number | null, recipes: string[] | null = null) => {
  const [values, setValues] = useState<{
    recipes: RecipeInfo[];
    isLoading: boolean;
    error?: string;
  }>({ recipes: [] as RecipeInfo[], isLoading: true });

  const getRecipes = useCallback(async () => {
    const res = recipes
      ? await fetch(`${BASE_API_URL}/user/saved`, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "post",
          body: JSON.stringify(recipes),
        })
      : await fetch(`${BASE_API_URL}/recipes?page=${page}`);

    const responseData = await res.json();

    if (!res.ok && responseData.hasOwnProperty("error")) {
      setValues({ ...values, error: responseData.error });
      return;
    }

    setValues({ recipes: responseData, isLoading: false });
  }, [page, recipes]);

  useEffect(() => {
    getRecipes();
  }, [getRecipes]);

  return {
    recipes: values.recipes,
    isLoading: values.isLoading,
    error: values.error,
  };
};

export default useRecipes;
