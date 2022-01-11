import { Contribution } from "src/types/common/server-api";
import dayjs from "dayjs";
import { BlobSingle } from "src/components/BlobSingle";
import "./ContributionCard.css";
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

function truncateWallet(address: string) {
  return address.slice(0, 6) + "..." + address.slice(-4);
}

export function ContributionCard({ contribution, hideHeader }: Props) {
  const { author, response, prompt, pattern, createdAt } = contribution;

  const date = dayjs(createdAt);

  const { walletId, twitterVerified, twitterUsername } = author;
  const authorDisplay = twitterVerified
    ? twitterUsername
    : truncateWallet(walletId);
  const dateDisplay = date.format("MMM, YYYY");

  return (
    <div className="contributionCardContainer">
      {!hideHeader && <h2 className="text-2xl font-bold">{pattern}</h2>}
      <p className="">
        {replaceJSX(PromptDescriptions[prompt], {
          [Placeholder]: <b>{getPatternPlaceholder(pattern, prompt)}</b>,
        })}{" "}
        {response}
      </p>
      <div className="blobContainer">
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
