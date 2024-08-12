import { Request, Response } from "express";
import { signinInput, signupInput } from "@bun-tz/medium";

export const signup = async (req: Request, res: Response) => {
  const { success } = signupInput.safeParse(req.body);
  
  return res.json("hello");
};

export const signin = async (req: Request, res: Response) => {
  return res.json("hello");
};
