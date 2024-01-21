import React, { MouseEventHandler } from "react";
import { StyledLogo } from "./Logo.styles";
import { Link } from "react-router-dom";

const Logo = () => {

  return (
    <Link to="/" style={{ textDecoration: "none" }}>
        <StyledLogo
          noWrap
          sx={{
            fontFamily: "Dancing Script",
            textDecoration: "none",
            fontWeight: 500,
            fontSize: {xs: "35px", sm: "40px", md: "45px"}
          }}
        >
          Recipefy
        </StyledLogo>
    </Link>
  );
};

export default Logo;
