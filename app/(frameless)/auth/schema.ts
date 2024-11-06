import { z } from "zod";

export const formParser = z
  .object({
    email: z
      .string({ message: "Debes introducir tu correo electrónico." })
      .email({ message: "El correo electrónico no es válido." }),

    password: z
      .string({ message: "Requerido." })
      .min(1, { message: "Debes introducir tu contraseña." }),
  })
  .strict();

export const defaultValues: z.infer<typeof formParser> = {
  email: "",
  password: "",
};
