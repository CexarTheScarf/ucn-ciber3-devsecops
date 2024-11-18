import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  // Add your moduleNameMapper to resolve custom paths
  moduleNameMapper: {
    "^@/components/(.*)$": "<rootDir>/components/$1",
    // Agrega aquí otras rutas si es necesario
    "^@/(.*)$": "<rootDir>/$1",
    "^@/lib/(.*)$": "<rootDir>/lib/$1",
    "^@/__mocks__/(.*)$": "<rootDir>/__mocks__/$1",
  },
  // Otros posibles ajustes, como setupFilesAfterEnv
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
