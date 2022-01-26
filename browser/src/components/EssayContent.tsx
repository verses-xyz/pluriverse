import GitInfo from "react-git-info/macro";
import { useRef } from "react";
import dayjs from "dayjs";
import { EssayBody } from "./EssayBody";

// TODO: fill in repo from environment var.
const GitRepo = "https://github.com/verses-xyz/pluriverse";

export default function EssayContent() {
  const gitInfo = useRef(GitInfo());

  const { shortHash: hash, date } = gitInfo.current.commit;
  const gitCommitLink = <a href={`${GitRepo}/commit/${hash}`}>{hash}</a>;
  const gitLastUpdatedDate = dayjs(date);
  const gitLastUpdatedDateDisplay = gitLastUpdatedDate.format(
    "MMM DD, YYYY, hh:mm:ssa"
  );

  // TODO: fill in.
  const arweaveTransactionId = process.env.REACT_APP_ARWEAVE_TRANSACTION;
  const arweaveDocLink = process.env.REACT_APP_ARWEAVE_;

  return (
    <article className="container w-full px-5 md:px-0 md:max-w-2xl mx-auto pb-20">
      <EssayBody />
      <br />
      <div>
        Last updated on {gitLastUpdatedDateDisplay} ({gitCommitLink}) and stored
        on Arweave via <a href={arweaveDocLink}>tx:{arweaveTransactionId}</a>.
      </div>
    </article>
  );
}
