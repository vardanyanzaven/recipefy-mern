import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { SignInData, SignUpData } from "@typings/auth";
import { signInUser, signUpUser, deleteUser } from "../../models/auth/auth.model";

const createToken = (id: Types.ObjectId) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: "3d",
  });
};

const httpSignUpUser = async (req: Request, res: Response) => {
  try {
    const credentials: SignUpData = req.body;

    const user = await signUpUser(credentials as SignUpData);

    // Creates a JWT token
    const token = createToken(user._id);

    // Creates a cookie with the key "token" and a value of the token
    res.cookie("auth-token", token, {
      httpOnly: false,
    });
    return res.status(201).json({ username: user.username, email: user.email });
  } catch (err) {
    console.log((err as Error).message);
    return res.status(400).json({ credentialErr: (err as Error).message });
  }
};

const httpSignInUser = async (req: Request, res: Response) => {
  try {
    const credentials: SignInData = req.body;

    const user = await signInUser(credentials as SignInData);

    // Creates a JWT token
    const token = createToken(user._id);

    // Creates a cookie with the key "token" and a value of the token
    res.cookie("auth-token", token, {
      httpOnly: false,
    });

    return res.status(200).json({ username: user.username, email: user.email });
  } catch (err) {
    return res.status(400).json({ credentialErr: (err as Error).message });
  }
};

const httpLogoutUser = async (req: Request, res: Response) => {
  try {
    res.clearCookie("auth-token");
    return res.status(200).end();
  } catch (err) {
    return res.status(400).json({ error: (err as Error).message });
  }
};

const httpDeleteUser = async (req: Request, res: Response) => {
  const username = req.params.username;
  try {
    await deleteUser(username);
    return res.status(200).end();
  } catch(err) {
    return res.status(400).json({ error: (err as Error).message });
  }
};

export { httpSignUpUser, httpSignInUser, httpLogoutUser, httpDeleteUser };
