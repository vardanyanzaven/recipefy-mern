import { Typography } from "@mui/material";
import styled from "styled-components";

const BaseButton = styled(Typography)`
  font-size: 1.3rem !important;
  text-transform: capitalize;
  text-align: center;
  min-width: 100px;
  height: 45px;
  padding: 5px 15px !important;
  background-color: transparent;
  border: 2px solid #3bd6c6;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #bdeefc;
    border-color: #34bfb1;
  }
`;

const ColoredButton = styled(BaseButton)`
  background-color: #3bd6c6;
  padding: 5px 10px !important;

  &:hover {
    background-color: #00a8b8;
    border-color: #00a8b8;
  }
`;

export { BaseButton, ColoredButton };
