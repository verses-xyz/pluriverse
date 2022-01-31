import { Contribution } from "src/types/common/server-api";

export function getContributionLink(contribution: Contribution) {
  return (
    "https://" + window.location.host + `/contributions/${contribution.id}`
  );
}

export function getArweaveLink(transactionId: string): string {
  return `https://viewblock.io/arweave/tx/${transactionId}`;
}
