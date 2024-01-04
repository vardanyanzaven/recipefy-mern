import React from "react";
import { CircularProgress } from "@mui/material";

const Spinner = () => {
  return (
      <CircularProgress
        variant="indeterminate"
        sx={{
          color: "#3bd6c6",
          animationDuration: "1000ms",
        }}
        size={70}
        thickness={4}
      />
  );
};

export default Spinner;
