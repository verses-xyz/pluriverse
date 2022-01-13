import { Contribution } from "src/types/common/server-api";
import getMockContributions from "src/utils/getMockContributions";
import CompactContributionCard from "./CompactContributionCard";

export default function ContributionsCarousel({
  contributions,
}: {
  contributions: Contribution[];
}) {
  const mockcontributions = getMockContributions();
  return (
    <div style={{ position: "relative" }}>
      <div
        className="flex flex-row"
        style={{ overflowX: "auto", width: "100%" }}
      >
        {mockcontributions.map((contribution) => (
          <div className="pr-4">
            <CompactContributionCard
              key={contribution.id}
              contribution={contribution}
              hideHeader
            />
          </div>
        ))}
      </div>
      <div
        style={{
          top: 0,
          right: 0,
          position: "absolute",
          height: "100%",
          width: "100px",
          zIndex: 100000,
          backgroundImage: `linear-gradient(to right, rgba(255,0,0,0), rgb(32 32 44)  100%`,
        }}
      />
    </div>
  );
}
