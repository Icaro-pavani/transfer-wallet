import { jest } from "@jest/globals";
import supertest from "supertest";
import { faker } from "@faker-js/faker";

import app, { close, init } from "../../src/app.js";
import { cleanDB } from "../helper.js";
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

describe("POST /user", () => {
  it("should responde with status 422 when body is not give", async () => {
    const response = await server.post("/user");

    expect(response.statusCode).toBe(422);
  });

  it("should responde with status 422 when body is not valid", async () => {
    const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

    const response = await server.post("/user").send(invalidBody);

    expect(response.statusCode).toBe(422);
  });

  it("should respond with status 201 when body is valid and persist the data", async () => {
    const userData = createUserData();

    const response = await server.post("/user").send(userData);

    expect(response.statusCode).toBe(201);
    const user = await prisma.users.findUnique({
      where: { username: userData.username },
      include: { account: { select: { balance: true } } },
    });
    expect(user?.username).toBe(userData.username);
    expect(user?.account.balance).toBe(10000);
  });

  it("should responde with status 409 when body username is already registered", async () => {
    const userData = createUserData();

    await createUser(userData);

    const response = await server.post("/user").send(userData);

    expect(response.statusCode).toBe(409);
  });
});
