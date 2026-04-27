import bcrypt from "bcryptjs";
import type { Request, Response } from "express";
import { connectToDatabse } from "../config/database.ts";
import jwt from "jsonwebtoken";

async function signInToken(user: any) {
  return jwt.sign(
    { id: user._id, email: user.email, type: user.type },
    process.env.JWT_SECRET_KEY!,
    {
      expiresIn: "2h",
    },
  );
}

export async function Register(req: Request, res: Response) {
  const { name, email, password, type } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "name, email and password are required",
    });
  }

  const normalizedEmail = email.toLowerCase();

  const user = {
    name: name,
    email: normalizedEmail,
    password: bcrypt.hashSync(password, 10),
    type: type || "client",
  };

  const db = await connectToDatabse();

  const existingUser = await db.collection("users").findOne({ email });

  if (existingUser) {
    return res.status(401).json({
      message: "user already exist!",
    });
  }

  const data = await db.collection("users").insertOne(user);

  if (!data) {
    return res.status(500).json({
      message: "Failed to create user",
    });
  }

  return res.status(200).json({
    message: "account created successfully",
    token: await signInToken(data),
  });
}

export async function Login(req: Request, res: Response) {
  const { email, password } = req.body;

  const db = await connectToDatabse();

  const user = await db
    .collection("users")
    .findOne({ email: email.toLowerCase() });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  return res.status(200).json({
    message: "Login successful",
    token: await signInToken(user),
  });
}

export function me(req: Request, res: Response) {
  const user = (req as any).user;

  if (!user) {
    return res.status(401).json({
      message: "unauthorized !",
    });
  }

  return res.status(200).json({
    message: "here you are!",
    user,
  });
}
