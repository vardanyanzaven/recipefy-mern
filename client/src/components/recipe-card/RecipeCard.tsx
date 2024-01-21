import React from "react";
import { Box, Card, CardMedia, Typography } from "@mui/material";
import StyledButton, { BUTTON_TYPES } from "../button/StyledButton";
import { RecipeInfo } from "../../pages/recipes/RecipesPage.types";
import { BriefInfoBox } from "./RecipeCard.styles";
import { useNavigate } from "react-router-dom";

const RecipeCard = ({ recipe }: { recipe: RecipeInfo }) => {
  const navigate = useNavigate();
  const briefInfo = [
    { name: "Ingredients", value: recipe.ingredients.length },
    {
      name: "Calories",
      value: Math.ceil(Math.floor(recipe.calories) / 10) * 10,
    },
    { name: "Prep time", value: `${recipe.readyInMinutes}m` },
    { name: "Servings", value: recipe.servings },
  ];

  return (
    <Box display="flex" justifyContent="center" sx={{ width: "100%" }}>
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
                    key={info.name}
                    sx={{ fontSize: { xs: "0.9rem", md: "0.95rem" } }}
                  >
                    {info.name}: {info.value}
                  </Typography>
                ))}
            </BriefInfoBox>
          </Box>
            <StyledButton
              buttonType={BUTTON_TYPES.colored}
              style={{
                fontSize: "18px",
              }}
              onClick={() => navigate(recipe.recipeId)}
            >
              View More
            </StyledButton>
        </Box>
      </Card>
    </Box>
  );
};

export default RecipeCard;
