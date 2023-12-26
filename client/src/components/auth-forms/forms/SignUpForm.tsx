import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Box, Paper, Typography } from "@mui/material";
import {yupResolver} from "@hookform/resolvers/yup";

import Logo from "../../logo/Logo";
import Button, { BUTTON_TYPES } from "../../button/Button";
import { SignUpData, signUpSchema } from "../../../utils/validation/auth.schema";
import { useAppDispatch } from "../../../redux/hooks.redux";
import { setUser } from "../../../redux/redux-slices/user.slice";
import { UserData } from "../../header-user/HeaderUser";
import { handleAuthSubmit } from "../../../utils/helpers/auth.helper";
import { StyledTextField } from "../auth.styles";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUpData>({resolver: yupResolver(signUpSchema)});
  const [credErrorMssg, setCredErrorMssg] = useState("");

  const getCredError = (inputName: string) => {
    if (
      (inputName === "username" ||
        inputName === "email" ||
        inputName === "password") &&
      credErrorMssg.toLowerCase().includes(inputName)
    ) {
      return credErrorMssg;
    }
  };

  const handleSignUp = async (data: SignUpData) => {
    const result = await handleAuthSubmit(data, "sign-up");

    // Checks if there were any errors during validation
    if (result.hasOwnProperty("error")) {
      return;
    }

    // Checks if there were any errors during authentication
    if (result.hasOwnProperty("credentialErr")) {
      console.log("CredErr in Sign up");
      const credErrResult = result as UserData & { credentialErr: string };
      setCredErrorMssg(credErrResult.credentialErr);
      return;
    }

    // Sets user's state to the user data
    dispatch(setUser(result as UserData));

    // Resets the form fields
    reset();

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
          onSubmit={handleSubmit(handleSignUp)}
        >
          <StyledTextField
            {...register("username")}
            required
            id="username-input"
            label="Username"
            type="text"
            variant="standard"
            error={Boolean(errors.username || getCredError("username"))}
            helperText={errors.username?.message || getCredError("username")}
          />
          <StyledTextField
            {...register("email")}
            required
            id="email-input"
            label="Email"
            type="text"
            variant="standard"
            error={Boolean(errors.email || getCredError("email"))}
            helperText={errors.email?.message || getCredError("email")}
          />
          <StyledTextField
            {...register("password")}
            required
            id="password-input"
            label="Password"
            type="password"
            variant="standard"
            error={Boolean(errors.password || getCredError("password"))}
            helperText={errors.password?.message || getCredError("password")}
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
