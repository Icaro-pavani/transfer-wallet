import { NextFunction, Request, Response } from "express";
import tokenManager from "../utils/tokenManager";
import { unprocessableError } from "./handleErrorsMiddleware";

export default async function tokenHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token: string = req.headers.authorization.replace("Bearer ", "").trim();

  if (!token) {
    throw unprocessableError("Token not found!");
  }
}
