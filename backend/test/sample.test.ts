import SignIn from "@/backend/auth/sign-in";
import { prismaMock } from "@/__mocks__/prismaMock";

type SignInProps = {
  email: string;
  password: string;
};

test("should create new user", async () => {
  const data: SignInProps = {
    email: "hello@prisma.io",
    password: "*EvManzano123",
  };

  // Objeto esperado por prismaMock.user.create
  const createdUser = {
    id: "user-id-123",
    email: "hello@prisma.io",
    createdAt: new Date(),
    updatedAt: new Date(),
    name: "Rich",
    hashedPassword: "hashed-password",
  };

  // Mock para devolver el objeto completo
  prismaMock.user.create.mockResolvedValue(createdUser);

  await expect(SignIn(data)).resolves.not.toThrow();

  // Verifica que la función fue llamada correctamente
  expect(prismaMock.user.create).toHaveBeenCalledWith({
    data: {
      name: "Rich", // Aquí debes incluir los valores necesarios según tu lógica
      email: "hello@prisma.io",
      hashedPassword: expect.any(String), // El hash generado
    },
  });
});
