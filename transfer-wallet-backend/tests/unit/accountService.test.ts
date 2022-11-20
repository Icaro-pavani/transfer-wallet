import { jest } from "@jest/globals";

import userRepository from "../../src/repositories/userRepository.js";
import accountService from "../../src/services/accountService.js";

beforeEach(() => {
  jest.resetAllMocks();
});

describe("Account service test suite", () => {
  it("get username and balance with correct user id", async () => {
    jest
      .spyOn(userRepository, "findById")
      .mockImplementation((userId: number): any => {
        return { username: "Test", account: { balance: 10000 } };
      });

    const userId = 2;

    const result = await accountService.getAccountInfo(userId);
    expect(result.username).toBe("Test");
    expect(result.balance).toBe(10000);
    expect(userRepository.findById).toBeCalledTimes(1);
  });

  it("with wrong user id fail to get username and balance", async () => {
    jest
      .spyOn(userRepository, "findById")
      .mockImplementation((userId: number): any => {
        return false;
      });

    try {
      const userId = 2;
      const result = await accountService.getAccountInfo(userId);
    } catch (error) {
      expect(error).toEqual({
        name: "notFound",
        message: "User not found!",
      });
      expect(userRepository.findById).toBeCalledTimes(1);
    }
  });
});
