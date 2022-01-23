import React, { useEffect, useMemo, useState } from "react";
import { Pattern, Prompt } from "../types/common/server-api";
import { sha256 } from "ethers/lib/utils";
import Blob from "./Blob";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { randomEuler } from "./Blobs";
import { replaceJSX } from "./ContributionSection";

function toHex(str: string) {
  return str
    .split("")
    .map((_, i) => str.charCodeAt(i).toString(16))
    .join("");
}

function getMessageChunk(
  message: string,
  idx: number,
  val_start: number,
  range: number
) {
  const sub = message.substring(idx * 8, idx * 8 + 8);
  const eightCount = sub.split("8").length;
  const float = parseInt(sub, 16) / 0xffffffff;
  return float * range * eightCount + val_start;
}

const PromptDensityStart = 0.25;
const PromptDensityIncrement = 0.5;
const PromptAlphaStart = 0.75;
const PromptAlphaIncrement = 0.07;
const PatternColorIncrement = 0.1;

export function BlobSingle({
  walletId,
  pattern,
  response,
  prompt,
}: {
  walletId: string;
  pattern: string;
  response: string;
  prompt: string;
}): React.ReactElement {
  // 64 chars long sha256 str
  const contrib = `${walletId}: ${response}`;
  const rotation = useMemo(() => randomEuler(), []);

  const [message, setMessage] = useState(sha256(`0x${toHex(contrib)}`));
  useEffect(() => {
    const handler = setTimeout(() => {
      setMessage(sha256(`0x${toHex(contrib)}`));
    }, 500);

    return () => {
      // teardown
      clearTimeout(handler);
    };
  }, [contrib]);

  return (
    // <Canvas camera={{ position: [0, 0, 20], fov: 50 }}>
    //   <OrbitControls autoRotate={true} autoRotateSpeed={2} enableZoom={false} />
    //   <ambientLight intensity={0.5} />
    //   <directionalLight intensity={0.3} position={[5, 25, 20]} />
    //   <pointLight intensity={1} position={[-10, -25, -10]} />
    //   <spotLight
    //     castShadow
    //     intensity={2.25}
    //     angle={0.2}
    //     penumbra={1}
    //     position={[-25, 20, -15]}
    //     shadow-mapSize={[1024, 1024]}
    //     shadow-bias={-0.0001}
    //   />
    //   <Blob
    //     size={5}
    //     meshProps={{ rotation }}
    //     speed={getMessageChunk(message, 0, 0, 0.5)}
    //     color={Object.keys(Pattern).indexOf(pattern) * PatternColorIncrement}
    //     alpha={
    //       PromptAlphaStart +
    //       Object.keys(Prompt).reverse().indexOf(prompt) * PromptAlphaIncrement
    //     }
    //     // density={getMessageChunk(message, 1, 0, 2)}
    //     density={
    //       PromptDensityStart +
    //       Object.keys(Prompt).indexOf(prompt) * PromptDensityIncrement
    //     }
    //     strength={getMessageChunk(message, 2, 0.04, 0.2)}
    //     offset={getMessageChunk(message, 3, 0, 2 * Math.PI)}
    //   />
    // </Canvas>
    <div
      style={{ width: "100%", height: 200 }}
      data-blob={`{
      size:${5},
      speed:${getMessageChunk(message, 0, 0, 0.5)},
      color:${Object.keys(Pattern).indexOf(pattern) * PatternColorIncrement},
      alpha:${
        PromptAlphaStart +
        Object.keys(Prompt).reverse().indexOf(prompt) * PromptAlphaIncrement
      },
      density:${
        PromptDensityStart +
        Object.keys(Prompt).indexOf(prompt) * PromptDensityIncrement
      },
      strength:${getMessageChunk(message, 2, 0.04, 0.2)},
      offset:${getMessageChunk(message, 3, 0, 2 * Math.PI)}
    }`}
    ></div>
  );
}
