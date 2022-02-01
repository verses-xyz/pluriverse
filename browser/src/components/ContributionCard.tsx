<<<<<<< HEAD
import {
  Contribution,
  PatternToDisplay,
  Prompt,
} from "src/types/common/server-api";
=======
import { ClientContribution, PatternToDisplay } from "src/types/common/server-api";
>>>>>>> 3f698bd... WIP markdown support
import dayjs from "dayjs";
import { BlobSingle } from "src/components/BlobSingle";
import "./ContributionCard.css";
import {
  Placeholder,
  PromptDescriptions,
  replaceAllJSX,
  replaceJSX,
} from "./ContributionSection";
import { getPatternPlaceholder } from "src/types";
import { getDisplayForAuthor } from "./SignatureContent";
import BlobSingleScissorWindow from "./BlobSingleScissorWindow";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei/core/OrbitControls";
import { MdLink } from "react-icons/md";
import { getContributionLink } from "src/helpers/contributions";
import { Suspense, useContext } from "react";
import { ModalContext } from "src/helpers/contexts/ModalContext";
import { LoadingIndicator } from "./core/LoadingIndicator";

import parse from 'html-react-parser';
import sanitizeHtml from "sanitize-html";
import ContributionsCarousel from "./ContributionsCarousel";

interface Props {
  contribution: ClientContribution;
  hideHeader?: boolean;
  isCompact?: boolean;
  className?: string;
  renderCanvas?: boolean;
  full?: boolean;
}

export function getFullContributionResponse({
  response,
  prompt,
  pattern,
}: ClientContribution) {
  return (
    PromptDescriptions[prompt].replace(
      `{${Placeholder}}`,
      getPatternPlaceholder(pattern, prompt)
    ) +
    " " +
    response
  );
}

export function getContributionCardResponse({
  response,
  prompt,
  pattern,
}: Contribution) {
  if (!response) {
    return response;
  }

  switch (prompt) {
    case Prompt.LooksLike:
    case Prompt.WeNeed:
    case Prompt.Example:
      return (
        <>
          {replaceJSX(PromptDescriptions[prompt], {
            [Placeholder]: <b>{getPatternPlaceholder(pattern, prompt)}</b>,
          })}{" "}
          {response}
        </>
      );
    // TODO: this doesn't replace with the right case from before.
    case Prompt.FreeForm:
      return replaceAllJSX(
        response,
        PatternToDisplay[pattern],
        <b>{PatternToDisplay[pattern]}</b>,
        { ignoreCase: true, includePlaceholder: false }
      );
  }
}

export function ContributionCard({
  contribution,
  hideHeader = true,
  isCompact = false,
  className = "",
  renderCanvas,
  full,
}: Props) {
  const { author, response, responseHtml, prompt, pattern, createdAt, id } = contribution;

  const authorDisplay = getDisplayForAuthor(author, true);
  const date = dayjs(createdAt, { utc: true });
  const dateDisplay = date.format("MMM, YYYY");
  const contributionLink = getContributionLink(contribution);
  const { openContributionModal, openContributionId } =
    useContext(ModalContext);


  const renderHtml = (resp: string): string | JSX.Element | JSX.Element[] => {
    // Remove first p tag to prevent first text going to next line, sanitize html string
    // and then convert to JSX element
    return parse(
      sanitizeHtml(
        resp.replace(
          /<p[^>]*>|<\/p[^>]*>/,
          ""
        )
      )
    )
  };

  const input = renderHtml(
    responseHtml || response
  );

  return (
    <div
      className={
        (isCompact
          ? "compactContributionCardContainer"
          : "contributionCardContainer") +
        " " +
        className +
        " " +
        (full ? "full" : "") +
        " " +
        (contribution && openContributionId === contribution.id
          ? "selectedBorder"
          : "")
      }
      onClick={() => (id ? openContributionModal(contribution) : null)}
    >
      <div className="flex">
        {!hideHeader && (
          <h2 className="text-2xl font-bold">{PatternToDisplay[pattern]}</h2>
        )}
        {/* <button
                  className="mr-auto"
                  onClick={() => openContributionModal(contribution)}
                >
                  <FiMaximize2 />
                </button> */}
      </div>
      <div className={`responseContainerContributionCard`}>
        <p className="response">{getContributionCardResponse(contribution)}</p>
      </div>
      <div className="mt-auto">
        {!isCompact && <hr className="mt-2" />}
        <div
          className={isCompact ? "blobSingleContainer" : "blobContainer"}
          onClick={(e) => e.stopPropagation()}
        >
          {!id || renderCanvas ? (
            // TODO: add all the things needed
            <Suspense fallback={<LoadingIndicator />}>
              <Canvas
                frameloop="demand"
                camera={{ position: [0, 0, 20], fov: 50 }}
                style={{ cursor: "pointer" }}
              >
                <OrbitControls
                  autoRotate={true}
                  autoRotateSpeed={5}
                  enableZoom={false}
                />
                <BlobSingle
                  pattern={pattern}
                  prompt={prompt}
                  walletId={author.walletId}
                  response={response}
                />
                {/* <BlobsPostProcessing /> */}
              </Canvas>
            </Suspense>
          ) : (
            <BlobSingleScissorWindow id={id} />
          )}
        </div>
        <div className="attribution">
          {id && (
            <>
              {full && (
                <a className="mr-3" href={contributionLink}>
                  <MdLink />
                </a>
              )}
            </>
          )}
          <p className="ml-auto text-base inline">
            by <em className="author text-color-purple-200">{authorDisplay}</em>{" "}
            on <em>{dateDisplay}</em>
          </p>
        </div>
      </div>
    </div>
  );
}
