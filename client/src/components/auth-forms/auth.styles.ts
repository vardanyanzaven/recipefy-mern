import { Paper, TextField } from "@mui/material";
import styled from "styled-components";

const StyledTextField = styled(TextField)(({ theme }) => ({
    width: "100%",
    fontFamily: "DM Sans",
    fontSize: "1.1em",
    '& label.Mui-focused': {
      color: "#3bd6c6",
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: "#3bd6c6",
    },
    '& .MuiInputLabel-root': {
      fontFamily: "DM Sans",
      fontSize: "1.1em",
      '&.Mui-focused': {
        fontSize: "1.1em",
      },
    },
    '& .MuiInputBase-input': {
      fontFamily: "DM Sans",
      padding: "7px 5px 10px 5px",
    },
   }));

export {StyledTextField};
