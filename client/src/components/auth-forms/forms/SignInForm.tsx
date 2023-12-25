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
import { handleAuthSubmit } from "../../../utils/helpers/auth.helper";
import { SignInData } from "../../../utils/validation/auth.schema";
import { useAppDispatch } from "../../../redux/hooks.redux";
import { setUser } from "../../../redux/redux-slices/user.slice";
import { UserData } from "../../header-user/HeaderUser";

const defaultFormFields: SignInData = {
  email: "",
  password: "",
};

const SignIn = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    const result = await handleAuthSubmit(e, {
      formFields,
      url: "sign-in",
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
        <FormContainer onSubmit={handleSignIn}>
          <InputCont>
            <h3>Email:</h3>
            <AuthInput name="email" onChange={handleChange} />
          </InputCont>
          <InputCont>
            <h3>Password:</h3>
            <AuthInput name="password" onChange={handleChange} />
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
