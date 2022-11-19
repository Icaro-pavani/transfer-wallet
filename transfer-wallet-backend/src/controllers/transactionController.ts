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

export async function viewTransactions(
  req: AuthenticatedRequest,
  res: Response
) {
  const userId = req.id;
  const type = req.query.type as string;
  const initDate = req.query.initDate as string;
  const endDate = req.query.endDate as string;

  const transactions = await transactionService.getAllTransactions(
    userId,
    type,
    initDate,
    endDate
  );

  res.status(200).send({ transactions });
}
