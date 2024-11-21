import { PrismaClient } from "@prisma/client";
import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended";

// Inicializar el mock
const prismaMockInstance = mockDeep<PrismaClient>();

// Mock Prisma client globalmente
jest.mock("@/lib/db", () => {
  console.log("Mock de Prisma inyectado");
  return {
    __esModule: true,
    default: prismaMockInstance, // Usa la instancia ya inicializada
  };
});

// Exportar el mock
export const prismaMock = prismaMockInstance as DeepMockProxy<PrismaClient>;

// Resetear mocks antes de cada test
beforeEach(() => {
  mockReset(prismaMock);
});
