import "server-cli-only";
import { randomUUID } from "crypto";
import { getEnvValue } from "@/lib/env";
import { SessionJWTPayload } from "@/lib/schemas";
import { encodeCallbackToUint8Array, decodeCallbackFromB64 } from "@/lib/utils";
import {
  JWTPayload,
  SignJWT,
  jwtVerify,
  CompactEncrypt,
  compactDecrypt,
} from "jose";

const AUTH_SIGN = encodeCallbackToUint8Array(getEnvValue("AUTH_SIGN"));
const AUTH_KEY = decodeCallbackFromB64(
  encodeCallbackToUint8Array(getEnvValue("AUTH_KEY")),
);

export async function signSessionJWT(
  payload: SessionJWTPayload,
): Promise<string> {
  const jwt: string = await new SignJWT(payload)
    .setProtectedHeader({ alg: getEnvValue("AUTH_SIGN_ALG") })
    .setIssuedAt()
    .setIssuer(getEnvValue("AUTH_ISS"))
    .setExpirationTime(getEnvValue("AUTH_EXP"))
    .setJti(randomUUID())
    .sign(AUTH_SIGN);

  return await new CompactEncrypt(encodeCallbackToUint8Array(jwt))
    .setProtectedHeader({
      alg: getEnvValue("AUTH_ENCRYPT_ALG"),
      enc: getEnvValue("AUTH_ENCRYPT_ENC"),
      typ: "JWT",
    })
    .encrypt(AUTH_KEY);
}

export async function verifySessionJWT(
  jwt: string,
): Promise<(SessionJWTPayload & JWTPayload) | null> {
  try {
    const { plaintext } = await compactDecrypt(
      encodeCallbackToUint8Array(jwt),
      AUTH_KEY,
    );

    const { payload } = await jwtVerify<SessionJWTPayload>(
      plaintext,
      AUTH_SIGN,
      {
        issuer: getEnvValue("AUTH_ISS"),
        algorithms: [getEnvValue("AUTH_SIGN_ALG")],
      },
    );

    return payload;
  } catch (error) {
    return null;
  }
}
