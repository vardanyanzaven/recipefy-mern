import React from "react";
import { SignInData, SignUpData } from "../../utils/validation/auth.schema";
import { StyledTextField } from "./AuthInput.styles";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { INPUT_LIMITS } from "../../constants";

const { min: ageMin, max: ageMax } = INPUT_LIMITS.age;
const { min: calMin, max: calMax } = INPUT_LIMITS.calories;

const AuthInput = ({
  input,
  getCredError,
  errors,
  register,
}: {
  input: {
    label: string;
    name:
      | "username"
      | "email"
      | "password"
      | "age"
      | "calories"
      | "intolerances";
    type: string;
    step?: number;
  };
  getCredError: (inputName: string) => string | undefined;
  errors: FieldErrors<SignInData & SignUpData>;
  register: UseFormRegister<SignInData | SignUpData>;
}) => {
  return (
    <StyledTextField
      {...register(input.name)}
      name={input.name}
      id={`${input.name}-input`}
      label={`${input.label} *`}
      variant="standard"
      inputProps={{
        type: input.type,
        min:
          input.name === "age"
            ? ageMin
            : input.name === "calories"
            ? calMin
            : null,
        max:
          input.name === "age"
            ? ageMax
            : input.name === "calories"
            ? calMax
            : null,
        step: input.step ? input.step : null,
      }}
      error={Boolean(errors[input.name] || getCredError(input.name))}
      helperText={errors[input.name]?.message || getCredError(input.name)}
    />
  );
};

export default AuthInput;
