import { useCallback, useEffect, useState } from "react";

const useRecipes = (page: number) => {
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getRecipes = useCallback(async () => {
        setIsLoading(true);
        const res = await fetch(`https://localhost:8000/recipes?page=${page}`);
        setRecipes(await res.json());
        setIsLoading(false);
    }, [page]);

    useEffect(() => {
        getRecipes();
    }, [getRecipes]);

    return {recipes, isLoading};
}

export default useRecipes;