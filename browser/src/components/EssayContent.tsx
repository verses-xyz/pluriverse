import GitInfo from "react-git-info/macro";
import { useContext, useRef } from "react";
import dayjs from "dayjs";
import { EssayBody } from "./EssayBody";
import { ArweaveContext } from "src/helpers/contexts/ArweaveContext";

// TODO: fill in repo from environment var.
const GitRepo = "https://github.com/verses-xyz/pluriverse";

export default function EssayContent() {
  const gitInfo = useRef(GitInfo());
  const { latestEssayTxId } = useContext(ArweaveContext);

  const { shortHash: hash, date } = gitInfo.current.commit;
  const gitCommitLink = <a href={`${GitRepo}/commit/${hash}`}>{hash}</a>;
  const gitLastUpdatedDate = dayjs(date);
  const gitLastUpdatedDateDisplay = gitLastUpdatedDate.format(
    "MMM DD, YYYY, hh:mm:ssa"
  );

  const arweaveDocLink = `https://viewblock.io/arweave/tx/${latestEssayTxId}`;

  return (
    <article className="container w-full px-5 md:px-0 md:max-w-2xl mx-auto pb-20">
      <EssayBody />
      <br />
      <div>
        Last updated on {gitLastUpdatedDateDisplay} ({gitCommitLink}). A copy of
        the Essay lives on the permaweb and can be found on{" "}
        <a href={arweaveDocLink}>Arweave tx:{latestEssayTxId.slice(0, 20)}</a>.
        It also lives in cyberspace at <a href="#">pluriverse.world</a>
      </div>
    </article>
  );
}
