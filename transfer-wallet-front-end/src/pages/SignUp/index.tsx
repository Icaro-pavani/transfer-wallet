import { AxiosError } from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./style.css";

interface FormData {
  username: string;
  password: string;
}

export default function SignUp() {
  const [userInfo, setUserInfo] = useState<FormData>({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string>("");

  const navigate = useNavigate();

  const checkCapitalLetter = /^(?=.*[A-Z])/;
  const checkNumber = /^(?=.*[0-9])/;

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setUserInfo({ ...userInfo, [name]: value });
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    try {
      await api.userSignUp(userInfo);
      navigate("/");
    } catch (error: Error | AxiosError | any) {
      if (error.response) {
        setErrorMessage(error.response.data);
        return;
      }
      setErrorMessage("Erro, tente novamente em alguns segundos");
    }
  }

  return (
    <div className="signUpContainer">
      <h1>Transfer Wallet</h1>
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          minLength={3}
          placeholder="Adicione um nome de usuário"
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Senha</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Adicione uma senha"
          onChange={handleChange}
          required
        />
        <ul className="bullet-list">
          <p>Senha deve ser composta por:</p>
          <li className={userInfo.password.length >= 8 ? "done list" : "list"}>
            pelo menos 8 caracteres
          </li>
          <li
            className={
              checkNumber.test(userInfo.password) ? "done list" : "list"
            }
          >
            deve ter um número
          </li>
          <li
            className={
              checkCapitalLetter.test(userInfo.password) ? "done list" : "list"
            }
          >
            dever possuir uma letra maiúscula
          </li>
        </ul>
        <button className="submit" type="submit">
          Cadastrar
        </button>
        <p className="error">{errorMessage}</p>
      </form>
      <Link className="link" to="/">
        Já possui cadastro? Clique aqui para se logar!
      </Link>
    </div>
  );
}
