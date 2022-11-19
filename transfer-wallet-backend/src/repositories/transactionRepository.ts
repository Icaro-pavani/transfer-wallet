import { prisma } from "../config/database.js";

async function create(
  debitedAccountId: number,
  creditedAccountId: number,
  value: number
) {
  return prisma.transactions.create({
    data: {
      debitedAccountId,
      creditedAccountId,
      value,
    },
  });
}

async function update(transactionId: number, value: number) {
  await prisma.transactions.update({
    where: { id: transactionId },
    data: {
      creditedAccount: {
        update: {
          balance: { increment: value },
        },
      },
      debitedAccount: {
        update: {
          balance: { decrement: value },
        },
      },
    },
  });
}

async function findAll(userId: number) {
  return prisma.transactions.findMany({
    where: {
      OR: [{ creditedAccountId: userId }, { debitedAccountId: userId }],
    },
    include: {
      creditedAccount: {
        select: { Users: { select: { username: true } } },
      },
      debitedAccount: {
        select: { Users: { select: { username: true } } },
      },
    },
  });
}

async function findByDate(userId: number, initDate: string, endDate: string) {
  return prisma.transactions.findMany({
    where: {
      createdAt: {
        gte: new Date(initDate),
        lte: new Date(endDate),
      },
      OR: [{ creditedAccountId: userId }, { debitedAccountId: userId }],
    },
    include: {
      creditedAccount: {
        select: { Users: { select: { username: true } } },
      },
      debitedAccount: {
        select: { Users: { select: { username: true } } },
      },
    },
  });
}

async function findByType(userId: number, type: TransactionType) {
  return prisma.transactions.findMany({
    where: {
      [type]: userId,
    },
    include: {
      creditedAccount: {
        select: { Users: { select: { username: true } } },
      },
      debitedAccount: {
        select: { Users: { select: { username: true } } },
      },
    },
  });
}

async function findByDateAndType(
  userId: number,
  initDate: string,
  endDate: string,
  type: TransactionType
) {
  return prisma.transactions.findMany({
    where: {
      createdAt: {
        gte: new Date(initDate),
        lte: new Date(endDate),
      },
      [type]: userId,
    },
    include: {
      creditedAccount: {
        select: { Users: { select: { username: true } } },
      },
      debitedAccount: {
        select: { Users: { select: { username: true } } },
      },
    },
  });
}

const transactionRepository = {
  create,
  update,
  findAll,
  findByDate,
  findByType,
  findByDateAndType,
};

export default transactionRepository;

export type TransactionType = "creditedAccountId" | "debitedAccountId";
