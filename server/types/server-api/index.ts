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

export { Prompt, Pattern };
