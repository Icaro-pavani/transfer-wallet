import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/tokenHandler.js";
import accountService from "../services/accountService.js";

export async function obtainAccountInfo(
  req: AuthenticatedRequest,
  res: Response
) {
  const userId = req.id;

  const account = await accountService.getAccountInfo(userId);

  res.status(200).send({ account });
}
