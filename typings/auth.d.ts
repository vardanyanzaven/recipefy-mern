export type UserState = {
    isLoggedIn: boolean,
    username: string,
    email: string,
};

export type UserData = Omit<UserState, "isLoggedIn">;

type Credentials = {
  username: string;
  email: string;
  password: string;
  age: number;
  calories: number;
  diets: string[];
};

export type SignUpData = Credentials;

export type SignInData = Pick<Credentials, "email" | "password">;

export type ValidationData = {
  isValid: boolean;
  error?: string;
};