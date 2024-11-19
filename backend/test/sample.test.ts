import SignIn from "@/backend/auth/sign-in";
import { prismaMock } from "@/__mocks__/prismaMock";

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
