import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";
import { Users } from "@prisma/client";
import { prisma } from "../../src/config/database";

export function createUserData() {
  return {
    username: faker.name.firstName(),
    password:
      faker.internet.password(3, false, /[a-z]/) +
      faker.internet.password(3, false, /[A-Z]/) +
      faker.internet.password(3, false, /[0-9]/),
  };
}

export async function createUser(params: {
  username: string;
  password: string;
}): Promise<Users> {
  const hashedPassword = await bcrypt.hash(params.password, 10);

  return prisma.users.create({
    data: {
      username: params.username,
      password: hashedPassword,
      account: {
        create: {
          balance: 10000,
        },
      },
    },
  });
}
