import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;


{
  "id": "4d79b91f-a6c4-4aa4-b59b-623aa5fd9c52",
  "name": "Push Day",
  "slug": "push-day",

};