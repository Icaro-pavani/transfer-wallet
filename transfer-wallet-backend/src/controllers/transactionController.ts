import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/tokenHandler.js";
import { TransactionData } from "../schemas/transcationSchema.js";
import transactionService from "../services/transactionService.js";

export async function addTransaction(req: AuthenticatedRequest, res: Response) {
  const userId = req.id;
  const transactionInfo = req.body as TransactionData;

  await transactionService.createTransaction(userId, transactionInfo);

  res.sendStatus(201);
}
