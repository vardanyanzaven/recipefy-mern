import { Request, Response } from "express";
import { signUpUser } from "../models/auth.model";

export type Credentials = { username: string; email: string; password: string };

const httpSignUpUser = async (req: Request, res: Response) => {
  try {
    const credentials: Credentials = req.body;

    const user = await signUpUser(credentials as Credentials);
    return res.status(201).json({ username: user.username, email: user.email });
  } catch (err) {
    console.log((err as Error).message);
    return res.status(400).json({ error: (err as Error).message });
  }
};

export { httpSignUpUser };
