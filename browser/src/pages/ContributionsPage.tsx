import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
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
import { Contribution } from "src/types/common/server-api";
import { ButtonClass } from "src/types/styles";
import { Helmet } from "react-helmet";
import { ContributionsContext } from "src/helpers/contexts/ContributionsContext";
import { ContributeButton } from "../components/Navbar";
import { ModalContext } from "src/helpers/contexts/ModalContext";

const ContributionsLimit = 500;
const ContributionsPageLimit = 50;
const RandomFloor = 100;

function safeGet<T, V>(map: Map<T, V>, key: T, defaultValue: V): V {
  return map.has(key) ? (map.get(key) as V) : defaultValue;
}

export function ContributionsPage() {
  const { contributionId } = useParams();
  const highlightedContributionId = contributionId
    ? Number(contributionId)
    : undefined;
  const { contributions } = useContext(ContributionsContext);
  const [contributionRandomOrderMapping, setContributionRandomOrderMapping] =
    useState<Map<number, number>>(new Map());

  const { openContributionModal, closeContributionModal } =
    useContext(ModalContext);

  const [numContributionsToRender, setNumContributionsToRender] = useState(
    ContributionsPageLimit
  );

  function onSeeMore() {
    const newNumContributionsToRender =
      numContributionsToRender + ContributionsPageLimit;
    if (newNumContributionsToRender > ContributionsLimit) {
      // TODO: fetch more from remote
      // fetchContributions(ContributionsLimit);
    }
    setNumContributionsToRender(
      Math.min(newNumContributionsToRender, contributions.length)
    );
  }

  // TODO: if highlightedContribution, then open the contribution modal with it
  const highlightedContribution =
    highlightedContributionId &&
    contributions.find((c) => c.id === highlightedContributionId);

  useEffect(() => {
    if (!highlightedContribution) {
      return;
    }

    openContributionModal(highlightedContribution, "/contributions");

    return () => closeContributionModal();
  }, [highlightedContribution]);

  const maybeFilteredContributions = contributions.filter(
    (c) => !highlightedContributionId || c.id !== highlightedContributionId
  );
  const sortedContributions = !contributionRandomOrderMapping.size
    ? maybeFilteredContributions
    : maybeFilteredContributions.sort(
        (a, b) =>
          safeGet(contributionRandomOrderMapping, a.id, 0.5 * RandomFloor) -
          safeGet(contributionRandomOrderMapping, b.id, 0.5 * RandomFloor)
      );

  const contributionsToShow = sortedContributions.slice(
    0,
    numContributionsToRender
  );

  function getMetaTags() {
    const title = "Contributions to the Digital Pluriverse";
    const description = "Contributions from the community to the pluriverse.";
    return (
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Helmet>
    );
  }

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

  function shuffleContributions() {
    const newMapping = new Map();
    for (const contribution of contributions) {
      newMapping.set(contribution.id, Math.random() * RandomFloor);
    }
    setContributionRandomOrderMapping(newMapping);
  }

  return (
    <div className="px-8 pb-20">
      {highlightedContribution
        ? getMetaTagsForHighlightedContribution(highlightedContribution)
        : getMetaTags()}
      <div className="container md:max-w-3xl mx-auto pb-10">
        <div className="mb-10">
          <h2 className="font-title text-3xl pt-16 font-bold pb-3">
            Contributions to "A Pattern Language for the Pluriverse"
          </h2>
          <p>
            Contributions to this pattern language were given by various
            individuals and organizations that have gathered around this
            artifact. These seed set of contributions represent the plurality of
            the web.
          </p>
          <p>
            We welcome contributions of all kinds, but offer suggestions as to
            the types of contributions we think would be{" "}
            <a href="https://pluriverse.world/about">especially meaningful</a>.
          </p>
          {/* TODO: maybe put patterns here? */}
        </div>
        <div className="text-center">
          {/* TODO: add fun animation on click, maybe make all the cards bounce */}
          <div className="mt-8">
            <button
              className={`${ButtonClass()}`}
              onClick={shuffleContributions}
            >
              Shuffle contributions
            </button>
          </div>
        </div>
      </div>
      <div className="grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 sm:grid-cols-1 justify-center mx-auto max-w-max gap-6">
        {contributionsToShow.map((contribution) => (
          <ContributionCard contribution={contribution} key={contribution.id} />
        ))}
      </div>
      {numContributionsToRender < contributions.length && (
        <div style={{ textAlign: "center" }} className="seeAll pt-8">
          <button className={ButtonClass()} onClick={onSeeMore}>
            See more
          </button>
        </div>
      )}
      {/* TODO: add floating button to scroll back to top? */}
    </div>
  );
}
