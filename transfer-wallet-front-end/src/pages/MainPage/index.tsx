import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ExpenseTransaction from "../../components/ExpenseTransaction";
import IncomeTransaction from "../../components/IncomeTransaction";
import useAuth from "../../hooks/useAuth";
import api, { TransactionsData, UsersInfo } from "../../services/api";
import valueToCurrency from "../../utils/valueToCurrency";

import "./style.css";

export default function MainPage() {
  const [userInfo, setUserInfo] = useState<UsersInfo>({
    username: "",
    balance: 0,
  });
  const [transactions, setTransactions] = useState<TransactionsData[]>([]);
  const [date, setDate] = useState<string>("");
  const [type, setType] = useState<string>("");
  const { token, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadUserInfos() {
      if (!token) {
        navigate("/");
        return;
      }

      try {
        const {
          data: { account },
        } = await api.getUserInfos(token);
        setUserInfo(account);
        const {
          data: { transactions },
        } = await api.getTransactions(token, date, type);
        setTransactions(transactions);
      } catch (error) {
        signOut();
        navigate("/");
      }
    }

    loadUserInfos();
  }, [navigate, signOut, token, date, type]);

  console.log(transactions);

  return (
    <div className="mainContainer">
      <header>
        <h1>Transfer Wallet</h1>
      </header>
      <div className="user-block">
        <div className="username">
          <h4>Bem-vindo!</h4>
          <h3 className="name">{userInfo.username}</h3>
        </div>
        <button className="cash-out" onClick={() => signOut()}>
          Sair
        </button>
      </div>
      <div className="info">
        <div className="balance">
          <p className="balance-phrase">Seu balanço é</p>
          <h5 className="value">{valueToCurrency(userInfo.balance)}</h5>
        </div>
        <button className="cash-out">Cash-out</button>
      </div>
      <ul className="transactions">
        <h3>Transações</h3>
        <h5 className="filter">Filtros: </h5>
        <div className="buttons">
          <button
            className={
              type === "creditedAccountId" ? "income select" : "income"
            }
            onClick={() => setType("creditedAccountId")}
          >
            Crédito
          </button>
          <button
            className={
              type === "debitedAccountId" ? "expense select" : "expense"
            }
            onClick={() => setType("debitedAccountId")}
          >
            Débito
          </button>
          <button className="date">Data</button>
        </div>
        {transactions.map((transaction) =>
          transaction.creditedAccount.Users.username === userInfo.username ? (
            <IncomeTransaction
              key={transaction.id}
              date={transaction.createdAt}
              username={transaction.debitedAccount.Users.username}
              value={transaction.value}
            />
          ) : (
            <ExpenseTransaction
              key={transaction.id}
              date={transaction.createdAt}
              username={transaction.creditedAccount.Users.username}
              value={transaction.value}
            />
          )
        )}
      </ul>
    </div>
  );
}
