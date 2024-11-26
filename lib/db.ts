import "server-cli-only";
import { PrismaClient } from "@prisma/client";

const isTestEnvironment = process.env.NODE_ENV === "test";
console.log(`Is test environment: ${isTestEnvironment}`);

// Crea una nueva instancia de PrismaClient cada vez que se importa
let prisma: PrismaClient;

if (isTestEnvironment) {
  // Usa una instancia mockeada para pruebas
  prisma = jest.requireMock("@/lib/db").default as PrismaClient;
} else {
  // Crea una nueva instancia de PrismaClient para cada importación
  prisma = new PrismaClient();
}

// Exporta la instancia de PrismaClient
export default prisma;
