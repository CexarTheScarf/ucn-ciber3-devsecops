import "server-cli-only";
import prisma from "@/lib/db";
import { ParamlessServerOperationFactory } from "@/lib/server-utils";

type GetUserReponse = {
  id: string;
  email: string;
  password: string;
  name: string;
};

export default ParamlessServerOperationFactory<GetUserReponse>(
  async ({ SuccessHTTPAnswer, ThrowHTTPException, UseAuth }) => {
    const { id } = await UseAuth();

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return ThrowHTTPException("El usuario no fue encontrado.", []);

    return SuccessHTTPAnswer("Usuario encontrado", {
      email: user.email,
      password: user.hashedPassword,
      name: user.name,
      id: user.id,
    });
  },
);
