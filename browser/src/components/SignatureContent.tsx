import { useEffect, useState } from "react";
import { getUsers } from "src/helpers/api";
import { Author } from "src/types/common/server-api";
import dayjs from "dayjs";
import "./SignatureContent.css";
import { Checkmark } from "./core/Checkmark";

function truncateWallet(address: string) {
  return address.slice(0, 6) + "..." + address.slice(-4);
}

// TODO: get ENS?
export function getDisplayForAuthor(
  { twitterVerified, twitterUsername, name, walletId }: Author,
  shouldTruncate?: boolean
): React.ReactNode {
  const walletAddr = shouldTruncate ? truncateWallet(walletId) : walletId;
  const nameDisplay = name || walletAddr;
  const twitterUrl =
    twitterUsername &&
    twitterVerified &&
    `https://twitter.com/${twitterUsername}`;
  return (
    <span>
      {nameDisplay}{" "}
      {twitterUrl && (
        <button
          onClick={() => {
            window.open(twitterUrl, "_blank");
          }}
        >
          <Checkmark />
        </button>
      )}
    </span>
  );
}

export function Signature({ author }: { author: Author }) {
  const { createdAt, name, walletId } = author;
  const nameDisplay = name || walletId;
  const date = dayjs(createdAt);
  const dateDisplay = date.format(
    `MMM D, YYYY [on minute] m ${
      date.hour() >= 6 && date.hour() <= 18
        ? "[in the day] ☀️"
        : "[in the night] 🌙"
    }`
  );

  // TODO: add location

  return (
    <div className="signature">
      <p>
        <div className="display">
          <span>{nameDisplay}</span>
          <span className="date">signed {dateDisplay}</span>
        </div>
        <div className="twitter"></div>
      </p>
    </div>
  );
}

export function SignatureContent() {
  const [authors, setAuthors] = useState<Author[]>([]);
  useEffect(async () => {
    const users = await getUsers();
    setAuthors(users);
  }, []);

  return (
    <div className="signatureContainer">
      <h2 className="text-4xl font-bold">Signatures</h2>
      {authors.map((author) => (
        <Signature author={author} />
      ))}
    </div>
  );
}
