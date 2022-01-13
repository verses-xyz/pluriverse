import { Contribution, PatternToDisplay } from "src/types/common/server-api";
import dayjs from "dayjs";
import { BlobSingle } from "src/components/BlobSingle";
import "./CompactContributionCard.css";
import {
  Placeholder,
  PromptDescriptions,
  replaceJSX,
} from "./ContributionSection";
import { getPatternPlaceholder } from "src/types";

interface Props {
  contribution: Contribution;
  hideHeader?: boolean;
}

// TODO: this is a fork from contribution card, should be refactored to pull out common logic
export function truncateWallet(address: string) {
  return address.slice(0, 6) + "..." + address.slice(-4);
}

export default function CompactContributionCard({
  contribution,
  hideHeader,
}: Props) {
  const { author, response, prompt, pattern, createdAt } = contribution;

  const date = dayjs(createdAt);

  const { walletId, name, twitterVerified, twitterUsername } = author;
  const authorDisplay = twitterVerified
    ? twitterUsername
    : name || truncateWallet(walletId);
  const dateDisplay = date.format("MMM, YYYY");

  return (
    <div className="contributionCardContainer">
      {!hideHeader && (
        <h2 className="text-2xl font-bold">{PatternToDisplay[pattern]}</h2>
      )}
      <p className="">
        {replaceJSX(PromptDescriptions[prompt], {
          [Placeholder]: <b>{getPatternPlaceholder(pattern, prompt)}</b>,
        })}{" "}
        {response}
      </p>
      <div>
        <BlobSingle
          pattern={pattern}
          prompt={prompt}
          walletId={author.walletId}
          response={response}
        />
      </div>
      <div className="attribution">
        <p className=" text-base">
          created by{" "}
          <em className="author text-color-purple-200">{authorDisplay}</em> on{" "}
          <em>{dateDisplay}</em>
        </p>
      </div>
    </div>
  );
}
