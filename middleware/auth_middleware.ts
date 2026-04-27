import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

type User = {
  id: string | ObjectId;
  email: string;
  password: string;
  type: "doctor" | "client";
};

export type authRequest = Request & {
  user?: User;
};

export function authMiddleware(
  req: authRequest,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  const token = authHeader.split(" ")[1];

  const payload = jwt.verify(token, process.env.JWT_SECRET_KEY!);
  console.log("payload", payload);
  req.user = payload as unknown as User;

  next();
}
