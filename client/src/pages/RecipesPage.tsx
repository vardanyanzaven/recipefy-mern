import React, { useEffect, useState } from "react";
import useRecipes from "../utils/hooks/useRecipes";
import {
  Box,
  Card,
  CardMedia,
  Grid,
  Pagination,
  Typography,
} from "@mui/material";
import Spinner from "../components/spinner/Spinner";
import Button, { BUTTON_TYPES } from "../components/button/Button";

export type RecipeInfo = {
  title: string;
  sourceUrl: string;
  imageUrl: string;
  ingredients: string[];
  instructions: object[];
  calories: { name: string; amount: number; unit: string };
  readyInMinutes: number;
  servings: number;
  diets: string[];
};

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
                  <Box
                    display="flex"
                    justifyContent="center"
                    style={{ width: "100%" }}
                  >
                    <Card
                      sx={{
                        width: 300,
                        height: 350,
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
                          height: 175,
                          padding: "10px 10px",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "space-around",
                        }}
                      >
                        <Typography
                          sx={{
                            textAlign: "center",
                            fontSize: "15px",
                          }}
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
                          }}
                          // onClick={}
                        >
                          View More
                        </Button>
                      </Box>
                    </Card>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
          <Pagination
            size="large"
            count={10}
            page={page}
            onChange={(e, value) => setPage(value)}
            sx={{
              ".Mui-selected": {
                background: "#3bd6c6 !important",
                "&:hover": {
                  background: "#3bd6c6 !important",
                },
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default RecipesPage;
