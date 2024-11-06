import "server-cli-only";
import { PrismaClient } from "@prisma/client";
import { cesar, jose, manzano } from "@/prisma/entities/users.seed";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert(cesar);
  await prisma.user.upsert(jose);
  await prisma.user.upsert(manzano);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
