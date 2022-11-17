import { prisma } from "../config/database.js";
import { UserData } from "../schemas/userSchema.js";

async function findByUsername(username: string) {
  return prisma.users.findUnique({ where: { username } });
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

const userRepository = { findByUsername, create };

export default userRepository;