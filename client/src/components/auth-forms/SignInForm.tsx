import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Paper, Typography } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";

import Logo from "../logo/Logo";
import StyledButton, { BUTTON_TYPES } from "../button/StyledButton";
import { AuthContainer, StyledForm } from "./auth.styles";
import useAuth from "../../utils/hooks/useAuth";
import AuthInput from "../inputs/AuthInput";
import { SignInData, signInSchema } from "../../utils/validation/auth.schema";
import { SIGN_IN_INPUTS } from "../../constants";

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInData>({ resolver: yupResolver(signInSchema) });

  // Requires signInSchema for react-hook-form
  const { getCredError, handleAuthSubmit } = useAuth(signInSchema);

  return (
    <AuthContainer>
      <Logo />
      <Paper
        elevation={9}
        sx={{
          width: "500px",
          minHeight: "650px",
          height: "fit-content",
          padding: "80px 50px",
          borderRadius: 5,
        }}
      >
        <StyledForm noValidate autoComplete="off">
          {SIGN_IN_INPUTS.map((input) => {
            return (
              <AuthInput
                key={input.name}
                input={input}
                getCredError={getCredError}
                errors={errors}
                register={register}
              />
            );
          })}
          <StyledButton
            style={{ margin: "40px 0" }}
            buttonType={BUTTON_TYPES.colored}
            onClick={handleSubmit((data) => {
              handleAuthSubmit(data, "signin");
            })}
          >
            Sign In
          </StyledButton>
          <Typography>
            Don't have an account yet?{" "}
            <Link style={{ color: "#3bd6c6" }} to="/signup">
              Sign Up!
            </Link>
          </Typography>
        </StyledForm>
      </Paper>
    </AuthContainer>
  );
};

export default SignInForm;
