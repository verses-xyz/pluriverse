import { Contribution } from "src/types/common/server-api";
import CompactContributionCard from "./CompactContributionCard";

export default function ContributionsCarousel({
  contributions,
}: {
  contributions: Contribution[];
}) {
  return (
    <div className="flex flex-row" style={{ overflowX: "auto", width: "100%" }}>
      {contributions.map((contribution) => (
        <div className="pr-4">
          <CompactContributionCard
            key={contribution.id}
            contribution={contribution}
            hideHeader
          />
        </div>
      ))}
    </div>
  );
}
