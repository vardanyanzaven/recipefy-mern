import React from "react";
import { Box, CircularProgress } from "@mui/material";

const Spinner = () => {
  return (
      <CircularProgress
        variant="indeterminate"
        sx={{
          color: "#3bd6c6",
          animationDuration: "1000ms",
          position: "relative",
          left: "50%",
        }}
        size={60}
        thickness={4}
      />
  );
};

export default Spinner;
