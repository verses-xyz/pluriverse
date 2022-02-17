import { useContext, useState } from "react";
import { Author, SignatureLimit } from "src/types/common/server-api";
import dayjs from "dayjs";
import "./SignatureContent.css";
import { Checkmark } from "./core/Checkmark";
import { SignaturesContext } from "src/pages/Main";
import { ButtonClass } from "src/types/styles";

function truncateWallet(address: string) {
  return address.slice(0, 6) + "..." + address.slice(-4);
}

// function truncateName(name: string) {
//   return name.length > 15 ? name.slice(0, 12) + "..." : name;
// }

const SignaturePageSize = 50;

function getTwitterDisplay(
  { twitterVerified, twitterUsername }: Author,
  { hideUsername }: { hideUsername?: boolean } = {}
) {
  const twitterUrl =
    twitterUsername && `https://twitter.com/${twitterUsername}`;

  if (!twitterUrl) {
    return;
  }

  return (
    <button
      onClick={() => {
        window.open(twitterUrl, "_blank");
      }}
      className="twitterName flex items-center justify-center"
    >
      @{twitterUsername}{" "}
      {twitterVerified && (
        <span
          style={{ verticalAlign: "middle", position: "relative", top: "-1px" }}
        >
          <Checkmark />
        </span>
      )}
    </button>
  );
}

export function getTextDisplayForAuthor(
  { name, walletId }: Author,
  shouldTruncate?: boolean
): React.ReactNode {
  const walletAddr = shouldTruncate ? truncateWallet(walletId) : walletId;
  return name || walletAddr;
}

// TODO: get ENS?
export function getDisplayForAuthor(
  author: Author,
  shouldTruncate?: boolean,
  inline?: boolean
): React.ReactNode {
  const { twitterVerified, twitterUsername, walletId } = author;
  const nameDisplay = getTextDisplayForAuthor(author, shouldTruncate);
  const twitterUrl =
    twitterUsername &&
    twitterVerified &&
    `https://twitter.com/${twitterUsername}`;
  const etherscanUrl = `https://etherscan.io/address/${walletId}`;

  return (
    <div className={`authorWrapper ${inline ? "!inline-flex" : ""}`}>
      <span
        role="button"
        className="authorButton"
        onClick={(e) => {
          window.open(twitterUrl || etherscanUrl, "_blank");
          e.stopPropagation();
        }}
      >
        {nameDisplay}
      </span>
      {twitterUrl && (
        <span
          className="ml-1"
          style={{
            verticalAlign: "middle",
            top: "-3px",
            position: "relative",
          }}
        >
          <Checkmark />
        </span>
      )}
    </div>
  );
}

export function getMinuteTimeOfDayDateDisplay(date: dayjs.Dayjs): string {
  const localHour = date.local().hour();
  return date.format(
    `MMM D, YYYY [on minute] m ${
      localHour >= 6 && localHour < 18 ? "[in the day] ☀️" : "[in the night] 🌙"
    }`
  );
}

export function Signature({ author }: { author: Author }) {
  const { createdAt, name, walletId } = author;
  const nameDisplay = name || walletId;
  const date = dayjs(createdAt, { utc: true });
  const dateDisplay = getMinuteTimeOfDayDateDisplay(date);

  // TODO: add location

  return (
    <div
      className="py-4"
      style={{ borderBottom: "1px solid var(--outline-default)" }}
    >
      <div className="signature flex flex-col items-center sm:items-start justify-center sm:justify-start md:px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between w-full">
          <b className="signatureName text-xl">{nameDisplay}</b>
          <div className="twitter">{getTwitterDisplay(author)}</div>
        </div>
        <span className="date flex sm:self-start text-center">
          signed {dateDisplay}
        </span>
      </div>
    </div>
  );
}

export function SignatureContent() {
  const { signatures } = useContext(SignaturesContext);

  const [numSignaturesToRender, setNumSignaturesToRender] =
    useState(SignaturePageSize);

  const signaturesToRender = signatures.slice(0, numSignaturesToRender);

  function onSeeMore() {
    const newNumSignaturesToRender = numSignaturesToRender + SignaturePageSize;
    if (newNumSignaturesToRender > SignatureLimit) {
      // TODO: fetch more from remote
      // fetchSignatures(SignaturesLimit);
    }
    setNumSignaturesToRender(
      Math.min(newNumSignaturesToRender, signatures.length)
    );
  }

  return (
    <div className="signatureContainer mt-16 flex flex-col gap-2">
      <h2 className="text-4xl font-bold mb-2 text-center">Signatures</h2>
      {signaturesToRender.map((author) => (
        <Signature key={author.walletId} author={author} />
      ))}
      {numSignaturesToRender < signatures.length && (
        <div style={{ textAlign: "center" }} className="seeAll pt-8">
          <button className={ButtonClass()} onClick={onSeeMore}>
            See more
          </button>
        </div>
      )}
    </div>
  );
}
