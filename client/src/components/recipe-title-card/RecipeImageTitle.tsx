import { Box, Typography } from "@mui/material";
import React from "react";
import { RecipeTitle, TitleBox } from "./RecipeImageTitle.styles";

type TitleProps = {
  imageUrl: string;
  title: string;
};

const RecipeImageTitle = ({ imageUrl, title }: TitleProps) => {
  return (
    <TitleBox
      sx={{
        height: {
          xs: "300px",
          sm: "350px",
          md: "400px",
        },
      }}
    >
      <img
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.3,
        }}
        src={imageUrl}
        alt={title}
      />
      <RecipeTitle
        sx={{
          fontSize: {
            xs: "25px",
            sm: "32px",
            md: "40px",
          },
        }}
      >
        {title}
      </RecipeTitle>
    </TitleBox>
  );
};

export default RecipeImageTitle;
