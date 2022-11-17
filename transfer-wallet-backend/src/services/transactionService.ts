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

const transactionService = { createTransaction };

export default transactionService;
