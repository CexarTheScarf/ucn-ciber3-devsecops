import { PrismaClient } from "@prisma/client";

// Crea un mock de PrismaClient
const prismaMock = {
  user: {
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findUnique: jest.fn(),
  },
  post: {
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findUnique: jest.fn(),
  },
  // Agrega más modelos según tu esquema
} as unknown as PrismaClient;

// Exporta el mock
export default prismaMock;
