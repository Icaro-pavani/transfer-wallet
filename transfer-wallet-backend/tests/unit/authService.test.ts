import { jest } from "@jest/globals";
import bcrypt from "bcrypt";

import userRepository from "../../src/repositories/userRepository.js";
import authService from "../../src/services/authService.js";

beforeEach(() => {
  jest.resetAllMocks();
});

describe("Authorization service test suite", () => {
  it("Return token with valid username and password", async () => {
    jest
      .spyOn(userRepository, "findByUsername")
      .mockImplementation((): any => {
        return { id: 2, password: "hsjd23jhjhcj" };
      });
    jest.spyOn(bcrypt, "compareSync").mockImplementation(() => true);

    const userInfo = {
      username: "Test",
      password: "Test01test",
    };
    const result = await authService.login(userInfo);
    expect(result).not.toBeNull;
    expect(userRepository.findByUsername).toBeCalledTimes(1);
    expect(bcrypt.compareSync).toBeCalledTimes(1);
  });

  it("Fail to return token with invalid username", async () => {
    jest
      .spyOn(userRepository, "findByUsername")
      .mockImplementation((): any => {
        return false;
      });
    jest.spyOn(bcrypt, "compareSync").mockImplementation(() => true);

    const userInfo = {
      username: "Test",
      password: "Test01test",
    };
    try {
      const result = await authService.login(userInfo);
    } catch (error) {
      expect(error).toEqual({
        name: "unauthorized",
        message: "Invalid username or password!",
      });
    }
    expect(userRepository.findByUsername).toBeCalledTimes(1);
    expect(bcrypt.compareSync).toBeCalledTimes(0);
  });

  it("Fail to return token with invalid password", async () => {
    jest
      .spyOn(userRepository, "findByUsername")
      .mockImplementation((): any => {
        return { id: 2, password: "hsjd23jhjhcj" };
      });
    jest.spyOn(bcrypt, "compareSync").mockImplementation(() => false);

    const userInfo = {
      username: "Test",
      password: "Test01test",
    };
    try {
      const result = await authService.login(userInfo);
    } catch (error) {
      expect(error).toEqual({
        name: "unauthorized",
        message: "Invalid username or password!",
      });
    }
    expect(userRepository.findByUsername).toBeCalledTimes(1);
    expect(bcrypt.compareSync).toBeCalledTimes(1);
  });
});
