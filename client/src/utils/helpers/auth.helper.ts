import { UserData } from "../../components/header-user/HeaderUser";
import {
  SignInData,
  SignUpData,
  ValidationFn,
  validateSignIn,
  validateSignUp,
} from "../validation/auth.schema";

export type SubmitArgs = {
  formFields: SignInData | SignUpData;
  url: string;
};

const handleAuthSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
  submitArgs: SubmitArgs
) => {
  const { formFields, url } = submitArgs;
  // Prevents the form from clearing all the fields
  e.preventDefault();

  const { isValid, error } = formFields.hasOwnProperty("username") ? await validateSignUp(formFields as SignUpData) : await validateSignIn(formFields as SignInData);

  // Checks if the Yup validation is successful
  if (!isValid) {
    console.error(error);
    return {
        error: (error as string)
    }
  }

  // POST-s sign up data to the backend
  const res = await fetch(`https://localhost:8000/auth/${url}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "post",
    body: JSON.stringify(formFields),
  });

  // Retrieves the user data if successful, otherwise fetches the error message
  const result: UserData & { error: Error } = await res.json();

  return result;
};

export { handleAuthSubmit };
