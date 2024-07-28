import dotenv from "dotenv";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { NextFunction, Response } from "express";

import { UserRequest } from "@typings/user";
import usersDB from "../../models/user/user.mongo";

dotenv.config();

const verifyUser = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const authToken = req.cookies["auth-token"];

  if (!authToken) {
    return res.status(401).json({ error: "User not authenticated" });
  }

  let payload;
  try {
    payload = jwt.verify(
      authToken,
      process.env.JWT_SECRET as Secret
    ) as JwtPayload;
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }

  const user = await usersDB.findById(payload.userId);

  if (!user) return res.status(401).json({ error: "Invalid user ID" });

  req.userId = payload.userId;

  next();
};

export default verifyUser;
