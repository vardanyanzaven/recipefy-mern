import { useCallback, useEffect, useState } from "react";
import { RecipeInfo } from "../../pages/recipes/RecipesPage.types";

const useRecipes = (page?: number) => {
    const [values, setValues] = useState<{recipes: RecipeInfo[], isLoading: boolean}>({recipes: [] as RecipeInfo[], isLoading: true});

    const getRecipes = useCallback(async () => {
        const res = await fetch(`https://localhost:8000/recipes?page=${page}`);
        setValues({recipes: await res.json(), isLoading: false})
    }, [page]);

    useEffect(() => {
        getRecipes();
    }, [getRecipes]);

    return {recipes: values.recipes, isLoading: values.isLoading};
};

export default useRecipes;