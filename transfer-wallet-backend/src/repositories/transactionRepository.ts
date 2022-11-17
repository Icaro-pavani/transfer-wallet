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

const transactionRepository = { create, update };

export default transactionRepository;
