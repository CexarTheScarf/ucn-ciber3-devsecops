"use server";
import operation from "@/backend/auth/register";
import { ServerActionFactory } from "@/lib/server-utils";
import { formParser, defaultValues } from "./schema";

export default ServerActionFactory({
  formParser,
  defaultValues,
  serverActionData: {
    validationPipe: { defaultMessage: "Error al registrarse" },
    backendPipe: { operation },
  },
});
