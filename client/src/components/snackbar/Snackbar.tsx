import React, { useState } from "react";
import { Fade, Snackbar } from "@mui/material";

const useSnackbar = () => {
  const [snackbarState, setSnackbarState] = useState({
    isOpen: false,
    message: "",
  });

  const handleOpen = (message: string) => {
    setSnackbarState({ isOpen: true, message });
  };

  const handleClose = (e?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway" || reason === "escapeKeyDown") {
      return;
    }

    setSnackbarState({ isOpen: false, message: "" });
  };

  const CustomSnackbar = () => (
    <Snackbar
      data-testid="custom-snackbar"
      key="custom-snackbar"
      open={snackbarState.isOpen}
      onClose={handleClose}
      autoHideDuration={1500}
      message={snackbarState.message}
      TransitionComponent={Fade}
      ContentProps={{
        sx: {
          borderRadius: "10px",
          fontSize: "1rem",
          background: "#3bd6c6",
          color: "black",
        },
      }}
    />
  );

  return { CustomSnackbar, handleOpen };
};

export default useSnackbar;
