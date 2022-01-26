import { PrismaClient } from "@prisma/client";
import { ArweaveClient } from "ar-wrapper";
export interface Services {
  prisma: PrismaClient;
  arweave: ArweaveClient;
}

export enum DocType {
  Essay = "essay",
  Signature = "signature",
}

export interface ArweaveSignatureTags {
  docType: DocType;
  essayRef: string;
  name: string;
  twitterUsername: string;
  twitterVerified: boolean;
  signature: string;
  walletId: string;
}
