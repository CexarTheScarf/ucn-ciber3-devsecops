import "server-cli-only";
import prisma from "@/lib/db";
import { GetVerifiedAuthCookie, RemoveAuthCookie } from "@/lib/cookies";
import { Session } from "./types";

export async function GetSessionEdge(): Promise<boolean> {
  const sessionCookie = await GetVerifiedAuthCookie();
  return sessionCookie !== null;
}

export async function GetSession(): Promise<Session | null> {
  const sessionCookie = await GetVerifiedAuthCookie();
  if (!sessionCookie) return null;

  const user = await prisma.user.findUnique({
    where: { email: sessionCookie.email },
  });

  if (!user) {
    await RemoveAuthCookie();
    return null;
  }

  return {
    email: user.email,
    id: user.id,
    name: user.name,
  };
}
