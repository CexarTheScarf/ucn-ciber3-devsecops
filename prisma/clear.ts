import "server-cli-only";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main(schemaName: string) {
  await prisma.$executeRaw`DROP SCHEMA ${schemaName} CASCADE;`;
  await prisma.$executeRaw`CREATE SCHEMA ${schemaName};`;
}

main("public")
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
