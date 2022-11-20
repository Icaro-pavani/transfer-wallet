# <p align = "center"> Transfer Wallet - Desafio NG.CASH </p>

<p align = "center">
   <img src="https://img.shields.io/badge/author-Icaro Pavani-4dae71?style=flat-square" />
   <img src="https://img.shields.io/github/languages/count/Icaro-pavani/transfer-wallet?color=4dae71&style=flat-square" />
</p>

## :clipboard: Descrição

O projeto tem como objetivo possibilitar que usuários da NG possam realizar transferências internas entre si.

---

## :computer: Técnologias e Conceitos

- REST API
- Node.js
- PostgreSQL
- Express
- TypeScript
- Jest
- React
- Axios
- Create React App

---

## 🏁 Rodando a aplicação

Este projeto foi criado usando TypeScript, [Node.js](https://nodejs.org/en/download/) e [PostgreSQL](https://www.postgresql.org/) como banco de dados para o back-end. O front-end foi inicializado com o [Create React App](https://github.com/facebook/create-react-app). Então, certifique-se que você tem a última versão estável do [Node.js](https://nodejs.org/en/download/) e [npm](https://www.npmjs.com/) rodando localmente, caso deseje instalar e executar a aplicação em sua máquina.

Primeiro, faça o clone ou download desse repositório em sua máquina:

```
https://github.com/Icaro-pavani/transfer-wallet.git
```

Depois de clonado ou baixado, entre na pasta raíz do projeto `/transfer-wallet`. Dentro dela, existem as pastas [`/transfer-wallet-backend`](https://github.com/Icaro-pavani/transfer-wallet/tree/main/transfer-wallet-backend) e [`/transfer-wallet-front-end`](https://github.com/Icaro-pavani/transfer-wallet/tree/main/transfer-wallet-front-end), contendo o Back-end e o Front-end do projeto, respectivamente. Dentro de cada uma dessas pastas há um README com as instruções de instalação, configuração e inicialização de cada aplicação.

### Docker

A aplicação também pode ser executada através do Docker, sem a necessidade de instalar as dependências localmente. Para isso, é necessário ter instalado o [Docker](https://www.docker.com/) e o [docker-compose](https://docs.docker.com/compose/install/) localmente.

Após isso, é necessário adicionar um arquivo `.env` tanto na pasta [`/transfer-wallet-backend`](https://github.com/Icaro-pavani/transfer-wallet/tree/main/transfer-wallet-backend) quanto na pasta [`/transfer-wallet-front-end`](https://github.com/Icaro-pavani/transfer-wallet/tree/main/transfer-wallet-front-end), seguindo o padrão fornecido no arquivo `.env.example`. (Obs.: No arquivo compactado enviado, já existe os arquivos .env)

Com os arquivos adicionados, basta rodar os 2 comandos abaixo:

```yml
docker-compose build
```

e

```yml
docker-compose up
```

Por fim, a aplicação pode ser acessada pelo endereço `http://localhost:80`, na qual poderá interagir com o Front-end da aplicação. Caso tenha interesse em acessar as rotas do Back-end, elas podem ser acessadas pelo endereço `http://localhost:80/api`. A rotas presentes nesse endereço estão detalhadas no README dentro da pasta [`/transfer-wallet-backend`](https://github.com/Icaro-pavani/transfer-wallet/tree/main/transfer-wallet-backend).
