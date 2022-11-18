import { AxiosError } from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import api from "../../services/api";
import "./style.css";

interface FormData {
  username: string;
  password: string;
}

export default function SignIn() {
  const [userInfo, setUserInfo] = useState<FormData>({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string>("");

  const navigate = useNavigate();
  const { signIn } = useAuth();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setUserInfo({ ...userInfo, [name]: value });
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    try {
      const {
        data: { token },
      } = await api.userSignIn(userInfo);
      console.log(token);
      signIn(token);
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
        <button type="submit">Cadastrar</button>
        <p className="error">{errorMessage}</p>
      </form>
      <Link className="link" to="/sign-up">
        Não possui cadastro? Cadastre-se!
      </Link>
    </div>
  );
}
