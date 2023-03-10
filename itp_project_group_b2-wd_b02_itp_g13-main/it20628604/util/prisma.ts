// https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices
import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();
// export const prisma =
// global.prisma ||
// new PrismaClient({
//   log: ['query'],
// });
if (process.env.NODE_ENV !== "production") global.prisma = prisma;
