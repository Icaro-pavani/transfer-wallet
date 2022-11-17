import { prisma } from "../config/database.js";

async function findById(id: number) {
  return prisma.accounts.findUnique({
    where: { id },
    include: {
      cashInAccounts: {
        select: {
          createdAt: true,
          value: true,
          debitedAccount: { select: { Users: { select: { username: true } } } },
        },
      },
      cashOutAccounts: {
        select: {
          createdAt: true,
          value: true,
          creditedAccount: {
            select: { Users: { select: { username: true } } },
          },
        },
      },
    },
  });
}

const accountRepository = { findById };

export default accountRepository;
