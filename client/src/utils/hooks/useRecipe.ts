import { useCallback, useEffect, useState } from "react";
import { RecipeInfo } from "../../pages/recipes/RecipesPage.types";

const useRecipe = (recipeId: string) => {
    const [values, setValues] = useState<{recipe: RecipeInfo, isLoading: boolean}>({recipe: {} as RecipeInfo, isLoading: true});

    const getRecipe = useCallback(async () => {
        const res = await fetch(`https://localhost:8000/recipes/${recipeId}`);
        setValues({recipe: await res.json(), isLoading: false});
    }, [recipeId]);

    useEffect(() => {
        getRecipe();
    }, [getRecipe]);

    return {recipe: values.recipe, isLoading: values.isLoading};
}

export default useRecipe;