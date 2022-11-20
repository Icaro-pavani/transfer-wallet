import { jest } from "@jest/globals";
import supertest from "supertest";

import app, { close, init } from "../../src/app.js";
import { cleanDB } from "../helper.js";
import { createUser, createUserData } from "../factories/userFactory.js";

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

describe("POST /auth", () => {
  it("should respond with status 401 when body is not registered", async () => {
    const userInfo = createUserData();

    const response = await server.post("/auth").send(userInfo);

    expect(response.statusCode).toBe(401);
    expect(response.text).toBe("Invalid username or password!");
  });

  it("should respond with status 200 and a token when body is valid", async () => {
    const userInfo = createUserData();
    await createUser(userInfo);

    const response = await server.post("/auth").send(userInfo);
    expect(response.statusCode).toBe(200);
    expect(response.body).not.toBeNull();
  });
});
