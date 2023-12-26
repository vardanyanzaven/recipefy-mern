import React from "react";
import { StyledLogo } from "./Logo.styles";

type LogoProps = {
  variant:
    | "button"
    | "caption"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "inherit"
    | "body2"
    | "body1"
    | "subtitle1"
    | "subtitle2"
    | "overline"
    | undefined;
};

const Logo = ({ variant }: LogoProps) => {
  return (
    <StyledLogo
      variant={variant}
      noWrap
      component="a"
      href="/"
      sx={{
        fontFamily: "Dancing Script",
        textDecoration: "none",
        fontWeight: 500,
      }}
    >
      Recipefy
    </StyledLogo>
  );
};

export default Logo;
