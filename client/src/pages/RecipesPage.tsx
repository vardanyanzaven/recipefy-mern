import React, { useEffect } from "react";

const RecipesPage = ({
  setActivePage,
}: {
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  useEffect(() => {
    setActivePage("recipes");
  }, []);
  return <div>RecipesPage</div>;
};

export default RecipesPage;
