import * as Yup from "yup";

export type SignInData = {
  email: string;
  password: string;
};

export type ValidationData = {
  isValid: boolean;
  error?: string;
};

export type SignUpData = SignInData & {
  username: string;
  age: number;
  calories: number;
  diets: string[];
};

export type ValidationFn = (
  formData: SignInData | SignUpData
) => Promise<ValidationData>;

const signInSchema: Yup.ObjectSchema<SignInData> = Yup.object().shape({
  email: Yup.string().email("Email is not valid").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&]).*$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol (@$!%*#?&)"
    )
    .min(8, "Password must be at least 8 characters long")
    .max(25, "Password must not be longer than 25 characters"),
});

const signUpSchema: Yup.ObjectSchema<SignUpData> = signInSchema.shape({
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters long")
    .max(25, "Username must be no longer than 25 characters"),
  age: Yup.number()
  .transform((value, originalValue) => originalValue === '' ? undefined : value)
    .required("Age is required")
    .typeError("Age must be a number")
    .min(16, "Age be higher than 16")
    .max(90, "Age must be lower than 90"),
  calories: Yup.number().required("Daily number of meals is required"),
  diets: Yup.array().required("Diets are required"),
});

const validateFormData = async (
  schema: Yup.ObjectSchema<SignInData | SignUpData>,
  formFields: SignInData | SignUpData
): Promise<ValidationData> => {
  try {
    schema.validateSync(formFields);
    return {
      isValid: true,
    };
  } catch (err) {
    return {
      isValid: false,
      error: (err as Error).message,
    };
  }
};

const validateSignUp: ValidationFn = (formData: SignInData | SignUpData) => {
  const signUpData = formData as SignUpData;
  return validateFormData(signUpSchema, signUpData);
};

const validateSignIn: ValidationFn = (formData: SignInData | SignUpData) => {
  const signInData = formData as SignInData;
  return validateFormData(signInSchema, signInData);
};

export { signUpSchema, signInSchema, validateSignUp, validateSignIn };

// (@$!%*#?&)