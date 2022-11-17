import { PrismaClient } from "@prisma/client";

export let prisma: PrismaClient;

export async function connectDB(): Promise<void> {
  prisma = new PrismaClient();
}

export async function disconnectDB(): Promise<void> {
  await prisma?.$disconnect();
}
