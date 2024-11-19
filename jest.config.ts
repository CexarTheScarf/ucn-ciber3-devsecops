import nextJest from "next/jest";
import type { Config } from "jest";

// Configuración básica de Next.js para Jest
const createJestConfig = nextJest({
  dir: "./", // Apunta a la raíz del proyecto Next.js
});

const customJestConfig: Config = {
  clearMocks: true,
  testEnvironment: "node", // Cambiar a "node" si pruebas solo backend
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // Configuración inicial para Jest
  moduleNameMapper: {
    "^@/components/(.*)$": "<rootDir>/components/$1",
    "^@/(.*)$": "<rootDir>/$1",
    "^@/lib/(.*)$": "<rootDir>/lib/$1",
    "^@/__mocks__/(.*)$": "<rootDir>/__mocks__/$1",
  },
  coverageProvider: "v8", // Para obtener reportes de cobertura
};

export default createJestConfig(customJestConfig);
