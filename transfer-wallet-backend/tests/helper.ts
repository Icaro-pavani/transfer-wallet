import { prisma } from "../src/config/database.js";
import jwt from "jsonwebtoken";

export async function cleanDB() {
  await prisma.users.deleteMany({});
  await prisma.accounts.deleteMany({});
  await prisma.transactions.deleteMany({});
}

export async function generateValidToken(id: number) {
  if (!process.env.JWT_KEY) {
    return;
  }
  const token = jwt.sign({ id }, process.env.JWT_KEY);

  return token;
}
