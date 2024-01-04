import { useCallback, useEffect, useState } from "react";

const useRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getRecipes = useCallback(async () => {
        setIsLoading(true);
        const res = await fetch("https://localhost:8000/recipes");
        setRecipes(await res.json());
        setIsLoading(false);
    }, []);

    useEffect(() => {
        getRecipes();
    }, [getRecipes]);

    return {recipes, isLoading};
}

export default useRecipes;