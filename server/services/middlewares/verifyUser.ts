import dotenv from "dotenv";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

import usersDB from "../../models/auth.mongo";

dotenv.config();

const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "User not authenticated" });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET as Secret) as JwtPayload;
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }

  const user = await usersDB.findById(decoded.id);

  if (!user) return res.status(401).json({ error: "User not authenticated" });

  next();
};

export default verifyUser;
