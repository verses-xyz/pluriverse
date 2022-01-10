import { Contribution } from "src/types/common/server-api";
import dayjs from "dayjs";
import { BlobSingle } from "src/components/BlobSingle";
import "./CompactContributionCard.css";
import { Placeholder, PromptDescriptions } from "./ContributionSection";

interface Props {
  contribution: Contribution;
}

function truncateWallet(address: string) {
  return address.slice(0, 6) + "..." + address.slice(-4);
}

export function CompactContributionCard({ contribution }: Props) {
  const { author, response, prompt, pattern, createdAt } = contribution;

  const date = dayjs(createdAt);

  const { walletId, twitterVerified, twitterUsername } = author;
  const authorDisplay = twitterVerified
    ? twitterUsername
    : truncateWallet(walletId);
  const dateDisplay = date.format("MMM, YYYY");

  return (
    <div className="contributionCardContainer">
      <p className="pt-3">{`${PromptDescriptions[prompt].replace(
        `{${Placeholder}}`,
        pattern
      )} ${response}`}</p>
      {/* <div className="blobContainer">
        <BlobSingle
          pattern={contribution.pattern}
          prompt={contribution.prompt}
          walletId={contribution.author.walletId}
          response={contribution.response}
        />
      </div> */}
      <div className="attribution">
        <p className=" text-base">
          created by{" "}
          <em className="author text-color-purple-200">{authorDisplay}</em> on{" "}
          <em>{dateDisplay}</em>
        </p>
      </div>
      {/* </Canvas> */}
    </div>
  );
}
