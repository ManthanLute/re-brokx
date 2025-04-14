import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";
config(); // Load environment variables

console.log("DATABASE_URL:", process.env.DATABASE_URL); // Debugging

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.users.findMany();
  console.log(users);
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
