import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import api, { CashOutData } from "../../services/api";
import valueToCurrency from "../../utils/valueToCurrency";
import "./style.css";

export default function CashOut() {
  const [cashOutInfo, setCashOutInfo] = useState<CashOutData>({
    creditedUsername: "",
    value: 0,
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { token, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function checkToken() {
      if (!token) {
        navigate("/");
        return;
      }

      try {
        await api.getUserInfos(token);
      } catch (error) {
        signOut();
        navigate("/");
      }
    }

    checkToken();
  }, [token, signOut, navigate]);

  function handleValueChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    const numberString = value.replace(/\D/g, "");
    const intValue = parseInt(numberString);
    setCashOutInfo({ ...cashOutInfo, [name]: intValue });
  }

  function handleChangeUsername(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setCashOutInfo({ ...cashOutInfo, [name]: value });
  }

  async function sendCashOut() {
    try {
      if (!token) {
        navigate("/");
        return;
      }
      await api.postCashOut(token, cashOutInfo);
      navigate("/main");
    } catch (error: Error | AxiosError | any) {
      if (error.response) {
        setErrorMessage(error.response.data);
        return;
      }
      setErrorMessage("Erro, tente novamente em alguns segundos");
    }
  }

  return (
    <div className="cash-out-container">
      <header className="cash-out-header">
        <h1>Transfer Wallet</h1>
        <h2 className="cash-out-title">Cash Out</h2>
        <IoArrowBackCircleSharp
          className="back-button"
          onClick={() => navigate(-1)}
        />
      </header>
      <div className="username-field">
        <label htmlFor="username" className="username-label">
          Para:
        </label>
        <input
          id="username"
          type="text"
          name="creditedUsername"
          className="username"
          placeholder="username"
          onChange={handleChangeUsername}
          value={cashOutInfo.creditedUsername}
        />
      </div>
      <div className="value-field">
        <h2 className="value-title">Valor</h2>
        <div className="value-input">
          <input
            id="cash"
            type="text"
            name="value"
            className="cash"
            onChange={handleValueChange}
            value={valueToCurrency(cashOutInfo.value)}
          />
        </div>
        <button className="confirm-button" onClick={sendCashOut}>
          Confirmar
        </button>
        <p className="error">{errorMessage}</p>
      </div>
    </div>
  );
}
