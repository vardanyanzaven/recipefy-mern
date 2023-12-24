import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  AuthContainer,
  AuthInput,
  FormContainer,
  InputCont,
} from "../auth.styles";
import Logo from "../../logo/Logo";
import Button, { BUTTON_TYPES } from "../../button/Button";
import {
  SignUpData,
  validateSignUp,
} from "../../../utils/validation/auth.schema";
import { useAppDispatch } from "../../../redux/hooks.redux";
import { setUserState } from "../../../redux/redux-slices/user.slice";
import { UserData } from "../../header-user/HeaderUser";
import { handleAuthSubmit } from "../../../utils/helpers/auth.helper";

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
      validateFn: validateSignUp,
      url: "sign-up",
    });

    if (result.error) {
      console.error(result.error);
      return;
    }

    // Sets user's state to the user data
    dispatch(setUserState(result as UserData));

    // Resets the form fields
    setFormFields(defaultFormFields);

    // Redirects to home page
    navigate("/");
  };

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
        <h1>Sign Up</h1>
        <FormContainer onSubmit={handleSignUp}>
          <InputCont>
            <h3>Username:</h3>
            <AuthInput
              name="username"
              value={formFields.username}
              onChange={handleChange}
            />
          </InputCont>
          <InputCont>
            <h3>Email:</h3>
            <AuthInput
              name="email"
              value={formFields.email}
              onChange={handleChange}
            />
          </InputCont>
          <InputCont>
            <h3>Password:</h3>
            <AuthInput
              name="password"
              value={formFields.password}
              onChange={handleChange}
            />
          </InputCont>
          <Button buttonType={BUTTON_TYPES.secondary} type="submit">
            Sign Up
          </Button>
        </FormContainer>
      </AuthContainer>
    </div>
  );
};

export default SignUp;
