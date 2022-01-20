import { Contribution } from "src/types/common/server-api";

export function getContributionLink(contribution: Contribution) {
  return process.env.NODE_ENV === "production"
    ? "https://"
    : "http://" + window.location.host + `/contributions/${contribution.id}`;
}
