import React, { useState } from "react";
import { Link } from "react-router-dom";
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

  const checkCapitalLetter = /^(?=.*[A-Z])/;
  const checkNumber = /^(?=.*[0-9])/;

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setUserInfo({ ...userInfo, [name]: value });
  }

  return (
    <div className="signUpContainer">
      <h1>Transfer Wallet</h1>
      <h2>Cadastro</h2>
      <form>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          minLength={3}
          placeholder="Adicione um nome de usuário"
        />
        <label htmlFor="password">Senha</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Adicione uma senha"
          onChange={handleChange}
        />
        <ul>
          <p>Senha deve ser composta por:</p>
          <li className={userInfo.password.length >= 8 ? "done" : ""}>
            pelo menos 8 caracteres
          </li>
          <li className={checkNumber.test(userInfo.password) ? "done" : ""}>
            deve ter um número
          </li>
          <li
            className={checkCapitalLetter.test(userInfo.password) ? "done" : ""}
          >
            dever possuir uma letra maiúscula
          </li>
        </ul>
        <button type="submit">Cadastrar</button>
      </form>
      <Link className="link" to="/">
        Já possui cadastro? Então só se logar!
      </Link>
    </div>
  );
}
