import { jest } from "@jest/globals";

import userRepository from "../../src/repositories/userRepository.js";
import userService from "../../src/services/userService.js";

beforeEach(() => {
  jest.resetAllMocks();
});

describe("User service test suite", () => {
  it("Create user with new username and password", async () => {
    jest.spyOn(userRepository, "findByUsername").mockImplementation((): any => {
      return false;
    });
    jest.spyOn(userRepository, "create").mockImplementation((): any => true);

    const userInfo = {
      username: "Test",
      password: "Test01test",
    };

    await userService.createUser(userInfo);
    expect(userRepository.findByUsername).toBeCalledTimes(1);
    expect(userRepository.create).toBeCalledTimes(1);
  });

  it("Fail to create user with username registered", async () => {
    jest.spyOn(userRepository, "findByUsername").mockImplementation((): any => {
      return true;
    });
    jest.spyOn(userRepository, "create").mockImplementation((): any => true);

    const userInfo = {
      username: "Test",
      password: "Test01test",
    };

    try {
      await userService.createUser(userInfo);
    } catch (error) {
      expect(error).toEqual({
        name: "conflict",
        message: "Username already registered!",
      });
    }

    expect(userRepository.findByUsername).toBeCalledTimes(1);
    expect(userRepository.create).toBeCalledTimes(0);
  });
});
