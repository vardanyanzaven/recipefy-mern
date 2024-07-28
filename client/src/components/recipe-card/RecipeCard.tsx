import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Card, CardMedia, Typography } from "@mui/material";
import { Bookmark, BookmarkBorder } from "@mui/icons-material";
import { RecipeInfo } from "@typings/recipes";
import { BriefInfoBox } from "./RecipeCard.styles";
import StyledButton, { BUTTON_TYPES } from "../button/StyledButton";
import { BASE_API_URL } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../redux/hooks.redux";
import { setSavedRecipes } from "../../redux/redux-slices/user.slice";
import useSnackbar from "../snackbar/Snackbar";

const RecipeCard = ({ recipe }: { recipe: RecipeInfo }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { CustomSnackbar, handleOpen } = useSnackbar();

  const briefInfo = [
    { name: "Ingredients", value: recipe.ingredients.length },
    {
      name: "Calories",
      value: Math.ceil(Math.floor(recipe.calories) / 10) * 10,
    },
    { name: "Prep time", value: `${recipe.readyInMinutes}m` },
    { name: "Servings", value: recipe.servings },
  ];
  const savedRecipes = useAppSelector((state) => state.user.savedRecipes);
  const [isRecipeSaved, setIsRecipeSaved] = useState(
    savedRecipes.includes(recipe.recipeId) || false
  );
  const toggleSaveRecipe = async () => {
    const res = await fetch(`${BASE_API_URL}/user/saved/${recipe.recipeId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: isRecipeSaved ? "delete" : "post",
    });
    // The result is either the saved recipes or the error
    const result = await res.json();
    if (!res.ok) {
      console.log(result.error);
      handleOpen("Sign in to save recipes!");
      return;
    }

    dispatch(setSavedRecipes(result));
    setIsRecipeSaved(!isRecipeSaved);

    handleOpen(`Recipe ${isRecipeSaved ? "removed" : "saved"}!`);
  };

  return (
    <>
      <Box
        data-testid="recipe-card"
        display="flex"
        justifyContent="center"
        sx={{ width: "100%" }}
      >
        <Card
          sx={{
            width: 320,
            height: 400,
            backgroundColor: "#effefe",
            borderRadius: "15px",
            boxShadow: "0 1px 5px rgba(0, 0, 0, 0.5)",
          }}
        >
          <CardMedia
            component="img"
            height="175"
            image={recipe.imageUrl}
            alt={recipe.title}
          />
          <Box
            sx={{
              height: 225,
              padding: "10px 11px 20px 11px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                textAlign: "center",
                fontSize: "18px",
              }}
            >
              {recipe.title}
            </Typography>
            <Box sx={{ display: "flex", width: "100%" }}>
              <BriefInfoBox>
                {briefInfo
                  .slice(0, 2)
                  .map((info: { name: string; value: string | number }) => (
                    <Typography
                      data-testid={info.name}
                      key={info.name}
                      sx={{ fontSize: { xs: "0.9rem", md: "0.95rem" } }}
                    >
                      {info.name}: {info.value}
                    </Typography>
                  ))}
              </BriefInfoBox>
              <BriefInfoBox sx={{ alignItems: "flex-end" }}>
                {briefInfo
                  .slice(2, 4)
                  .map((info: { name: string; value: string | number }) => (
                    <Typography
                      data-testid={info.name}
                      key={info.name}
                      sx={{ fontSize: { xs: "0.9rem", md: "0.95rem" } }}
                    >
                      {info.name}: {info.value}
                    </Typography>
                  ))}
              </BriefInfoBox>
            </Box>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <StyledButton
                data-testid="view-more-btn"
                buttonType={BUTTON_TYPES.colored}
                style={{
                  minWidth: "125px",
                  fontSize: "18px",
                  position: "relative",
                  top: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
                onClick={() => navigate(recipe.recipeId)}
              >
                View More
              </StyledButton>
              <Box onClick={toggleSaveRecipe} className="save-btn">
                {isRecipeSaved ? (
                  <Bookmark sx={{ cursor: "pointer", color: "#3bd6c6" }} />
                ) : (
                  <BookmarkBorder
                    sx={{ cursor: "pointer", color: "#3bd6c6" }}
                  />
                )}
              </Box>
            </Box>
          </Box>
        </Card>
      </Box>
      <CustomSnackbar />
    </>
  );
};

export default RecipeCard;
