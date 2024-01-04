import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Controller, UseFormRegister, useForm } from "react-hook-form";
import { InputLabel, MenuItem, Paper, Select, Typography } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";

import Logo from "../../logo/Logo";
import Button, { BUTTON_TYPES } from "../../button/Button";
import {
  SignInData,
  SignUpData,
  signUpSchema,
} from "../../../utils/validation/auth.schema";
import {
  AuthContainer,
  InputContainer,
  InputsContainer,
  MenuStyles,
  StyledForm,
} from "../auth.styles";
import { FOOD_INTOLERANCES, SIGN_UP_INPUTS } from "../../../constants";
import useAuth from "../../../utils/hooks/useAuth";
import setIntolerances from "../../../utils/helpers/setIntolerances";
import AuthInput from "../../inputs/AuthInput";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SignUpData>({ resolver: yupResolver(signUpSchema) });

  console.log("intols ", watch("intolerances"));

  // Requires signUpSchema for react-hook-form
  const { getCredError, handleAuthSubmit } = useAuth(signUpSchema);

  return (
    <AuthContainer>
      <Logo variant="h3" />
      <Paper
        elevation={9}
        sx={{
          width: "700px",
          height: "fit-content",
          padding: "65px 50px",
          borderRadius: 5,
        }}
      >
        <StyledForm
          noValidate
          onSubmit={handleSubmit((data) => {
            console.log(data);
            handleAuthSubmit(data, "signup");
          })}
        >
          <InputsContainer>
            <InputContainer>
              {SIGN_UP_INPUTS.user.map((input) => {
                return (
                  <AuthInput
                    key={input.name}
                    input={input}
                    getCredError={getCredError}
                    errors={errors}
                    register={
                      register as UseFormRegister<SignInData | SignUpData>
                    }
                  />
                );
              })}
            </InputContainer>
            <InputContainer>
              {SIGN_UP_INPUTS.nutrition.map((input) => {
                return input.name !== "intolerances" ? (
                  <AuthInput
                    key={input.name}
                    input={input}
                    getCredError={getCredError}
                    errors={errors}
                    register={
                      register as UseFormRegister<SignInData | SignUpData>
                    }
                  />
                ) : (
                  <Fragment key={input.name}>
                    <InputLabel sx={{ marginBottom: "-20px" }}>
                      Intolerances *
                    </InputLabel>
                    <Controller
                      name="intolerances"
                      defaultValue={["none"]}
                      control={control}
                      render={({ field }) => (
                        <Select
                          multiple
                          {...field}
                          onChange={(e) =>
                            setIntolerances(
                              e.target.value as string[],
                              setValue
                            )
                          }
                          MenuProps={MenuStyles}
                          sx={{
                            borderRadius: "30px",
                            padding: "0 10px",
                            width: "270px",
                            ".MuiOutlinedInput-notchedOutline": {
                              border: "2px solid #3bd6c6 !important",
                            },
                          }}
                        >
                          {FOOD_INTOLERANCES.map((intol) => {
                            return (
                              <MenuItem key={intol.value} value={intol.value}>
                                {intol.name}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      )}
                    />
                  </Fragment>
                );
              })}
            </InputContainer>
          </InputsContainer>
          <Button
            style={{ margin: "30px 0" }}
            buttonType={BUTTON_TYPES.colored}
            type="submit"
          >
            Sign Up
          </Button>
          <Typography>
            Already have an account?{" "}
            <Link style={{ color: "#3bd6c6" }} to="/signin">
              Sign In!
            </Link>
          </Typography>
        </StyledForm>
      </Paper>
    </AuthContainer>
  );
};

export default SignUp;
