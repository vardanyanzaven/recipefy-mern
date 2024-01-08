import React from "react";
import { Link } from "react-router-dom";
import StyledButton, { BUTTON_TYPES } from "../button/StyledButton";

const AuthBtns = () => {
  return (
    <>
      <Link to="signin" style={{ textDecoration: "none", color: "black" }}>
        <StyledButton>Sign in</StyledButton>
      </Link>
      <Link to="signup" style={{ textDecoration: "none", color: "black" }}>
        <StyledButton buttonType={BUTTON_TYPES.colored}>Sign Up</StyledButton>
      </Link>
    </>
  );
};

export default AuthBtns;
