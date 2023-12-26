import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Logo from "../../logo/Logo";
import Button, { BUTTON_TYPES } from "../../button/Button";
import { SignUpData } from "../../../utils/validation/auth.schema";
import { useAppDispatch } from "../../../redux/hooks.redux";
import { setUser } from "../../../redux/redux-slices/user.slice";
import { UserData } from "../../header-user/HeaderUser";
import { handleAuthSubmit } from "../../../utils/helpers/auth.helper";
import { Box, Paper, Typography } from "@mui/material";
import { StyledTextField } from "../auth.styles";

const defaultFormFields: SignUpData = {
  username: "",
  email: "",
  password: "",
};

const SignUp = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    const result = await handleAuthSubmit(e, {
      formFields,
      url: "sign-up",
    });

    if (result.error) {
      console.error(result.error);
      return;
    }

    // Sets user's state to the user data
    dispatch(setUser(result as UserData));

    // Resets the form fields
    setFormFields(defaultFormFields);

    // Redirects to home page
    navigate("/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        rowGap: 3,
        alignItems: "center",
        paddingTop: "80px",
      }}
    >
      <Logo variant="h3" />
      <Paper
        elevation={9}
        sx={{
          width: "500px",
          height: "650px",
          padding: "65px 50px",
          borderRadius: 5,
        }}
      >
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            rowGap: 25,
          }}
          onSubmit={handleSignUp}
        >
          <StyledTextField
            required
            id="username-input"
            label="Username"
            type="text"
            variant="standard"
            onChange={handleChange}
          />
          <StyledTextField
            required
            id="email-input"
            label="Email"
            type="text"
            variant="standard"
            onChange={handleChange}
          />
          <StyledTextField
            required
            id="password-input"
            label="Password"
            type="password"
            variant="standard"
            onChange={handleChange}
          />
          <Button
            style={{ margin: "30px 0" }}
            buttonType={BUTTON_TYPES.secondary}
            type="submit"
          >
            Sign Up
          </Button>
          <Typography style={{ fontFamily: "DM Sans" }}>
            Already have an account?{" "}
            <Link style={{ color: "#3bd6c6" }} to="/sign-in">
              Sign in!
            </Link>
          </Typography>
        </form>
      </Paper>
    </Box>
  );
};

export default SignUp;
