import { useEffect, useState } from "react";
import { ContributionCard } from "src/components/ContributionCard";
import { getContributions } from "src/helpers/api";
import { Contribution } from "src/types/common/server-api";
import { ButtonClass } from "src/types/styles";

const ContributionsLimit = 500;
const ContributionsPageLimit = 100;

interface Props {
  highlightedContributionId?: number;
}

export function ContributionsPage({ highlightedContributionId }: Props) {
  const [contributions, setContributions] = useState<Contribution[]>([]);

  useEffect(async () => {
    const newContributions = await getContributions({
      contributionId: highlightedContributionId,
    });
    setContributions(newContributions);
  }, []);

  function onSeeMore() {
    // TODO:
  }

  const highlightedContribution =
    highlightedContributionId &&
    contributions.find((c) => c.id === highlightedContributionId);
  const maybeFilteredContributions = contributions.filter(
    (c) => !highlightedContributionId || c.id !== highlightedContributionId
  );

  return (
    <div className="container md:max-w-3xl mx-auto pb-20 pt-10">
      {highlightedContribution && (
        <div>
          <ContributionCard contribution={highlightedContribution} />
        </div>
      )}
      <div className="grid grid-cols-2 gap-4 w-full">
        {maybeFilteredContributions.map((contribution) => (
          <ContributionCard contribution={contribution} />
        ))}
        {contributions.length === ContributionsLimit && (
          <div style={{ alignSelf: "flex-start" }} className="seeAll">
            <button className={ButtonClass()} onClick={onSeeMore}>
              See more
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
