import "server-cli-only";
import prisma from "@/lib/db";
import { z } from "zod";
import { redirect } from "next/navigation";
import { ServerOperationFactory } from "@/lib/server-utils";
import { SetAuthCookie } from "@/lib/cookies";
import { formParser } from "@/app/(frameless)/register/schema";
import { createHash } from "@/lib/crypto";
import { PATH_SOURCES } from "@/lib/constants";

type SignInProps = z.infer<typeof formParser>;

export default ServerOperationFactory<SignInProps>(
  async ({ data: { name, email, password }, ThrowHTTPException }) => {
    console.log(email);
    const userByEmail = await prisma.user.findUnique({ where: { email } });
    if (userByEmail)
      return ThrowHTTPException(
        "Ya existe un usuario con este correo electrónico",
        ["email"],
      );

    const createdUser = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword: createHash(password),
      },
    });

    const cookieSuccess = await SetAuthCookie({
      email: createdUser.email,
      id: createdUser.id,
    });

    if (!cookieSuccess)
      return ThrowHTTPException("Ha ocurrido un error interno", []);

    redirect(PATH_SOURCES.my);
  },
);
