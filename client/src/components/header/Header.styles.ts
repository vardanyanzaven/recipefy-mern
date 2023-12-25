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

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0.1em;
    background-color: #3bd6c6;
    transition: opacity 300ms, transform 300ms;
    opacity: 1;
    transform: translate3d(-100%, 0, 0);
  }

  &:hover::after,
  &:focus::after {
    transform: translate3d(0, 0, 0);
  }
`;

const Logo = styled(Typography)`
  color: black;
  text-decoration: none;
  transition: all 0.1s;
`;

export { HeaderLink, Logo, HeaderCont };
