import UniverseScene from "src/components/UniverseScene";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";

export default function CanvasContributionsRenderer({ children }) {
  useEffect(() => {
    const blobsToRender = [];
    document.querySelectorAll("[data-blob]").forEach((el) => {
      const blobData = el.dataset.blob;
      blobsToRender.push({
        blobData: JSON.parse(blobData),
        boundingClientRect: el.getBoundingClientRect(),
      });
    });
    console.log(blobsToRender);
  }, []);

  return (
    <>
      <div className="canvas-container">
        <Canvas camera={{ position: [0, 0, 20], fov: 50 }}>
          <UniverseScene />
        </Canvas>
      </div>
      {children}
    </>
  );
}
