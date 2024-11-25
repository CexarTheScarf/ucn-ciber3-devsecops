import prisma from "@/lib/db";
import { obtainUser } from "../auth/sign-in";
import signIn from "../auth/sign-in";
import { compareHash } from "../../lib/crypto";

const existingUser = {
  id: "user-id-123",
  email: "hello@prisma.io",
  createdAt: new Date(),
  updatedAt: new Date(),
  name: "Manzano Malo",
  hashedPassword: "hashed-password",
};

const expectedError = {
  success: false,
  data: null,
  errorVariables: ["email", "password"],
  message: "Credenciales inválidas",
};

describe("Pruebas con prisma mockeado", () => {
  it("Debería llamar a user.findMany", async () => {
    // Configurar el mock para que devuelva datos simulados
    (prisma.user.findMany as jest.Mock).mockResolvedValue([
      { id: 1, name: "Usuario 1" },
      { id: 2, name: "Usuario 2" },
    ]);

    const users = await prisma.user.findMany();

    expect(users).toEqual([
      { id: 1, name: "Usuario 1" },
      { id: 2, name: "Usuario 2" },
    ]);

    expect(prisma.user.findMany).toHaveBeenCalledTimes(1);
  });

  it("Debería retornar usuario mockeado", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(existingUser);
    const result = await obtainUser("hello@prisma.io");
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { email: "hello@prisma.io" },
    });
  });

  it("Debería retornar error, ususario no encontrado", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    const result = await signIn({
      email: "invalid@prisma.io",
      password: "*NotPassword123",
    });

    expect(result).toEqual(expectedError);
  });

  it("Debería retornar error, contraseña incorrecta", async () => {
    jest.mock("@/lib/crypto", () => ({
      compareHash: jest.fn(() => false), // Simula que la contraseña es correcta
    }));

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(existingUser);
    //Email y password dan igual, debido a que findUnique retornará existingUser
    const result = await signIn({
      email: "a",
      password: "b",
    });
    expect(result).toEqual(expectedError);
  });
});
