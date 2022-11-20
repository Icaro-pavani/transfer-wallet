import { NextFunction, Request, Response } from "express";
import tokenManager, { JWTPayload } from "../utils/tokenManager.js";
import { unprocessableError } from "./handleErrorsMiddleware.js";

export default async function tokenHandler(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  if (!req.headers.authorization) {
    throw unprocessableError("Missing headers!");
  }

  const token: string = req.headers.authorization.replace("Bearer", "").trim();

  if (!token) {
    throw unprocessableError("Token not found!");
  }

  const tokenData = await tokenManager.validateToken(token);

  req.id = tokenData.id;

  next();
}

export type AuthenticatedRequest = Request & JWTPayload;
