// import type { Prompt, Pattern } from "@prisma/client";

// TODO: need to handle mapping the type to an actual typescript enum...
// see https://github.com/prisma/prisma1/issues/3429
// export this to share types using typescript path loading
// https://stackoverflow.com/questions/65045106/share-types-between-client-and-server/65046066#65046066
// export { Prompt, Pattern };

// TODO: these two enums can come from @server-api/types now, issue with
// generated type enums from prisma not being actual typescript enums... need to add type workaround
// https://github.com/prisma/prisma1/issues/3429

// TODO: IF YOU CHANGE ANYTHING HERE PLEASE COPY IT INTO `server/common/server-api/index.ts`
export enum Prompt {
  LooksLike = "LooksLike",
  WeNeed = "WeNeed",
  Example = "Example",
  FreeForm = "FreeForm",
}
export enum Pattern {
  Pluriverse = "Pluriverse",
  Interoperability = "Interoperability",
  Agency = "Agency",
  Regeneration = "Regeneration",
  Privacy = "Privacy",
  Voice = "Voice",
  EngagementAndAttention = "EngagementAndAttention",
  Commons = "Commons",
  MaintenanceAndCare = "MaintenanceAndCare",
}

export const PatternToDisplay: Record<Pattern, string> = {
  [Pattern.Pluriverse]: "Pluriverse",
  [Pattern.Interoperability]: "Interoperability",
  [Pattern.Agency]: "Agency",
  [Pattern.Regeneration]: "Regeneration",
  [Pattern.Privacy]: "Privacy",
  [Pattern.Voice]: "Voice",
  [Pattern.EngagementAndAttention]: "Engagement and Attention",
  [Pattern.Commons]: "Commons",
  [Pattern.MaintenanceAndCare]: "Maintenance and Care",
};

export interface Author {
  walletId: string;
  twitterVerified: boolean;
  signature: string;
  name?: string;
  twitterUsername?: string;
  createdAt: Date;
  disagrees: boolean;
}

export interface Contribution {
  id: number;
  author: Author;
  // This should be the full text response, formatted as markdown.
  response: string;
  prompt: Prompt;
  pattern: Pattern;
  createdAt: Date;
}

export interface AddContributionRequest {
  walletId: string;
  // This should be the full text response, formatted as markdown.
  response: string;
  prompt: Prompt;
  pattern: Pattern;
}

export type AddContributionResponse = number;

export interface AddUserRequest {
  walletId: string;
  signature: string;
  name?: string;
  twitterUsername?: string;
  essayTransactionId: string;
  disagrees: boolean;
}

export type AddUserResponse = Author;

export interface GetUserRequest {
  id: string;
}

export interface GetUsersRequest {
  offset?: number;
}

export interface GetContributionsRequest {
  offset?: number;
  contributionId?: number;
}

export interface GetContributionRequest {
  id: number;
}

export interface VerifyTwitterRequest {
  walletId: string;
  twitterUsername: string;
  signature: string;
}

export interface GetStatsResponse {
  authorsTotal: number;
  contributionsTotal: number;
}

export const TweetTemplate =
  "verifying for @verses_xyz — to a pluriverse, a world where many worlds may fit\n\nhttps://pluriverse.world\n\nsig:";

export const ArweaveEssayDocumentName = "PluriverseEssay";
export const ContributionLimit = 500;
export const SignatureLimit = 500;
