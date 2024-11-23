import prisma from "@/lib/db";
import { obtainUser } from "../auth/sign-in";
import signIn from "../auth/sign-in";

describe("Pruebas con prisma mockeado", () => {
  it("Debería llamar a user.findMany", async () => {
    // Configurar el mock para que devuelva datos simulados
    (prisma.user.findMany as jest.Mock).mockResolvedValue([
      { id: 1, name: "Usuario 1" },
      { id: 2, name: "Usuario 2" },
    ]);

    // Llamar al método
    const users = await prisma.user.findMany();

    // Verificar el resultado
    expect(users).toEqual([
      { id: 1, name: "Usuario 1" },
      { id: 2, name: "Usuario 2" },
    ]);

    // Verificar que el método fue llamado
    expect(prisma.user.findMany).toHaveBeenCalledTimes(1);
  });

  it("Debería retornar usuario mockeado", async () => {
    // Configurar el mock para que devuelva datos simulados
    const existingUser = {
      id: "user-id-123",
      email: "hello@prisma.io",
      createdAt: new Date(),
      updatedAt: new Date(),
      name: "Manzano Malo",
      hashedPassword: "hashed-password",
    };

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(existingUser);
    const result = await obtainUser("hello@prisma.io");
    console.log(result);
  });

  it("Debería retornar error", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    const expectedError = {
      success: false,
      data: null,
      errorVariables: ["email", "password"],
      message: "Credenciales inválidas",
    };

    // Llama a signIn y verifica la respuesta
    const result = await signIn({
      email: "invalid@prisma.io",
      password: "*NotPassword123",
    });

    // Verifica que la respuesta sea igual al error esperado
    expect(result).toEqual(expectedError);
  });
});
