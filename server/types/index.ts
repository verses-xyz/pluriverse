import { PrismaClient } from "@prisma/client";

export interface Services {
  prisma: PrismaClient;
}
