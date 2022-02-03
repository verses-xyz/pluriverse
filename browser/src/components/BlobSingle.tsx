import React, { useEffect, useMemo, useState } from "react";
import { Pattern, Prompt } from "../types/common/server-api";
import { sha256 } from "ethers/lib/utils";
import Blob from "./Blob";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { randomEuler } from "./Blobs";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  HueSaturation,
  Noise,
  Vignette,
} from "@react-three/postprocessing";

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

const PromptDensityStart = 0.35;
const PromptDensityIncrement = 0.4;
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
    <>
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
        meshProps={{ rotation }}
        speed={getMessageChunk(message, 0, 0.1, 0.5)}
        color={Object.keys(Pattern).indexOf(pattern) * PatternColorIncrement}
        alpha={
          PromptAlphaStart +
          Object.keys(Prompt).reverse().indexOf(prompt) * PromptAlphaIncrement
        }
        // density={getMessageChunk(message, 1, 0, 2)}
        density={
          PromptDensityStart +
          Object.keys(Prompt).indexOf(prompt) * PromptDensityIncrement
        }
        strength={getMessageChunk(message, 2, 0.04, 0.2)}
        offset={getMessageChunk(message, 3, 0, 2 * Math.PI)}
      />
      {/* <EffectComposer>
        <DepthOfField
          focusDistance={0}
          focalLength={0.5}
          bokehScale={0.4}
          height={480}
        />
        <Bloom
          luminanceThreshold={0}
          luminanceSmoothing={7}
          height={300}
          opacity={3}
        />
        <Noise opacity={0.025} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
        <HueSaturation hue={0.6} saturation={0.3} />
      </EffectComposer> */}
    </>
  );
}
