import React from "react";
import { useParams } from "react-router-dom";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CircleIcon from "@mui/icons-material/Circle";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import useRecipe from "../../utils/hooks/useRecipe";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import Spinner from "../../components/spinner/Spinner";
import RecipeImageTitle from "../../components/recipe-title-card/RecipeImageTitle";
import { AdditionalInfo, Instruction } from "./RecipePage.types";
import RecipeFooter from "../../components/recipe-footer/RecipeFooter";

const RecipePage = () => {
  const { recipeId } = useParams();
  const { recipe, isLoading } = useRecipe(recipeId as string);
  const infoSections = [
    recipe.ingredients,
    recipe.instructions,
    recipe.diets,
    [
      { name: "Calories", value: recipe.calories },
      { name: "Ready in Minutes", value: recipe.readyInMinutes },
      { name: "Servings", value: recipe.servings },
    ],
  ];

  return (
    <Box
      sx={{
        background: "#effffe",
        padding: "125px 0 50px 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <RecipeImageTitle imageUrl={recipe.imageUrl} title={recipe.title} />
          <Box
            sx={{
              width: "100%",
              padding: "60px 40px 0 40px",
              "& > :nth-of-type(even)": {
                marginLeft: { xs: "none", sm: "auto" },
              },
              "& > :nth-of-type(odd)": {
                marginRight: { xs: "none", sm: "auto" },
              },
            }}
          >
            {infoSections?.map((section, i) => {
              return (
                <Accordion
                  key={`section-${i}`}
                  disableGutters
                  sx={{
                    backgroundColor: i % 2 === 0 ? "#d0fdfd" : "#005c71",
                    color: i % 2 === 0 ? "#005c71" : "#d0fdfd",
                    borderRadius: "25px !important",
                    padding: "20px 30px",
                    margin: { xs: "0 auto 40px auto", sm: "0 0 40px 0" },
                    flexDirection: "column",
                    justifyContent: "center",
                    minWidth: {
                      xs: 0,
                      sm: 0,
                      md: 700,
                    },
                    width: {
                      xs: "90%",
                      sm: "80%",
                      md: "60%",
                    },
                    "&::before": {
                      display: "none",
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <ExpandMoreIcon
                        fontSize="large"
                        sx={{ color: i % 2 === 0 ? "#607474" : "#d0fdfd" }}
                      />
                    }
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: "22px", sm: "25px", md: "30px" },
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {i === 0 ? (
                        <>
                          <MenuBookIcon fontSize="large" /> Ingredients
                        </>
                      ) : i === 1 ? (
                        <>
                          <FormatListNumberedIcon fontSize="large" />
                          Instructions
                        </>
                      ) : i === 2 ? (
                        <>
                          <RestaurantIcon fontSize="large" /> Diets
                        </>
                      ) : (
                        <>
                          <PlaylistAddIcon fontSize="large" /> Additional
                          Information
                        </>
                      )}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ display: "flex", flexWrap: "wrap" }}>
                    {section?.map((info, infoIndex) => {
                      return (
                        <Typography
                          key={`info-${infoIndex}`}
                          sx={{
                            fontSize: { xs: "18px", sm: "20px", md: "22px" },
                            flex: i === 0 ? "40%" : "100%",
                            whiteSpace: i === 0 ? "nowrap" : "normal",
                            overflow: i === 0 ? "hidden" : "auto",
                            textOverflow: i === 0 ? "ellipsis" : "initial",
                          }}
                        >
                          {i === 0 || i === 2 ? (
                            <CircleIcon
                              sx={{
                                fontSize: {
                                  xs: "8px",
                                  sm: "10px",
                                  md: "12px",
                                },
                              }}
                            />
                          ) : i === 1 ? (
                            <span style={{ fontWeight: 500 }}>
                              {(info as Instruction)?.number}.
                            </span>
                          ) : (
                            ""
                          )}{" "}
                          {i === 0 || i === 2
                            ? (info as string)
                            : i === 1
                            ? (info as Instruction)?.step
                            : `${(info as AdditionalInfo).name}: ${
                                (info as AdditionalInfo).value
                              }`}
                        </Typography>
                      );
                    })}
                  </AccordionDetails>
                </Accordion>
              );
            })}
            <RecipeFooter sourceUrl={recipe.sourceUrl} />
          </Box>
        </>
      )}
    </Box>
  );
};

export default RecipePage;
