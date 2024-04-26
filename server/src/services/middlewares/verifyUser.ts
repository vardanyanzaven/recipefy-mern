import dotenv from "dotenv";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

import usersDB from "../../models/auth/auth.mongo";

dotenv.config();

const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  const authToken = req.cookies["auth-token"];

  if (!authToken) {
    return res.status(401).json({ error: "User not authenticated" });
  }

  let decoded;
  try {
    decoded = jwt.verify(
      authToken,
      process.env.JWT_SECRET as Secret
    ) as JwtPayload;
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }

  const user = await usersDB.findOne(decoded.username);

  if (!user) return res.status(401).json({ error: "User not authenticated" });

  next();
};

export default verifyUser;
