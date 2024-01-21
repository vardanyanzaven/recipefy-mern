import React, { useEffect, useState } from "react";
import useRecipes from "../../utils/hooks/useRecipes";
import { Box, Grid } from "@mui/material";
import Spinner from "../../components/spinner/Spinner";
import CustomPagination from "../../components/pagination/CustomPagination";
import { RecipeInfo } from "./RecipesPage.types";
import RecipeCard from "../../components/recipe-card/RecipeCard";

const RecipesPage = ({
  setActivePage,
}: {
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [page, setPage] = useState(1);
  const { recipes, isLoading } = useRecipes(page);

  useEffect(() => {
    setActivePage("recipes");
  });

  return (
    <Box
      sx={{
        padding: "125px 0 50px 0",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            rowGap: 8,
          }}
        >
          <Grid
            container
            sx={{
              padding: "0 40px",
              display: "flex",
              justifyContent: "center",
            }}
            spacing={3}
          >
            {recipes.map((recipe: RecipeInfo) => {
              return (
                <Grid
                  item
                  key={recipe.title}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  xl={2.4}
                >
                  <RecipeCard recipe={recipe} />
                </Grid>
              );
            })}
          </Grid>
          <CustomPagination
            count={10}
            page={page}
            changeHandler={
              ((e: React.ChangeEvent, value: number) =>
                setPage(value)) as React.ChangeEventHandler
            }
          />
        </Box>
      )}
    </Box>
  );
};

export default RecipesPage;
