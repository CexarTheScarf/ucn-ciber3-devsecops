// prismaMock.ts
import { PrismaClient } from "@prisma/client";
import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended";

// Mock Prisma client globally
jest.mock("./lib/db", () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

export const prismaMock = jest.requireMock("./lib/db")
  .default as DeepMockProxy<PrismaClient>;

// Reset mocks before each test
beforeEach(() => {
  mockReset(prismaMock);
});

// Context for Dependency Injection (optional)
export type Context = { prisma: PrismaClient };
export const createMockContext = (): Context => ({ prisma: prismaMock });
