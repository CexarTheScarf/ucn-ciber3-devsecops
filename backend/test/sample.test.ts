import SignIn from "@/backend/auth/sign-in";
import { prismaMock } from "@/__mocks__/prismaMock";
import prisma from "@/lib/db";
console.log("Prisma en test:", prisma); //Mockeo funciona correctamente, prisma importado de db es del tipo mock

type SignInProps = {
  email: string;
  password: string;
};

test("mock de prisma debería ser llamado", () => {
  expect(prisma).toBeDefined();
});

test("Test de findUnique mockeado", async () => {
  const mockUser = {
    id: "user-id-123",
    email: "test@example.com",
    createdAt: new Date(),
    updatedAt: new Date(),
    name: "Test User",
    hashedPassword: "hashed-password",
  };

  // Aquí `prismaMock` es el mock de PrismaClient
  prismaMock.user.findUnique.mockResolvedValue(mockUser);

  // Llamada simulada para probar
  const result = await prisma.user.findUnique({
    where: { email: "test@example.com" },
  });
  //Al realizar esta llamada, en vez de buscar en la base de datos, se retornará el mockResolvedValue
  console.log(result);

  // Verifica que findUnique fue llamado correctamente
  expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
    where: { email: "test@example.com" },
  });

  expect(result).toBe(mockUser);

  // Asegúrate de que el resultado es el que esperas
  expect(result).toEqual({
    id: "user-id-123",
    email: "test@example.com",
    name: "Test User",
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date),
    hashedPassword: "hashed-password",
  });
});

describe("SignIn Operation", () => {
  it("debe retornar un usuario cuando las credenciales son correctas", async () => {
    prismaMock.user.findUnique.mockResolvedValue({
      id: "user-id-123",
      email: "test@example.com",
      createdAt: new Date(),
      updatedAt: new Date(),
      name: "Manzano Malo",
      hashedPassword: "hashed-password",
    });

    const ThrowHTTPException = jest.fn();

    const data: SignInProps = {
      email: "test@example.com",
      password: "password123",
    };
    // Mock de compareHash si es necesario
    /*
    jest.mock("@/lib/crypto", () => ({
      compareHash: jest.fn(() => true), // Simula que la contraseña es correcta
    }));
    */

    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
      where: { email: "test@example.com" },
    });
  });

  /*
  it("debe lanzar un error cuando el usuario no existe", async () => {
    // Mock para simular que no se encuentra el usuario
    prismaMock.user.findUnique.mockResolvedValue(null);

    const data: SignInProps = {
      email: "test@example.com",
      password: "password123",
    };

    const ThrowHTTPException = jest.fn();
    await SignIn(data);

    expect(ThrowHTTPException).toHaveBeenCalledWith("Credenciales inválidas", [
      "email",
      "password",
    ]);
  });
  */
});

/*
jest.mock("@/lib/crypto", () => ({
  compareHash: jest.fn(() => true),
}));



type SignInProps = {
  email: string;
  password: string;
};

test("should sign in existing user", async () => {
  const data: SignInProps = {
    email: "hello@prisma.io",
    password: "*EvManzano123",
  };

  const existingUser = {
    id: "user-id-123",
    email: "hello@prisma.io",
    createdAt: new Date(),
    updatedAt: new Date(),
    name: "Manzano Malo",
    hashedPassword: "hashed-password",
  };

  prismaMock.user.findUnique.mockResolvedValue(existingUser);

  console.log("Mock configurado:", prismaMock.user.findUnique.mock.calls);

  await expect(SignIn(data)).resolves.not.toThrow();

  expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
    where: { email: "hello@prisma.io" },
  });
});
*/
