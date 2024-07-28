import React, { useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { RecipeInfo } from "@typings/recipes";
import { Link } from "react-router-dom";
import RecipeCard from "../../components/recipe-card/RecipeCard";
import { useAppSelector } from "../../redux/hooks.redux";
import useRecipes from "../../utils/hooks/useRecipes";
import Spinner from "../../components/spinner/Spinner";

const SavedPage = ({
  setActivePage,
}: {
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const savedRecipesList = useAppSelector((state) => state.user.savedRecipes);
  const { recipes: savedRecipes, isLoading } = useRecipes(
    null,
    savedRecipesList
  );

  useEffect(() => {
    setActivePage("saved");
  });

  return isLoading ? (
    <Spinner />
  ) : savedRecipes.length === 0 ? (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
      }}
    >
      <Typography
        sx={{
          color: "#313838",
          marginBottom: "-10px",
          fontWeight: "bold",
          fontSize: { xs: "26px", sm: "30px", md: "34px" },
        }}
      >
        You haven't saved any recipes yet.
      </Typography>
      <Typography
        sx={{
          fontWeight: "bold",
          fontSize: { xs: "26px", sm: "30px", md: "34px" },
        }}
      >
        <Link
          to="/recipes"
          style={{
            color: "#3bd6c6",
            cursor: "pointer",
            textDecoration: "none",
          }}
        >
          Back to Recipes
        </Link>
      </Typography>
    </div>
  ) : (
    <Box
      sx={{
        padding: "125px 0 50px 0",
        display: "flex",
        justifyContent: "center",
        minHeight: "100%",
      }}
    >
      <Grid
        container
        sx={{
          padding: "0 40px",
          display: "flex",
          width: "100%",
          justifyContent: "center",
        }}
        spacing={3}
      >
        {savedRecipes.map((recipe: RecipeInfo) => {
          return (
            <Grid item key={recipe.title} xs={12} sm={6} md={4} lg={3} xl={2.4}>
              <RecipeCard recipe={recipe} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default SavedPage;
