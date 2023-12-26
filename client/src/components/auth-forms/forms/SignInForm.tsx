import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Paper, Typography } from "@mui/material";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Logo from "../../logo/Logo";
import Button, { BUTTON_TYPES } from "../../button/Button";
import { handleAuthSubmit } from "../../../utils/helpers/auth.helper";
import { SignInData, signInSchema } from "../../../utils/validation/auth.schema";
import { useAppDispatch } from "../../../redux/hooks.redux";
import { setUser } from "../../../redux/redux-slices/user.slice";
import { UserData } from "../../header-user/HeaderUser";
import { StyledTextField } from "../auth.styles";
import { yupResolver } from "@hookform/resolvers/yup";

const SignIn = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({resolver: yupResolver(signInSchema)});
  const [credErrorMssg, setCredErrorMssg] = useState("");

  const getCredError = (inputName: string) => {
    if (
      (inputName === "email" ||
        inputName === "password") &&
      credErrorMssg.toLowerCase().includes(inputName)
    ) {
      return credErrorMssg;
    }
  };

  const handleSignIn: SubmitHandler<FieldValues> = async (data) => {
    const signInData = data as SignInData;
    const result = await handleAuthSubmit(signInData, "sign-in");

    // Checks if there were any errors during validation
    if (result.hasOwnProperty("validationErr")) {
      return;
    }

    // Checks if there were any errors during authentication
    if (result.hasOwnProperty("credentialErr")) {
      console.log("Asd")
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
          padding: "70px 50px",
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
          onSubmit={handleSubmit(handleSignIn)}
        >
          <StyledTextField
          {...register("email")}
            required
            id="email-input"
            label="Email"
            type="text"
            variant="standard"
            error={Boolean(errors.email || getCredError("email"))}
            helperText={(errors.email?.message as string) || getCredError("email")}
          />
          <StyledTextField
            required
            id="password-input"
            label="Password"
            type="password"
            variant="standard"
            error={Boolean(errors.password || getCredError("password"))}
            helperText={(errors.password?.message as string) || getCredError("password")}
          />
          <Button
            style={{ margin: "40px 0" }}
            buttonType={BUTTON_TYPES.secondary}
            type="submit"
          >
            Sign In
          </Button>
          <Typography style={{ fontFamily: "DM Sans" }}>
            Don't have an account yet?{" "}
            <Link style={{ color: "#3bd6c6" }} to="/sign-up">
              Sign Up!
            </Link>
          </Typography>
        </form>
      </Paper>
    </Box>
  );
};

export default SignIn;
