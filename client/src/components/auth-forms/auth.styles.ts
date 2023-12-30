import styled from "styled-components";
import { Box, MenuProps } from "@mui/material";

export const AuthContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  row-gap: 30px;
  align-items: center;
  padding-top: 80px;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 25px;
`;

export const InputsContainer = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  column-gap: 60px;
`;

export const InputContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 50%;
  row-gap: 30px;
`;

export const MenuStyles: Partial<MenuProps> = {
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "left",
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "left",
  },
  PaperProps: {
      sx: {
        borderRadius: "25px", 
        bgcolor: 'white',
        '.MuiMenuItem-root': {
          padding: 1.5,
          '&.Mui-selected': {
            background: "#e4fffe"
          }
        },
      },
  },
};
