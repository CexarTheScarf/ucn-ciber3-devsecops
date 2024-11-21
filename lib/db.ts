import "server-cli-only";
import { PrismaClient } from "@prisma/client";

const isTestEnvironment = process.env.NODE_ENV === "test";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

// Usa una instancia mockeada si estás en test
const prisma = isTestEnvironment
  ? (jest.requireMock("@/lib/db").default as PrismaClient)
  : (globalThis.prismaGlobal ?? prismaClientSingleton());

if (!isTestEnvironment && process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}

export default prisma;
