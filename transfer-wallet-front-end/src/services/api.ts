import axios from "axios";

const baseAPI = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

function getConfig(token: string) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

interface UserData {
  username: string;
  password: string;
}

async function userSignUp(signUpData: UserData) {
  await baseAPI.post("/user", signUpData);
}

async function userSignIn(signInData: UserData) {
  return baseAPI.post<{ token: string }>("/auth", signInData);
}

export interface UsersInfo {
  username: string;
  balance: number;
}

async function getUserInfos(token: string) {
  const config = getConfig(token);
  return baseAPI.get<{ account: UsersInfo }>("/account", config);
}

export interface TransactionsData {
  id: number;
  debitedAccountId: number;
  creditedAccountId: number;
  value: number;
  createdAt: string;
  creditedAccount: {
    Users: {
      username: string;
    };
  };
  debitedAccount: {
    Users: {
      username: string;
    };
  };
}

async function getTransactions(
  token: string,
  initDate: string = "",
  endDate: string = "",
  type: string = ""
) {
  const config = getConfig(token);
  return baseAPI.get<{ transactions: TransactionsData[] }>(
    `/transaction?initDate=${initDate}&endDate=${endDate}&type=${type}`,
    config
  );
}

export interface CashOutData {
  creditedUsername: string;
  value: number;
}

async function postCashOut(token: string, cashOutInfo: CashOutData) {
  const config = getConfig(token);
  await baseAPI.post("/transaction", cashOutInfo, config);
}

const api = {
  userSignUp,
  userSignIn,
  getUserInfos,
  getTransactions,
  postCashOut,
};

export default api;
