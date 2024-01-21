import { Box, Typography } from "@mui/material";
import styled from "styled-components";

const HeaderCont = styled(Box)`
  flex-grow: 1;
  display: flex;
  max-width: 33%;
`;

const HeaderLink = styled(Typography)`
  text-transform: capitalize;
  text-decoration: none;
  color: black;
  overflow: hidden;
  display: inline-block;
  position: relative;
  cursor: pointer;

  &.disabled {
    color: gray;
    cursor: default;

    &::after {
     opacity: 0;
   }
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0.1em;
    left: 0;
    width: 100%;
    height: 0.1em;
    background-color: #3bd6c6;
    transition: opacity 300ms, transform 300ms;
    opacity: 1;
    transform: translate3d(-100%, 0, 0);
  }

  &:hover::after {
    transform: translate3d(0, 0, 0);
  }

  &.active-page-link::after {
    transform: translate3d(0, 0, 0);
  }
`;

export { HeaderLink, HeaderCont };
