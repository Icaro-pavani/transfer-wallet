import { Request, Response } from "express";
import { UserData } from "../schemas/userSchema.js";
import authService from "../services/authService.js";

export async function loginUser(req: Request, res: Response) {
  const userInfo = req.body as UserData;

  const token = await authService.login(userInfo);

  res.status(200).send({ token });
}
