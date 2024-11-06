import "server-cli-only";
import { cookies } from "next/headers";
import { getEnvValue } from "@/lib/env";
import { signSessionJWT, verifySessionJWT } from "@/lib/jwt";
import { SessionJWTPayload, sessionJWTPayloadSchema } from "@/lib/schemas";

export async function SetAuthCookie(
  jwtPayload: SessionJWTPayload,
): Promise<boolean> {
  const { success, data } = sessionJWTPayloadSchema.safeParse(jwtPayload);
  if (!success) return false;

  const jwt = await signSessionJWT(data);
  const tokenData = await verifySessionJWT(jwt);

  cookies().set(getEnvValue("AUTH_COOKIE_NAME"), jwt, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: (tokenData?.exp ?? 0) * 1000,
  });

  return true;
}

export async function RemoveAuthCookie(): Promise<void> {
  cookies().set(getEnvValue("AUTH_COOKIE_NAME"), "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
  });
}

export async function GetVerifiedAuthCookie(): Promise<SessionJWTPayload | null> {
  const cookie = cookies().get(getEnvValue("AUTH_COOKIE_NAME"));
  if (!cookie) return null;

  const jwtPayload = await verifySessionJWT(cookie.value);
  if (!jwtPayload) await RemoveAuthCookie(); // Expired nor invalid JWT

  return jwtPayload;
}

export async function GetSessionJWT(): Promise<string | null> {
  const cookie = cookies().get(getEnvValue("AUTH_COOKIE_NAME"));
  if (!cookie) return null;

  return cookie.value;
}
