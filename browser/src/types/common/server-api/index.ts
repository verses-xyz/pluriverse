// TODO: this is a copy of server/common/server-api/index.ts, for now
// until i figure out how to actually make typescript path mapping compile
// https://stackoverflow.com/questions/57070052/create-react-app-typescript-3-5-path-alias
// https://stackoverflow.com/questions/68112535/add-path-alias-for-typescript

// import type { Prompt, Pattern } from "@prisma/client";

// TODO: need to handle mapping the type to an actual typescript enum...
// see https://github.com/prisma/prisma1/issues/3429
// export this to share types using typescript path loading
// https://stackoverflow.com/questions/65045106/share-types-between-client-and-server/65046066#65046066
// export { Prompt, Pattern };

// TODO: these two enums can come from @server-api/types now, issue with
// generated type enums from prisma not being actual typescript enums... need to add type workaround
// https://github.com/prisma/prisma1/issues/3429
export enum Prompt {
  LooksLike = "LooksLike",
  WeNeed = "WeNeed",
  Example = "Example",
}
export enum Pattern {
  Interoperability = "Interoperability",
  Pluriverse = "Pluriverse",
  Agency = "Agency",
  Regeneration = "Regeneration",
  Privacy = "Privacy",
  Voice = "Voice",
  EngagementAndAttention = "Engagement and Attention",
  Commons = "Commons",
}

export interface AddContributionRequest {
  walletId: string;
  // This should be the full text response, formatted as markdown.
  response: string;
  prompt: Prompt;
  pattern: Pattern;
}

export type AddContributionResponse = number;

export interface GetContributionsRequest {
  offset?: number;
}
