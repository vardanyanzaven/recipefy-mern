import React, { useState } from "react";
import {
  AuthContainer,
  AuthInput,
  FormContainer,
  InputCont,
} from "../auth.styles";
import Logo from "../../logo/Logo";
import Button, { BUTTON_TYPES } from "../../button/Button";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignIn = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = () => {};

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "80px",
      }}
    >
      <Logo />
      <AuthContainer>
        <h1>Sign In</h1>
        <FormContainer onSubmit={handleSubmit}>
          <InputCont>
            <h3>Email:</h3>
            <AuthInput name="email" onChange={handleChange} />
          </InputCont>
          <InputCont>
            <h3>Password:</h3>
            <AuthInput name="password" />
          </InputCont>
          <Button buttonType={BUTTON_TYPES.secondary} type="submit">
            Sign In
          </Button>
        </FormContainer>
      </AuthContainer>
    </div>
  );
};

export default SignIn;
