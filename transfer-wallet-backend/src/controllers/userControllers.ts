import { Request, Response } from "express";
import { UserData } from "../schemas/userSchema.js";
import userService from "../services/userService.js";

export async function userCreation(req: Request, res: Response) {
  const userInfo = req.body as UserData;

  await userService.createUser(userInfo);

  res.sendStatus(201);
}
