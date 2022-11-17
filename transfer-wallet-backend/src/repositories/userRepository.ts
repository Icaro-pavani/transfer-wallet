import { prisma } from "../config/database.js";
import { UserData } from "../schemas/userSchema.js";

async function findByUsername(username: string) {
  return prisma.users.findUnique({ where: { username } });
}

async function findById(id: number) {
  return prisma.users.findUnique({ where: { id }, include: { account: true } });
}

async function create(userInfo: UserData) {
  const startBalance = 10000;
  const { username, password } = userInfo;
  await prisma.users.create({
    data: {
      username,
      password,
      account: {
        create: {
          balance: startBalance,
        },
      },
    },
  });
}

const userRepository = { findByUsername, findById, create };

export default userRepository;
