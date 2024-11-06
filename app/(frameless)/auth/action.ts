"use server";
import operation from "@/backend/auth/sign-in";
import { ServerActionFactory } from "@/lib/server-utils";
import { formParser, defaultValues } from "./schema";

export default ServerActionFactory({
  formParser,
  defaultValues,
  serverActionData: {
    validationPipe: { defaultMessage: "Error al iniciar sesión" },
    backendPipe: { operation },
  },
});
