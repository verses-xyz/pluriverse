import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ContributionCard } from "src/components/ContributionCard";
import {
  getDisplayForAuthor,
  getMinuteTimeOfDayDateDisplay,
} from "src/components/SignatureContent";
import { getContributions } from "src/helpers/api";
import { Contribution } from "src/types/common/server-api";
import { ButtonClass } from "src/types/styles";
dayjs.extend(utc);

const ContributionsLimit = 500;
const ContributionsPageLimit = 100;

export function ContributionsPage() {
  const { contributionId } = useParams();
  const highlightedContributionId = contributionId
    ? Number(contributionId)
    : undefined;
  const [contributions, setContributions] = useState<Contribution[]>([]);

  console.log(contributionId);

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
    <>
      <div className="container md:max-w-3xl mx-auto pb-20 pt-10">
        <div className="mb-20">
          <p>
            Here are all the contributions to the pluriverse from the
            individuals and collectives from cyberspace. These contributions
            represent the plurality of the web and how all of our meanings are
            inherently valuable.
          </p>
          <p>
            Make your <Link to="#contribute">own contribution</Link>.
          </p>
        </div>
        {highlightedContribution && (
          <div className="mb-10">
            <p>
              On{" "}
              {getMinuteTimeOfDayDateDisplay(
                dayjs(highlightedContribution.createdAt, { utc: true })
              )}
              , {getDisplayForAuthor(highlightedContribution.author)}{" "}
              contributed:
            </p>
            <ContributionCard
              className="selectedBorder"
              contribution={highlightedContribution}
            />
            <br />
            <h3 className="text-3xl">All other contributions</h3>
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
    </>
  );
}
