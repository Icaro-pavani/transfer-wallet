import { notFoundError } from "../middlewares/handleErrorsMiddleware.js";
import accountRepository from "../repositories/accountRepository.js";
import userRepository from "../repositories/userRepository.js";

async function getAccountInfo(userId: number) {
  const user = await userRepository.findById(userId);

  if (!user) {
    throw notFoundError("User not found!");
  }

  const accountInfo = await accountRepository.findbyId(user.accountId);

  return {
    username: user.username,
    balance: accountInfo.balance,
  };
}

const accountService = { getAccountInfo };

export default accountService;
