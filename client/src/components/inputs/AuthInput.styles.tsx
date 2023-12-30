import { TextField } from "@mui/material";
import styled from "styled-components";

export const StyledTextField = styled(TextField)(({ theme }) => ({
    width: "100%",
    fontSize: "1.1em",
  
    // Changes the input label color
    "& label.Mui-focused": {
      color: "#3bd6c6",
    },
  
    // Sets the input label color to dark red when there is an error
    "& .MuiFormLabel-root.Mui-error": {
      color: "#d32f2f",
    },
  
    // Sets the bottom border color
    "& .MuiInput-underline:after": {
      borderBottomColor: "#3bd6c6",
    },
  
    // Changes the input label's font size
    "& .MuiInputLabel-root": {
      fontSize: "1.1em",
    },
  
    // Changes the input text's padding
    "& .MuiInputBase-input": {
      padding: "7px 5px 10px 5px",
    },
  }));