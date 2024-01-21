import { Paper, Typography } from '@mui/material'
import React from 'react'

const RecipeFooter = ({sourceUrl}: {sourceUrl: string;}) => {
  return (
    <Paper
    elevation={9}
    sx={{
      background: "#d0fdfd",
      width: {xs: "100%", md: "70%"},
      margin: "0 auto",
      padding: "0 20px",
      minHeight: "100px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "25px !important",
    }}
  >
    <Typography sx={{ fontSize: {xs: "18px", sm: "22px", md: "24px"}, textAlign: "center", color: "#005c71" }}>
      Found this recipe interesting? Find out more about it{" "}
      <a
        href={sourceUrl}
        style={{
          color: "#3bd6c6",
          textDecoration: "underline #3bd6c6",
          cursor: "pointer",
        }}
      >
        here!
      </a>
    </Typography>
  </Paper>
  )
}

export default RecipeFooter