// prismaMock.ts
import { PrismaClient } from "@prisma/client";
import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended";

// Mock Prisma client globalmente
jest.mock("@/lib/db", () => {
  console.log("Mock de Prisma inyectado");
  return {
    __esModule: true,
    default: mockDeep<PrismaClient>(),
  };
});

export const prismaMock = jest.requireMock("@/lib/db")
  .default as DeepMockProxy<PrismaClient>;

// Resetear mocks antes de cada test
beforeEach(() => {
  mockReset(prismaMock);
});

// Contexto para la inyección de dependencias (opcional)
export type Context = { prisma: PrismaClient };
export const createMockContext = (): Context => ({ prisma: prismaMock });
