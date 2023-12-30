import React from "react";
import { StyledLogo } from "./Logo.styles";
import { Link } from "react-router-dom";

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
    <Link to="/" style={{textDecoration: "none"}}>
      <StyledLogo
        variant={variant}
        noWrap
        sx={{
          fontFamily: "Dancing Script",
          textDecoration: "none",
          fontWeight: 500,
        }}
      >
        Recipefy
      </StyledLogo>
    </Link>
  );
};

export default Logo;
