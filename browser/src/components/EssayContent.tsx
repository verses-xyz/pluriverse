import GitInfo from "react-git-info/macro";
import {useEffect, useRef, useState} from "react";
import dayjs from "dayjs";
import { EssayBody } from "./EssayBody";

// TODO: fill in repo from environment var.
const GitRepo = "https://github.com/verses-xyz/pluriverse";

interface Tag {
  name: string;
  value: string;
}

interface Edge {
  node: {
    id: string;
    tags: {
      find: (fn: (t: Tag) => boolean) => Tag;
    };
  };
}

const fetchLatestTxId = async () => {
  const req = await fetch("https://arweave.net/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: `
      query {
        transactions(
          tags: [
            {
              name: "DOC_NAME",
              values: ["pluriverse:browser/src/components/EssayBody.tsx"]
            }
          ],
          owners: ["aek33fcNH1qbb-SsDEqBF1KDWb8R1mxX6u4QGoo3tAs"],
        ) {
          edges {
            node {
              id
              tags {
                name
                value
              }
            }
          }
        }
      }
      `,
    }),
  });
  const json = await req.json();
  return (json.data.transactions.edges as Edge[])
    .sort((a, b) => {
      // we reverse sort edges if version is not defined to get latest version
      const getVersion = (edge: Edge): number =>
        parseInt(
          edge.node.tags.find((tag: Tag) => tag.name === "DOC_VERSION").value
        ) || 0;
      return getVersion(b) - getVersion(a);
    })
    .map((e) => e.node.id)[0];
};

export default function EssayContent() {
  const gitInfo = useRef(GitInfo());
  const [txId, setTxId] = useState("");
  useEffect(() => {
    fetchLatestTxId().then((res) => setTxId(res));
  }, []);

  const { shortHash: hash, date } = gitInfo.current.commit;
  const gitCommitLink = <a href={`${GitRepo}/commit/${hash}`}>{hash}</a>;
  const gitLastUpdatedDate = dayjs(date);
  const gitLastUpdatedDateDisplay = gitLastUpdatedDate.format(
    "MMM DD, YYYY, hh:mm:ssa"
  );

  // TODO: fill in. read from `arweave` file
  const arweaveDocLink = `https://viewblock.io/arweave/tx/${txId}`;

  return (
    <article className="container w-full px-5 md:px-0 md:max-w-2xl mx-auto pb-20">
      <EssayBody />
      <br />
      <div>
        Last updated on {gitLastUpdatedDateDisplay} ({gitCommitLink}). A copy of
        the Essay lives on the permaweb and can be found on{" "}
        <a href={arweaveDocLink}>Arweave tx:{txId.slice(0, 20)}</a>. It also
        lives in cyberspace at <a href="#">pluriverse.world</a>
      </div>
    </article>
  );
}
