import React from "react";
import { Link } from "react-router-dom";
import Button, { BUTTON_TYPES } from "../button/Button";

const AuthBtns = () => {
  return (
    <>
      <Link to="sign-in">
        <Button>Sign in</Button>
      </Link>
      <Link to="sign-up">
        <Button buttonType={BUTTON_TYPES.secondary}>Sign Up</Button>
      </Link>
    </>
  );
};

export default AuthBtns;
