import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Controller, UseFormRegister, useForm } from "react-hook-form";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";

import Logo from "../../logo/Logo";
import StyledButton, { BUTTON_TYPES } from "../../button/StyledButton";
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
import {
  FOOD_DIETS,
  MEAL_COUNT_OPTIONS,
  SIGN_UP_INPUTS,
} from "../../../constants";
import useAuth from "../../../utils/hooks/useAuth";
import setDiets from "../../../utils/helpers/setDiets";
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

  console.log("intols ", watch("diets"));

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
                return input.name === "age" ? (
                  <AuthInput
                    key={input.name}
                    input={input}
                    getCredError={getCredError}
                    errors={errors}
                    register={
                      register as UseFormRegister<SignInData | SignUpData>
                    }
                  />
                ) : input.name === "calories" ? (
                  <FormControl>
                    <FormLabel
                      sx={{
                        marginBottom: "10px",
                        "&.Mui-focused": { color: "#3bd6c6" },
                      }}
                    >
                      {input.label}
                    </FormLabel>
                    <Controller
                      name="calories"
                      control={control}
                      defaultValue={700}
                      render={({ field }) => (
                        <RadioGroup {...field} row>
                          {MEAL_COUNT_OPTIONS.map((option) => {
                            return (
                              <FormControlLabel
                                value={option.calories}
                                control={
                                  <Radio
                                    sx={{
                                      "&.Mui-checked": { color: "#3bd6c6" },
                                    }}
                                  />
                                }
                                label={option.name}
                              />
                            );
                          })}
                        </RadioGroup>
                      )}
                    />
                  </FormControl>
                ) : input.name === "diets" ? (
                  <Fragment key={input.name}>
                    <InputLabel
                      sx={{ fontSize: "18px", margin: "-20px 0 -25px 0" }}
                    >
                      Diets
                    </InputLabel>
                    <Controller
                      name="diets"
                      control={control}
                      defaultValue={["none"]}
                      render={({ field }) => (
                        <Select
                          multiple
                          {...field}
                          onChange={(e) =>
                            setDiets(e.target.value as string[], setValue)
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
                          defaultValue={["none"]}
                        >
                          {FOOD_DIETS.map((intol) => {
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
                ) : null;
              })}
            </InputContainer>
          </InputsContainer>
          <StyledButton
            style={{ margin: "30px 0" }}
            buttonType={BUTTON_TYPES.colored}
            type="submit"
          >
            Sign Up
          </StyledButton>
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
