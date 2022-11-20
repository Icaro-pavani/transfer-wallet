import {
  conflictError,
  notFoundError,
  unauthorizedError,
} from "../middlewares/handleErrorsMiddleware.js";
import transactionRepository from "../repositories/transactionRepository.js";
import userRepository from "../repositories/userRepository.js";
import { TransactionData } from "../schemas/transcationSchema.js";
import checkUser from "../utils/checkUser.js";

async function createTransaction(
  userId: number,
  transactionInfo: TransactionData
) {
  const { creditedUsername, value } = transactionInfo;
  const user = await checkUser(userId);

  if (user.username === creditedUsername) {
    throw conflictError("Cannot cash out to the same user!");
  }

  if (value > user.account.balance) {
    throw unauthorizedError("Amount insufficient!");
  }

  const cashInUser = await userRepository.findByUsername(creditedUsername);

  if (!cashInUser) {
    throw notFoundError("Cash-in user not found!");
  }

  const transaction = await transactionRepository.create(
    user.accountId,
    cashInUser.accountId,
    +value
  );

  await transactionRepository.update(transaction.id, +value);
}

async function getAllTransactions(
  userId: number,
  transactionType: string,
  initDate: string | null,
  endDate: string | null
) {
  await checkUser(userId);

  if (
    !!initDate &&
    !!endDate &&
    (transactionType === "creditedAccountId" ||
      transactionType === "debitedAccountId")
  ) {
    return await transactionRepository.findByDateAndType(
      userId,
      initDate,
      endDate,
      transactionType
    );
  } else if (!!initDate && !!endDate) {
    return await transactionRepository.findByDate(userId, initDate, endDate);
  } else if (
    transactionType === "creditedAccountId" ||
    transactionType === "debitedAccountId"
  ) {
    return await transactionRepository.findByType(userId, transactionType);
  }

  return await transactionRepository.findAll(userId);
}

const transactionService = { createTransaction, getAllTransactions };

export default transactionService;
