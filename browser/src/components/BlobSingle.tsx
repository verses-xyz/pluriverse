import React, { useEffect, useMemo, useState } from "react";
import { Pattern, Prompt } from "../types/common/server-api";
import Blob, { SizeChoice } from "./Blob";
import { randomEuler } from "./Blobs";

async function sha256(message: string) {
  // encode as UTF-8
  const msgBuffer = new TextEncoder().encode(message);

  // hash the message
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);

  // convert ArrayBuffer to Array
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  // convert bytes to hex string
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}

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
  if (!message) {
    return 0.5 * val_start;
  }
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
  lowRes,
}: {
  walletId: string;
  pattern: string;
  response: string;
  prompt: string;
  lowRes?: boolean;
}): React.ReactElement {
  // 64 chars long sha256 str
  const contrib = `${walletId}: ${response}`;
  const rotation = useMemo(() => randomEuler(), []);

  const [message, setMessage] = useState<undefined | string>();

  useEffect(() => {
    const handler = setTimeout(async () => {
      const hash = await sha256(`0x${toHex(contrib)}`);
      setMessage(hash);
    }, 0);

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
        sizeType={SizeChoice.Medium}
        lowRes={lowRes}
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
    </>
  );
}
