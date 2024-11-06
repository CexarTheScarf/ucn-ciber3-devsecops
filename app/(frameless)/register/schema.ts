import { z } from "zod";

// ========== REGEX ==========
const NAME_REGEX =
  /^([a-zA-Z\xC0-\uFFFF]+([ \-']{0,1}[a-zA-Z\xC0-\uFFFF]+)*[.]{0,1}){1,2}$/;
const uppercaseRegex = /[A-ZÁÉÍÓÚÜÀÈÌÒÙÂÊÎÔÛÃÕÇ]/;
const lowercaseRegex = /[a-záéíóúüàèìòùâêîôûãõç]/;
const numberRegex = /[0-9]/;
const symbolRegex = /[!?@#$%^&*.,_-]/;

// ========== FORM SCHEMA  ==========
export const formParser = z
  .object({
    name: z
      .string({ message: "Nombre inválido" })
      .min(2, { message: "El nombre es demasiado corto" })
      .max(35, { message: "El nombre es demasiado largo" })
      .regex(NAME_REGEX, { message: "El nombre es inválido" }),

    email: z
      .string({ message: "El correo electrónico no es válido" })
      .email({ message: "El correo electrónico no es válido" }),

    password: z
      .string({ message: "Contraseña inválida" })
      .min(8, { message: "La contraseña es demasiado corta" })
      .max(35, { message: "La contraseña es demasiado larga" })
      .regex(uppercaseRegex, {
        message: "La contraseña debe contener una mayúscula",
      })
      .regex(lowercaseRegex, {
        message: "La contraseña debe contener una minúscula",
      })
      .regex(numberRegex, { message: "La contraseña debe contener un número" })
      .regex(symbolRegex, {
        message: "La contraseña debe contener un símbolo: (!?@#$%^&*.,_-)",
      }),

    passwordConfirmation: z
      .string({ message: "Contraseña inválida" })
      .min(1, { message: "Contraseña inválida" }),
  })
  .strict()
  .refine(
    ({ password, passwordConfirmation }) => password === passwordConfirmation,
    {
      message: "Las contraseñas no coinciden",
      path: ["passwordConfirmation"],
    },
  );

// ========== DEFAULT VALUES ==========
export const defaultValues: z.infer<typeof formParser> = {
  name: "",
  email: "",
  password: "",
  passwordConfirmation: "",
};
