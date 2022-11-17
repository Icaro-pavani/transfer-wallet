import accountRepository from "../repositories/accountRepository.js";
import checkUser from "../utils/checkUser.js";

async function getAccountInfo(userId: number) {
  const user = await checkUser(userId);

  //   const accountInfo = await accountRepository.findbyId(user.accountId);

  return {
    username: user.username,
    balance: user.account.balance,
  };
}

const accountService = { getAccountInfo };

export default accountService;
