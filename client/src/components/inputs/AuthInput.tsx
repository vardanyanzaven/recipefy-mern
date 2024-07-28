import React, { FormHTMLAttributes } from "react";
import { SignInData, SignUpData } from "@typings/auth";
import { StyledTextField } from "./AuthInput.styles";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { INPUT_LIMITS } from "../../constants";

const { min: ageMin, max: ageMax } = INPUT_LIMITS.age;

type AuthInputProps = {
  input: {
    label: string;
    name: "username" | "email" | "password" | "age" | "calories" | "diets";
    type?: string;
    step?: number;
  };
  getCredError: (inputName: string) => string | undefined;
  errors: FieldErrors<SignInData & SignUpData>;
  register: UseFormRegister<SignInData | SignUpData>;
} & FormHTMLAttributes<HTMLInputElement>;

const AuthInput = ({
  input,
  getCredError,
  errors,
  register,
}: AuthInputProps) => {
  return (
    <StyledTextField
      {...register(input.name)}
      name={input.name}
      id={`${input.name}-input`}
      label={`${input.label} *`}
      variant="standard"
      inputProps={{
        type: input.type,
        min: ageMin,
        max: ageMax,
        step: input.step ? input.step : null,
      }}
      error={Boolean(errors[input.name] || getCredError(input.name))}
      helperText={errors[input.name]?.message || getCredError(input.name)}
    />
  );
};

export default AuthInput;
