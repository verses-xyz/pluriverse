import { Contribution, PatternToDisplay } from "src/types/common/server-api";
import dayjs from "dayjs";
import { BlobSingle } from "src/components/BlobSingle";
import "./ContributionCard.css";
import {
  Placeholder,
  PromptDescriptions,
  replaceJSX,
} from "./ContributionSection";
import { getPatternPlaceholder } from "src/types";
import { getDisplayForAuthor } from "./SignatureContent";
import BlobSingleScissorWindow from "./BlobSingleScissorWindow";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei/core/OrbitControls";

interface Props {
  contribution: Contribution;
  hideHeader?: boolean;
  isCompact?: boolean;
  className?: string;
}

export function getFullContributionResponse({
  response,
  prompt,
  pattern,
}: Contribution) {
  return (
    PromptDescriptions[prompt].replace(
      `{${Placeholder}}`,
      getPatternPlaceholder(pattern, prompt)
    ) +
    " " +
    response
  );
}

export function ContributionCard({
  contribution,
  hideHeader,
  isCompact = false,
  className = "",
}: Props) {
  const { author, response, prompt, pattern, createdAt, id } = contribution;

  const authorDisplay = getDisplayForAuthor(author, true);
  const date = dayjs(createdAt, { utc: true });
  const dateDisplay = date.format("MMM, YYYY");

  return (
    <div
      className={
        (isCompact
          ? "compactContributionCardContainer"
          : "contributionCardContainer") +
        " " +
        className
      }
    >
      {!hideHeader && (
        <h2 className="text-2xl font-bold">{PatternToDisplay[pattern]}</h2>
      )}
      <p className="">
        {replaceJSX(PromptDescriptions[prompt], {
          [Placeholder]: <b>{getPatternPlaceholder(pattern, prompt)}</b>,
        })}{" "}
        {response}
      </p>
      <div className={isCompact ? "blobSingleContainer" : "blobContainer"}>
        {id ? (
          <BlobSingleScissorWindow id={id} />
        ) : (
          // TODO: add all the things needed
          <Canvas camera={{ position: [0, 0, 20], fov: 50 }}>
            <OrbitControls
              autoRotate={true}
              autoRotateSpeed={1}
              enableZoom={false}
            />
            <BlobSingle
              pattern={pattern}
              prompt={prompt}
              walletId={author.walletId}
              response={response}
            />
          </Canvas>
        )}
      </div>
      <div className="attribution">
        <p className=" text-base">
          by <em className="author text-color-purple-200">{authorDisplay}</em>{" "}
          on <em>{dateDisplay}</em>
        </p>
      </div>
    </div>
  );
}
