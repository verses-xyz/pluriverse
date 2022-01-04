import { Contribution } from "src/types/common/server-api";
import dayjs from "dayjs";
import { renderBlob } from "src/helpers/blobs";

interface Props {
  contribution: Contribution;
}

export function ContributionCard({ contribution }: Props) {
  const { author, response, prompt, pattern, createdAt } = contribution;

  const date = dayjs(createdAt);
  const blob = renderBlob(pattern, prompt);

  const { walletId, twitterVerified, twitterUsername } = author;
  const authorDisplay = twitterVerified ? twitterUsername : walletId;
  const dateDisplay = date.format("MMM, YYYY");

  return (
    <div className="contributionCardContainer">
      <h1>{pattern}</h1>
      <p>{response}</p>

      <div className="blobContainer">{blob}</div>

      <span className="attribution">
        created by {authorDisplay} on {dateDisplay}
      </span>
    </div>
  );
}
