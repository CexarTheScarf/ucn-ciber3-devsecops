import "server-cli-only";
import { compareSync, hashSync } from "bcryptjs";
import { getEnvValue } from "@/lib/env";

// ================ PASSWORD HASHING ================

export function createHash(element: string): string {
  return hashSync(
    element + getEnvValue("SECRET_SALT"),
    +getEnvValue("SALT_ROUNDS"),
  );
}

export function compareHash(element: string, hashedElement: string): boolean {
  return compareSync(element + getEnvValue("SECRET_SALT"), hashedElement);
}
