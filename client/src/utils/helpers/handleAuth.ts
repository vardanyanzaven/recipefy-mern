import { UserData } from "@typings/auth";
import { SignInData, SignUpData } from "@typings/auth";
import { validateSignIn, validateSignUp } from "../validation/auth.schema";
import { BASE_API_URL } from "../../constants";

const handleAuth = async (formFields: SignInData | SignUpData, url: string) => {
  const { isValid, error } = formFields.hasOwnProperty("username")
    ? await validateSignUp(formFields as SignUpData)
    : await validateSignIn(formFields as SignInData);

  // Checks if the Yup validation is successful
  if (!isValid) {
    console.log(error);
    return {
      error,
    };
  }

  // POST-s sign up data to the backend
  const res = await fetch(`${BASE_API_URL}/auth/${url}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "post",
    body: JSON.stringify(formFields),
  });

  // Retrieves the user data if successful, otherwise fetches the error message
  const result: UserData & { credentialErr: string } = await res.json();

  return result;
};

export { handleAuth };
