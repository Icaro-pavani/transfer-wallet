import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
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
  const { signIn, token } = useAuth();

  useEffect(() => {
    if (token) {
      navigate("/main");
    }
  }, [token, navigate]);

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
    <div className="signInContainer">
      <h1>Transfer Wallet</h1>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          minLength={3}
          placeholder="Insira nome de usuário"
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Senha</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Insira a senha"
          onChange={handleChange}
          required
        />
        <button className="submit" type="submit">
          Entrar
        </button>
        <p className="error">{errorMessage}</p>
      </form>
      <Link className="link" to="/sign-up">
        Não possui cadastro? Cadastre-se!
      </Link>
    </div>
  );
}
