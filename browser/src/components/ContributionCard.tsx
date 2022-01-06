import { Canvas } from "@react-three/fiber";
import UniverseScene from "./UniverseScene";
import { Contribution } from "src/types/common/server-api";
import dayjs from "dayjs";
import { renderBlob } from "src/helpers/blobs";
import "./ContributionCard.css";
import { Stars } from "@react-three/drei";
import {useMemo} from "react";
import {Placeholder, PromptDescriptions} from "./ContributionSection";

interface Props {
  contribution: Contribution;
}

function truncateWallet(address: string) {
  return address.slice(0, 6) + "..." + address.slice(-4);
}

export function ContributionCard({ contribution }: Props) {
  const { author, response, prompt, pattern, createdAt } = contribution;

  const date = dayjs(createdAt);

  const { walletId, twitterVerified, twitterUsername } = author;
  const authorDisplay = twitterVerified
    ? twitterUsername
    : truncateWallet(walletId);
  const dateDisplay = date.format("MMM, YYYY");

  return (
    <div className="contributionCardContainer">
      <h2 className="text-2xl font-bold">{pattern}</h2>
      <p className="">{`${PromptDescriptions[prompt].replace(`{${Placeholder}}`, pattern)} ${response}`}</p>
      <div className="blobContainer">{renderBlob(contribution)}</div>
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
