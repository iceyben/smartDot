import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

// Use a global variable to store the PrismaClient instance
// to prevent multiple instances in development
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Prevent crash if DATABASE_URL is missing
const prismaClientSingleton = () => {
  if (!process.env.MONGODB_URI) {
    console.warn("MONGODB_URI is missing. Prisma Client will not be initialized.");
  }
  return new PrismaClient({
    datasources: {
      db: {
        url: process.env.MONGODB_URI,
      },
    },
  });
};

export const prisma = globalForPrisma.prisma || prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;