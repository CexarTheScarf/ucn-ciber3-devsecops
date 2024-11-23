import "server-cli-only";
import prisma from "@/lib/db";
import { GetAuthCallack, ServerOperationFactory } from "@/lib/server-utils";
import { SetAuthCookie } from "@/lib/cookies";
import { compareHash } from "@/lib/crypto";
import { redirect } from "next/navigation";

type SignInProps = {
  email: string;
  password: string;
};

export default ServerOperationFactory<SignInProps>(
  async ({ data: { email, password }, ThrowHTTPException }) => {
    console.log("Searching for user", email);
    let user;

    user = await prisma.user.findUnique({ where: { email } });

    console.log("User found:", user);

    if (!user)
      return ThrowHTTPException("Credenciales inválidas", [
        "email",
        "password",
      ]);

    console.log("despues user");

    if (!compareHash(password, user.hashedPassword))
      return ThrowHTTPException("Credenciales inválidas", [
        "email",
        "password",
      ]);

    const cookieSuccess = await SetAuthCookie({
      email: user.email,
      id: user.id,
    });

    if (!cookieSuccess)
      return ThrowHTTPException("Ha ocurrido un error interno", []);

    redirect(GetAuthCallack());
  },
);

export async function obtainUser(email: string) {
  return await prisma.user.findUnique({ where: { email } });
}
