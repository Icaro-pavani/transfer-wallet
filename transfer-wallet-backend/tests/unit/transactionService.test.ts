import { jest } from "@jest/globals";

import userRepository from "../../src/repositories/userRepository.js";
import transactionRepository from "../../src/repositories/transactionRepository.js";
import transactionService from "../../src/services/transactionService.js";

beforeEach(() => {
  jest.resetAllMocks();
});

describe("Transaction service test suite", () => {
  it("Add one transaction for other user with the right username and enough amount", async () => {
    jest.spyOn(userRepository, "findById").mockImplementation((): any => {
      return { username: "Test", account: { balance: 10000 } };
    });
    jest
      .spyOn(userRepository, "findByUsername")
      .mockImplementation((): any => true);
    jest
      .spyOn(transactionRepository, "create")
      .mockImplementation((): any => ({ id: 1 }));
    jest
      .spyOn(transactionRepository, "update")
      .mockImplementation((): any => true);

    const cashOutUser = {
      creditedUsername: "Test2",
      value: 2000,
    };
    const userId = 2;

    await transactionService.createTransaction(userId, cashOutUser);

    expect(userRepository.findById).toBeCalledTimes(1);
    expect(userRepository.findByUsername).toBeCalledTimes(1);
    expect(transactionRepository.create).toBeCalledTimes(1);
    expect(transactionRepository.update).toBeCalledTimes(1);
  });

  it("Fail to add one transaction for other user with the same username", async () => {
    jest.spyOn(userRepository, "findById").mockImplementation((): any => {
      return { username: "Test", account: { balance: 10000 } };
    });
    jest
      .spyOn(userRepository, "findByUsername")
      .mockImplementation((): any => true);
    jest
      .spyOn(transactionRepository, "create")
      .mockImplementation((): any => ({ id: 1 }));
    jest
      .spyOn(transactionRepository, "update")
      .mockImplementation((): any => true);

    const cashOutUser = {
      creditedUsername: "Test",
      value: 2000,
    };
    const userId = 2;

    try {
      await transactionService.createTransaction(userId, cashOutUser);
    } catch (error) {
      expect(error).toEqual({
        name: "conflict",
        message: "Cannot cash out to the same user!",
      });
    }

    expect(userRepository.findById).toBeCalledTimes(1);
    expect(userRepository.findByUsername).toBeCalledTimes(0);
    expect(transactionRepository.create).toBeCalledTimes(0);
    expect(transactionRepository.update).toBeCalledTimes(0);
  });

  it("Fail to add one transaction for other user with value greater than their balance", async () => {
    jest.spyOn(userRepository, "findById").mockImplementation((): any => {
      return { username: "Test", account: { balance: 10000 } };
    });
    jest
      .spyOn(userRepository, "findByUsername")
      .mockImplementation((): any => true);
    jest
      .spyOn(transactionRepository, "create")
      .mockImplementation((): any => ({ id: 1 }));
    jest
      .spyOn(transactionRepository, "update")
      .mockImplementation((): any => true);

    const cashOutUser = {
      creditedUsername: "Test2",
      value: 20000,
    };
    const userId = 2;

    try {
      await transactionService.createTransaction(userId, cashOutUser);
    } catch (error) {
      expect(error).toEqual({
        name: "unauthorized",
        message: "Amount insufficient!",
      });
    }

    expect(userRepository.findById).toBeCalledTimes(1);
    expect(userRepository.findByUsername).toBeCalledTimes(0);
    expect(transactionRepository.create).toBeCalledTimes(0);
    expect(transactionRepository.update).toBeCalledTimes(0);
  });

  it("Fail to add one transaction to a nonexisting user", async () => {
    jest.spyOn(userRepository, "findById").mockImplementation((): any => {
      return { username: "Test", account: { balance: 10000 } };
    });
    jest
      .spyOn(userRepository, "findByUsername")
      .mockImplementation((): any => false);
    jest
      .spyOn(transactionRepository, "create")
      .mockImplementation((): any => ({ id: 1 }));
    jest
      .spyOn(transactionRepository, "update")
      .mockImplementation((): any => true);

    const cashOutUser = {
      creditedUsername: "Test2",
      value: 2000,
    };
    const userId = 2;

    try {
      await transactionService.createTransaction(userId, cashOutUser);
    } catch (error) {
      expect(error).toEqual({
        name: "notFound",
        message: "Cash-in user not found!",
      });
    }

    expect(userRepository.findById).toBeCalledTimes(1);
    expect(userRepository.findByUsername).toBeCalledTimes(1);
    expect(transactionRepository.create).toBeCalledTimes(0);
    expect(transactionRepository.update).toBeCalledTimes(0);
  });

  it("Get all users transactions", async () => {
    jest
      .spyOn(transactionRepository, "findAll")
      .mockImplementation((): any => "find all");
    jest
      .spyOn(transactionRepository, "findByType")
      .mockImplementation((): any => "find by type");
    jest
      .spyOn(transactionRepository, "findByDate")
      .mockImplementation((): any => "find by date");
    jest
      .spyOn(transactionRepository, "findByDateAndType")
      .mockImplementation((): any => "find by date and type");
    jest.spyOn(userRepository, "findById").mockImplementation((): any => true);

    const userId = 2;

    const result = await transactionService.getAllTransactions(
      userId,
      "",
      "",
      ""
    );
    expect(result).toBe("find all");
    expect(userRepository.findById).toBeCalledTimes(1);
    expect(transactionRepository.findAll).toBeCalledTimes(1);
    expect(transactionRepository.findByDate).toBeCalledTimes(0);
    expect(transactionRepository.findByType).toBeCalledTimes(0);
    expect(transactionRepository.findByDateAndType).toBeCalledTimes(0);
  });

  it("Get all users transactions by date", async () => {
    jest
      .spyOn(transactionRepository, "findAll")
      .mockImplementation((): any => "find all");
    jest
      .spyOn(transactionRepository, "findByType")
      .mockImplementation((): any => "find by type");
    jest
      .spyOn(transactionRepository, "findByDate")
      .mockImplementation((): any => "find by date");
    jest
      .spyOn(transactionRepository, "findByDateAndType")
      .mockImplementation((): any => "find by date and type");
    jest.spyOn(userRepository, "findById").mockImplementation((): any => true);

    const userId = 2;

    const result = await transactionService.getAllTransactions(
      userId,
      "",
      "2022-11-13",
      "2022-11-17"
    );
    expect(result).toBe("find by date");
    expect(userRepository.findById).toBeCalledTimes(1);
    expect(transactionRepository.findAll).toBeCalledTimes(0);
    expect(transactionRepository.findByDate).toBeCalledTimes(1);
    expect(transactionRepository.findByType).toBeCalledTimes(0);
    expect(transactionRepository.findByDateAndType).toBeCalledTimes(0);
  });

  it("Get all users transactions by date and type", async () => {
    jest
      .spyOn(transactionRepository, "findAll")
      .mockImplementation((): any => "find all");
    jest
      .spyOn(transactionRepository, "findByType")
      .mockImplementation((): any => "find by type");
    jest
      .spyOn(transactionRepository, "findByDate")
      .mockImplementation((): any => "find by date");
    jest
      .spyOn(transactionRepository, "findByDateAndType")
      .mockImplementation((): any => "find by date and type");
    jest.spyOn(userRepository, "findById").mockImplementation((): any => true);

    const userId = 2;

    const result = await transactionService.getAllTransactions(
      userId,
      "creditedAccountId",
      "2022-11-13",
      "2022-11-17"
    );
    expect(result).toBe("find by date and type");
    expect(userRepository.findById).toBeCalledTimes(1);
    expect(transactionRepository.findAll).toBeCalledTimes(0);
    expect(transactionRepository.findByDate).toBeCalledTimes(0);
    expect(transactionRepository.findByType).toBeCalledTimes(0);
    expect(transactionRepository.findByDateAndType).toBeCalledTimes(1);
  });

  it("Get all users transactions by type", async () => {
    jest
      .spyOn(transactionRepository, "findAll")
      .mockImplementation((): any => "find all");
    jest
      .spyOn(transactionRepository, "findByType")
      .mockImplementation((): any => "find by type");
    jest
      .spyOn(transactionRepository, "findByDate")
      .mockImplementation((): any => "find by date");
    jest
      .spyOn(transactionRepository, "findByDateAndType")
      .mockImplementation((): any => "find by date and type");
    jest.spyOn(userRepository, "findById").mockImplementation((): any => true);

    const userId = 2;

    const result = await transactionService.getAllTransactions(
      userId,
      "creditedAccountId",
      "",
      ""
    );
    expect(result).toBe("find by type");
    expect(userRepository.findById).toBeCalledTimes(1);
    expect(transactionRepository.findAll).toBeCalledTimes(0);
    expect(transactionRepository.findByDate).toBeCalledTimes(0);
    expect(transactionRepository.findByType).toBeCalledTimes(1);
    expect(transactionRepository.findByDateAndType).toBeCalledTimes(0);
  });
});
