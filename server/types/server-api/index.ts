import type { Prompt, Pattern } from "@prisma/client";

export interface AddContributionRequest {
  walletId: string;
  // This should be the full text response, formatted as markdown.
  response: string;
  prompt: Prompt;
  pattern: Pattern;
}

export interface GetContributionsRequest {
  offset?: number;
}

// TODO: need to handle mapping the type to an actual typescript enum...
// see https://github.com/prisma/prisma1/issues/3429
// export this to share types using typescript path loading
// https://stackoverflow.com/questions/65045106/share-types-between-client-and-server/65046066#65046066
export { Prompt, Pattern };
