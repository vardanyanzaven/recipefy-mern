import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { handleAuth } from "../helpers/handleAuth";
import { UserData } from "../../components/header-user/HeaderUser";
import { useAppDispatch } from "../../redux/hooks.redux";
import { setUser } from "../../redux/redux-slices/user.slice";
import { SignInData, SignUpData } from "../validation/auth.schema";
import { useForm } from "react-hook-form";

const useAuth = (schema: Yup.ObjectSchema<SignUpData | SignInData>) => {
  const [credErrorMssg, setCredErrorMssg] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { reset } = useForm({ resolver: yupResolver(schema) });

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

  const handleAuthSubmit = async (data: SignUpData | SignInData, url: string) => {
    const result = await handleAuth(data, url);

    // Checks if there were any errors during Yup validation
    if (result.hasOwnProperty("error")) {
      return;
    }

    // Checks if there were any errors during backend authentication
    if (result.hasOwnProperty("credentialErr")) {
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

  return { getCredError, handleAuthSubmit };
};

export default useAuth;