import { useEffect, useState } from "react";
import { getUsers } from "src/helpers/api";
import { Author } from "src/types/common/server-api";
import dayjs from "dayjs";
import "./SignatureContent.css";

export function Signature({ author }: { author: Author }) {
  const { walletId, twitterVerified, twitterUsername, createdAt } = author;
  const authorDisplay = twitterVerified ? twitterUsername : walletId;
  const date = dayjs(createdAt);
  const dateDisplay = date
    .format("MMM D, YYYY [on minute] m A")
    .replace("AM", "in the day ☀️")
    .replace("PM", "in the night 🌙");

  // TODO: add location

  return (
    <div className="signature">
      <p>
        <div className="display">
          <span>{authorDisplay}</span>
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
