jest.mock("@/lib/db", () => ({
  __esModule: true,
  default: jest.requireActual("@/__mocks__/prismaClient").default,
}));
