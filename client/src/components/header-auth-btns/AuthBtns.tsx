import React from "react";
import { Link } from "react-router-dom";
import Button, { BUTTON_TYPES } from "../button/Button";

const AuthBtns = () => {
  return (
    <>
      <Link to="signin">
        <Button>Sign in</Button>
      </Link>
      <Link to="signup">
        <Button buttonType={BUTTON_TYPES.colored}>Sign Up</Button>
      </Link>
    </>
  );
};

export default AuthBtns;
