import "server-cli-only";
import { Prisma } from "@prisma/client";
import { createHash } from "@/lib/crypto";

export const cesar: Prisma.UserUpsertArgs = {
  where: { id: "cm0k4bx0g000109l2d1bx3xzw" },
  update: {},
  create: {
    id: "cm0k4bx0g000109l2d1bx3xzw",
    email: "cesar.munoz@alumnos.ucn.cl",
    hashedPassword: createHash("Contraseña123."),
    name: "César Muñoz",
  },
};

export const jose: Prisma.UserUpsertArgs = {
  where: { id: "cm0k4bx0g000109l2d1bx3xzy" },
  update: {},
  create: {
    id: "cm0k4bx0g000109l2d1bx3xzy",
    email: "jose.carrillo@alumnos.ucn.cl",
    hashedPassword: createHash("Contraseña123."),
    name: "José Carrillo",
  },
};

export const manzano: Prisma.UserUpsertArgs = {
  where: { id: "cm0k4bx0g000109l2d1bx3xzz" },
  update: {},
  create: {
    id: "cm0k4bx0g000109l2d1bx3xzz",
    email: "carlos.manzano@ucn.cl",
    hashedPassword: createHash("Contraseña123."),
    name: "Carlos Manzano",
  },
};
