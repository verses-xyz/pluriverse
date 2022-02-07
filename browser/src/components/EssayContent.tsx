import GitInfo from "react-git-info/macro";
import { useContext, useRef } from "react";
import dayjs from "dayjs";
import { EssayBody } from "./EssayBody";
import { ArweaveContext } from "src/helpers/contexts/ArweaveContext";
import { getArweaveLink } from "src/helpers/contributions";
import SectionDivider from "./SectionDivider";

// TODO: fill in repo from environment var.
const GitRepo = "https://github.com/verses-xyz/pluriverse";

export default function EssayContent() {
  const gitInfo = useRef(GitInfo());
  const { latestEssayInfo } = useContext(ArweaveContext);
  const { transactionId = "" } = latestEssayInfo || {};

  const { shortHash: hash, date } = gitInfo.current.commit;
  const gitCommitLink = <a href={`${GitRepo}/commit/${hash}`}>{hash}</a>;
  const gitLastUpdatedDate = dayjs(date);
  const gitLastUpdatedDateDisplay = gitLastUpdatedDate.format(
    "MMM DD, YYYY, hh:mm:ssa"
  );

  const arweaveDocLink = transactionId ? getArweaveLink(transactionId) : "";

  return (
    <article className="container w-full px-2 md:px-0 md:max-w-2xl mx-auto">
      <EssayBody />
      <div className="opacity-80">
        Last updated on {gitLastUpdatedDateDisplay} ({gitCommitLink}). A copy of
        the Essay lives on the permaweb and can be found on{" "}
        <a href={arweaveDocLink}>Arweave tx:{transactionId.slice(0, 20)}</a>. It
        also lives in cyberspace at <a href="#">pluriverse.world</a>
      </div>
      <SectionDivider />
    </article>
  );
}
