# Back-end: Transfer Wallet - Desafio NG.CASH

## :clipboard: Descrição

O projeto tem como objetivo possibilitar que usuários da NG possam realizar transferências internas entre si.

---

## :computer: Técnologias e Conceitos

- REST API
- Node.js
- PostgreSQL
- Express
- JWT
- TypeScript
- Jest

---

## 🏁 Rodando a aplicação

Dentro da pasta desse projeto, inicie pela instalação das dependências pelo comando:

```yml
npm install
```

Terminado a instalação, crie um arquivo `.env` seguindo o formato fornecido no `.env.example`, mas troque o termo `transfer-wallet-postgres` por localhost para poder rodar localmente.

Para utilizar a API em modo de desenvolvimento, comece utilizando utilize o comando:

```yml
prisma:deploy
```

e depois:

```yml
npm run dev
```

que irá inicializar a aplicação em modo de desenvolvimento. De modo que a url [http://localhost:5000](http://localhost:5000) irá se tornar o endereço base da api e onde poderá ser feita as requisições das diferentes rotas.

Para criar a aplicação em formato de produção. Utilize o comando:

```yml
npm run build
```

Ele irá criar os arquivos de produção na pasta `/dist`. Que poderão ser executados por meio do comando:

```yml
npm start
```

inicializando o back-end.

### Testes

Em relação aos teste, é necessário criar um arquivo `.env.test` que tem o mesmo formato do arquivo `.env.example` e adicionar a ele a URL do banco de dados local para os testes. Após isso é só utilizar os comandos na sequência:

```yml
npm run test:migration:run
```

```yml
npm run test
```

para executar os testes vinculados a API.

### Docker Testes

Para executar os testes pelo Docker, deve-se criar o arquivo `.env.test` seguindo o `.env.example`, e no endereço do banco de dados colocar o termo `transfer-wallet-postgres-test`. E executar os seguintes comandos:

```yml
npm run test:docker:build
```

e

```yml
npm run test:docker:run-test
```

Os testes serão executados automaticamente.

---

## :rocket: Routes

GET /api-docs

- Rota responsável por trazer a documentação das rotas da API
- Utilizar no navegar para mostrar a documentação

```yml
POST /user
    - Rota responsável porregistrar um usuário
    - headers: {}
    - body: {
        "username": Username,
        "password": "Tkdjf2398"
    }
    - response: {}
```

```yml
POST /auth
    - Rota responsável por executar o login de um usuário na aplicação
    - headers: {}
    - body: {
        "username": Username,
        "password": "Tkdjf2398"
    }
    - response: {
        "token": "eyJhbGciOiJIUzI1..."
    }
```

```yml
GET /user (autenticada)
    - Rota responsável por obter o nome do usuário e seu balanço financeiro
    - headers: {"Authorization":  "Bearer $token"}
    - body: {}
    - response: {
        "account": {
            "username": "Username",
            "balance": 10000
        }
    }
```

```yml
POST /transaction (autenticada)
    - Rota responsável por adicionar um cash out para um usuária específico
    - headers: {"Authorization":  "Bearer $token"}
    - body: {
        "username": "Icarus",
        "password": "Dragao4658"
    }
    - response: {}
```

```yml
GET /transaction (autenticada)
    - Rota responsável por obter todas as transações do usuário
    - parameters: {
        query: {
            initDate: 2022-11-14,
            endDate: 2022-11-16,
            type: creditedAccountId | debitedAccountId
        }
    } # exemplo: http://localhost:80/api/transaction?initDate=2022-11-14&endDate=2022-11-16&type=creditedAccountId
    - headers: {"Authorization":  "Bearer $token"}
    - body: {}
    - response: {
        "transactions": [
            {
                "id": 1,
                "debitedAccountId": 1,
                "creditedAccountId": 2,
                "value": 4200,
                "createdAt": "2022-11-20T00:00:00.000Z",
                "creditedAccount": {
                    "Users": {
                        "username": "Teste4"
                    }
                },
                "debitedAccount": {
                    "Users": {
                        "username": "Username"
                    }
                }
            }
        ]
    }
```
