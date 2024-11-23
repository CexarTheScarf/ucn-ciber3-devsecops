import "server-cli-only";
import { PrismaClient } from "@prisma/client";

const isTestEnvironment = process.env.NODE_ENV === "test";
console.log(`Is test environment: ${isTestEnvironment}`);

// Singleton para evitar múltiples instancias en desarrollo
const prismaClientSingleton = () => new PrismaClient();

declare const globalThis: {
  prismaGlobal?: PrismaClient;
} & typeof global;

// Usa una instancia mockeada si estás en test
let prisma: PrismaClient;

if (isTestEnvironment) {
  prisma = jest.requireMock("@/lib/db").default as PrismaClient;
} else {
  prisma = globalThis.prismaGlobal ?? prismaClientSingleton();
  if (process.env.NODE_ENV !== "production") {
    globalThis.prismaGlobal = prisma;
  }
}

export default prisma;
