import { Canvas } from "@react-three/fiber";
import UniverseScene from "./UniverseScene";
import { Contribution } from "src/types/common/server-api";
import dayjs from "dayjs";
import { renderBlob } from "src/helpers/blobs";
import "./ContributionCard.css";
import { Stars } from "@react-three/drei";

interface Props {
  contribution: Contribution;
}

function truncateWallet(address: string) {
  return address.slice(0, 6) + "..." + address.slice(-4);
}

export function ContributionCard({ contribution }: Props) {
  const { author, response, prompt, pattern, createdAt } = contribution;

  const date = dayjs(createdAt);
  const blob = renderBlob(pattern, prompt);

  const { walletId, twitterVerified, twitterUsername } = author;
  const authorDisplay = twitterVerified
    ? twitterUsername
    : truncateWallet(walletId);
  const dateDisplay = date.format("MMM, YYYY");

  return (
    <div className="contributionCardContainer">
      {/* <Canvas camera={{ position: [0, 0, 20], fov: 50 }}>
        <fog attach="fog" args={["#dbdbdb", 16, 30]} />
        <ambientLight intensity={0.5} />
        <directionalLight intensity={0.3} position={[5, 25, 20]} />
        <pointLight color="indianred" />
        <pointLight position={[10, 10, -10]} color="orange" />
        <pointLight position={[-10, -10, 10]} color="lightblue" />
        <pointLight intensity={1} position={[-10, -25, -10]} />
        <spotLight
          castShadow
          intensity={2.25}
          angle={0.2}
          penumbra={1}
          position={[-25, 20, -15]}
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.0001}
        />
        <Stars radius={500} depth={50} count={1500} factor={15} /> */}
      <h2 className="text-2xl font-bold">{pattern}</h2>
      <p className="">{response}</p>

      <div className="blobContainer">{blob}</div>

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
