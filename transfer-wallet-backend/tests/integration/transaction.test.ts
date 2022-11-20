import { jest } from "@jest/globals";
import supertest from "supertest";
import { faker } from "@faker-js/faker";

import app, { close, init } from "../../src/app.js";
import { cleanDB, generateValidToken } from "../helper.js";
import { createUser, createUserData } from "../factories/userFactory.js";
import { prisma } from "../../src/config/database.js";

const server = supertest(app);

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDB();
});

afterAll(async () => {
  await close();
});

describe("POST /transaction", () => {
  it("should respond with status 422 when body has value negative", async () => {
    const userInfo = createUserData();
    const userRegistered = await createUser(userInfo);
    const token = await generateValidToken(userRegistered.id);
    const transactionInfo = {
      creditedUsername: faker.name.firstName(),
      value: -1000,
    };

    const response = await server
      .post("/transaction")
      .set("Authorization", `Bearer ${token}`)
      .send(transactionInfo);

    expect(response.statusCode).toBe(422);
  });

  it("should respond with status 201 when body is valid", async () => {
    const userInfo = createUserData();
    const userRegistered = await createUser(userInfo);
    const token = await generateValidToken(userRegistered.id);
    const secondUserInfo = createUserData();
    await createUser(secondUserInfo);
    const transactionInfo = {
      creditedUsername: secondUserInfo.username,
      value: 1000,
    };

    const response = await server
      .post("/transaction")
      .set("Authorization", `Bearer ${token}`)
      .send(transactionInfo);

    expect(response.statusCode).toBe(201);
    const updatedUser = await prisma.users.findUnique({
      where: { id: userRegistered.id },
      include: { account: { select: { balance: true } } },
    });
    expect(updatedUser?.account.balance).toBe(10000 - transactionInfo.value);
  });
});

describe("GET /transaction", () => {
  it("should respond with status 200 and all transaction", async () => {
    const userInfo = createUserData();
    const userRegistered = await createUser(userInfo);
    const token = await generateValidToken(userRegistered.id);
    const secondUserInfo = createUserData();
    await createUser(secondUserInfo);
    const transactionInfo = {
      creditedUsername: secondUserInfo.username,
      value: 1000,
    };

    await server
      .post("/transaction")
      .set("Authorization", `Bearer ${token}`)
      .send(transactionInfo);

    const response = await server
      .get("/transaction")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.transactions).toHaveLength(1);
  });

  it("should respond with status 200 and only the cash outs transactions", async () => {
    const userInfo = createUserData();
    const userRegistered = await createUser(userInfo);
    const token = await generateValidToken(userRegistered.id);
    const secondUserInfo = createUserData();
    const secondRegisteredUser = await createUser(secondUserInfo);
    const token2 = await generateValidToken(secondRegisteredUser.id);
    const transactionInfo = {
      creditedUsername: secondUserInfo.username,
      value: 1000,
    };

    const secondTransactionInfo = {
      creditedUsername: userInfo.username,
      value: 2000,
    };

    await server
      .post("/transaction")
      .set("Authorization", `Bearer ${token}`)
      .send(transactionInfo);
    await server
      .post("/transaction")
      .set("Authorization", `Bearer ${token2}`)
      .send(secondTransactionInfo);

    const response = await server
      .get("/transaction?type=debitedAccountId")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.transactions).toHaveLength(1);
  });

  it("should respond status 200 and return one transaction of a specific date", async () => {
    const userInfo = createUserData();
    const userRegistered = await createUser(userInfo);
    const token = await generateValidToken(userRegistered.id);
    const secondUserInfo = createUserData();
    const secondRegisteredUser = await createUser(secondUserInfo);

    await prisma.transactions.create({
      data: {
        debitedAccountId: userRegistered.accountId,
        creditedAccountId: secondRegisteredUser.accountId,
        value: 10000,
        createdAt: new Date("2022-11-14"),
      },
    });
    await prisma.transactions.create({
      data: {
        debitedAccountId: userRegistered.accountId,
        creditedAccountId: secondRegisteredUser.accountId,
        value: 10000,
        createdAt: new Date("2022-11-13"),
      },
    });
    const initDate = "2022-11-13";
    const endDate = "2022-11-13";

    const response = await server
      .get(`/transaction?initDate=${initDate}&endDate=${endDate}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.transactions).toHaveLength(1);
  });

  it("should respond status 200 and return one transaction of a specific date and type", async () => {
    const userInfo = createUserData();
    const userRegistered = await createUser(userInfo);
    const token = await generateValidToken(userRegistered.id);
    const secondUserInfo = createUserData();
    const secondRegisteredUser = await createUser(secondUserInfo);

    await prisma.transactions.create({
      data: {
        debitedAccountId: userRegistered.accountId,
        creditedAccountId: secondRegisteredUser.accountId,
        value: 10000,
        createdAt: new Date("2022-11-14"),
      },
    });
    await prisma.transactions.create({
      data: {
        debitedAccountId: userRegistered.accountId,
        creditedAccountId: secondRegisteredUser.accountId,
        value: 10000,
        createdAt: new Date("2022-11-13"),
      },
    });
    await prisma.transactions.create({
      data: {
        debitedAccountId: secondRegisteredUser.accountId,
        creditedAccountId: userRegistered.accountId,
        value: 10000,
        createdAt: new Date("2022-11-13"),
      },
    });
    const initDate = "2022-11-13";
    const endDate = "2022-11-13";

    const response = await server
      .get(
        `/transaction?initDate=${initDate}&endDate=${endDate}&type=creditedAccountId`
      )
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.transactions).toHaveLength(1);
  });
});
