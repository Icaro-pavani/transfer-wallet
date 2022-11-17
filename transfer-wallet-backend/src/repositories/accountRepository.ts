import { prisma } from "../config/database.js";

async function findbyId(id: number) {
  return prisma.accounts.findUnique({ where: { id } });
}

const accountRepository = { findbyId };

export default accountRepository;
