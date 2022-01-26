import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ContributionCard,
  getFullContributionResponse,
} from "src/components/ContributionCard";
import {
  getDisplayForAuthor,
  getMinuteTimeOfDayDateDisplay,
  getTextDisplayForAuthor,
} from "src/components/SignatureContent";
import { getContributions } from "src/helpers/api";
import { Contribution } from "src/types/common/server-api";
import { ButtonClass } from "src/types/styles";
import { Helmet } from "react-helmet";

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

  function getMetaTagsForHighlightedContribution(contribution: Contribution) {
    const fullResponse = getFullContributionResponse(contribution);
    const { author } = contribution;
    const authorDisplay = getTextDisplayForAuthor(author, true);

    const maybeTwitterCreatorTag =
      author.twitterVerified && author.twitterUsername ? (
        <meta
          name="twitter:creator"
          content={`@${contribution.author.twitterUsername}`}
        />
      ) : null;

    const title = `Contribution to the Digital Pluriverse by ${authorDisplay}`;
    return (
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={fullResponse} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={fullResponse} />
        {/* TODO: make PNG of the blob? <meta property="og:image" content="%PUBLIC_URL%/logo192.png" /> */}

        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={fullResponse} />
        {maybeTwitterCreatorTag}
      </Helmet>
    );
  }

  return (
    <>
      <div className="container md:max-w-3xl mx-auto pb-10">
        <div className="mb-10">
          <h2 className="font-title text-3xl pt-16 font-bold pb-3">
            Contributions to the Pluriverse
          </h2>
          <p>
            We have collected contributions to the pluriverse from individuals
            and collectives of cyberspace who have signed onto this document.
            These contributions represent the plurality of the web and how all
            of our meanings are inherently valuable.
          </p>
          <p>
            Make your <Link to="#contribute">own contribution</Link>.
          </p>
          {/* TODO: maybe put patterns here? */}
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
            {getMetaTagsForHighlightedContribution(highlightedContribution)}
          </div>
        )}
      </div>
      <div className="grid 3xl:grid-cols-5 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-8 px-40 justify-center mx-auto max-w-max pb-20">
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
    </>
  );
}
