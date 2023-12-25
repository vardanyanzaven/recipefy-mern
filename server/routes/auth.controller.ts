import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { signInUser, signUpUser } from "../models/auth.model";

const createToken = (id: Types.ObjectId) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: "3d",
  });
};

export type Credentials = {
  username?: string;
  email: string;
  password: string;
};

const httpSignUpUser = async (req: Request, res: Response) => {
  try {
    const credentials: Credentials = req.body;

    const user = await signUpUser(credentials as Credentials);

    // Creates a JWT token
    const token = createToken(user._id);

    return res
      .status(201)
      .json({ username: user.username, email: user.email, token });
  } catch (err) {
    console.log((err as Error).message);
    return res.status(400).json({ error: (err as Error).message });
  }
};

const httpSignInUser = async (req: Request, res: Response) => {
  try {
    const credentials: Credentials = req.body;

    const user = await signInUser(credentials as Credentials);

    // Creates a JWT token
    const token = createToken(user._id);

    return res.status(200).json({ username: user.username, email: user.email, token });
  } catch (err) {
    console.log((err as Error).message);
    return res.status(400).json({ error: (err as Error).message });
  }
};

export { httpSignUpUser, httpSignInUser };
