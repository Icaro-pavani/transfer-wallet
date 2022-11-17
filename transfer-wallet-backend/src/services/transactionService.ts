import {
  conflictError,
  notFoundError,
  unauthorizedError,
} from "../middlewares/handleErrorsMiddleware.js";
import accountRepository from "../repositories/accountRepository.js";
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
    throw unauthorizedError("Ammount insufficient!");
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
  date: string | null
) {
  await checkUser(userId);

  if (
    !!date &&
    (transactionType === "creditedAccountId" ||
      transactionType === "debitedAccountId")
  ) {
    return await transactionRepository.findByDateAndType(
      userId,
      date,
      transactionType
    );
  } else if (!!date) {
    return await transactionRepository.findByDate(userId, date);
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
