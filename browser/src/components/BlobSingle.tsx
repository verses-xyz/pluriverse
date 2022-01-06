import React, { useEffect, useState } from "react";
import { Prompt } from "../types/common/server-api";
import { sha256 } from "ethers/lib/utils";
import Blob from "./Blob";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

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

export const PromptColours: Record<Prompt, number> = {
  [Prompt.LooksLike]: 0,
  [Prompt.WeNeed]: 0.25,
  [Prompt.Example]: 0.5,
};

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
  const contrib = `${walletId}@${pattern}: ${response}`;

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
    <Canvas camera={{ position: [0, 0, 20], fov: 50 }}>
      <OrbitControls autoRotate={true} autoRotateSpeed={2} enableZoom={false} />
      <ambientLight intensity={0.5} />
      <directionalLight intensity={0.3} position={[5, 25, 20]} />
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
      <Blob
        size={5}
        speed={getMessageChunk(message, 0, 0, 0.5)}
        color={PromptColours[prompt]}
        density={getMessageChunk(message, 1, 0, 2)}
        strength={getMessageChunk(message, 2, 0, 0.2)}
        offset={getMessageChunk(message, 3, 0, 2 * Math.PI)}
      />
    </Canvas>
  );
}
