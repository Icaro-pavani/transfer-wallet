import { jest } from "@jest/globals";
import supertest from "supertest";

import app, { close, init } from "../../src/app.js";
import { cleanDB, generateValidToken } from "../helper.js";
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

describe("GET /account", () => {
  it("should respond with status 401 when token is invalid", async () => {
    const response = await server
      .get("/account")
      .set("Authorization", "Bearer khas@DSFLwd;ikljkljnsadjk");

    expect(response.statusCode).toBe(401);
    expect(response.text).toBe("Invalid or expired Token!");
  });

  it("should respond with status 422 when no header is sent", async () => {
    const response = await server.get("/account");

    expect(response.statusCode).toBe(422);
    expect(response.text).toBe("Missing headers!");
  });

  it("should respond with status 422 when token is not send", async () => {
    const response = await server
      .get("/account")
      .set("Authorization", "Bearer");

    expect(response.statusCode).toBe(422);
    expect(response.text).toBe("Token not found!");
  });

  it("should respond with status 404 when the token has no valid id inside", async () => {
    const token = await generateValidToken(1);

    const response = await server
      .post("/account")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(404);
  });

  it("should respond with status 200 and the info of username and balance", async () => {
    const userInfo = createUserData();
    const userRegistered = await createUser(userInfo);
    const token = await generateValidToken(userRegistered.id);

    const response = await server
      .get("/account")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.account.username).toBe(userInfo.username);
    expect(response.body.account.balance).toBe(10000);
  });
});
