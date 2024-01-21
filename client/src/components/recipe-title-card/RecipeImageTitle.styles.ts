import styled, { keyframes } from "styled-components";
import { Box, Typography } from "@mui/material";

export const TitleBox = styled(Box)`
  width: 100%;
  margin-top: -45px;
  background: black;
  position: relative;
`;

const fadeSlideDown = keyframes`
0% {
    opacity: 0;
    transform: translate(-50%, -60%);
}
100% {
    opacity: 1;
    transform: translate(-50%, -50%);
}
`;

export const RecipeTitle = styled(Typography)`
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  padding: 0 10px 0 10px;
  color: #d0fdfd;
  animation: ${fadeSlideDown} 2s;
`;
