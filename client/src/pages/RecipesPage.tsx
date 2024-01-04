import React, { useEffect } from "react";
import useRecipes from "../utils/hooks/useRecipes";
import { Box, Card, CardMedia, Grid, Typography } from "@mui/material";
import Spinner from "../components/spinner/Spinner";
import Button, { BUTTON_TYPES } from "../components/button/Button";

const RecipesPage = ({
  setActivePage,
}: {
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { recipes, isLoading } = useRecipes();

  useEffect(() => {
    setActivePage("recipes");
  });

  return (
    <Box sx={{ marginTop: 15 }}>
      {isLoading ? (
        <Spinner />
      ) : (
        <Grid
          container
          sx={{ padding: "0 40px" }}
          columnSpacing={2}
          rowSpacing={3}
        >
          {recipes.map(
            (recipe: {
              title: string;
              sourceUrl: string;
              imageUrl: string;
              ingredients: string[];
              instructions: object[];
              calories: { name: string; amount: number; unit: string };
              readyInMinutes: number;
              servings: number;
              diets: string[];
            }) => {
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
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    style={{ width: "100%" }}
                  >
                    <Card
                      sx={{
                        width: 275,
                        height: 350,
                        borderRadius: "15px",
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
                          height: 175,
                          padding: "10px 20px",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "space-around",
                        }}
                      >
                        <Typography
                          sx={{ textAlign: "center", fontSize: "15px" }}
                        >
                          {recipe.title}
                        </Typography>
                        <Box
                          sx={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <Typography sx={{ fontSize: "15px" }}>
                            Ingredients: {recipe.ingredients.length}
                          </Typography>
                          <Typography sx={{ fontSize: "15px" }}>
                            Calories:{" "}
                            {Math.ceil(
                              Math.floor(recipe.calories.amount) / 10
                            ) * 10}
                          </Typography>
                        </Box>
                        <Button
                          buttonType={BUTTON_TYPES.colored}
                          style={{
                            fontSize: "18px",
                            width: "100px",
                            position: "relative",
                            bottom: 0,
                          }}
                        >
                          View More
                        </Button>
                      </Box>
                    </Card>
                  </Box>
                </Grid>
              );
            }
          )}
        </Grid>
      )}
    </Box>
  );
};

export default RecipesPage;
