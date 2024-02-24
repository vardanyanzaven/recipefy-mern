import bcrypt from "bcrypt";
import usersDB from "./auth.mongo";
import { Credentials } from "../../routes/auth/auth.controller";
import validator from "validator";

const signUpUser = async ({
  username,
  email,
  password,
  age,
  calories,
  diets,
}: Credentials) => {
  if (!username || !email || !password || !age || !calories || !diets) {
    throw new Error("All fields must be filled");
  };

  if (!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  };

  if (!validator.isStrongPassword(password, {
    minLength: 8,
    minUppercase: 1,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1
  })) {
    throw new Error("Password is not strong enough");
  };

  const exists = await usersDB.findOne({
    $or: [{ email }, { username }],
  });

  if (exists && exists.email === email) {
    throw new Error("Email already in use");
  };

  if (exists && exists.username === username) {
    throw new Error("Username already in use");
  };

  const salt: string = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await usersDB.create({
    username,
    email,
    password: hash,
    age,
    calories,
    diets,
  });

  return user;
};

const signInUser = async ({ email, password }: Credentials) => {
  if (!email || !password) {
    throw new Error("All fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  }

  const user = await usersDB.findOne({
    email,
  });

  if (!user) {
    throw new Error("No users matching this email");
  }

  const passMatch = await bcrypt.compare(password, user.password);

  if (!passMatch) {
    throw new Error("Incorrect password");
  }

  return user;
};

export { signUpUser, signInUser };
