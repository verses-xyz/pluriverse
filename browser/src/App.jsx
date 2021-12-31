import { Canvas, useThree } from "@react-three/fiber";
import React, { useEffect } from "react";
import EssayContent from "./components/EssayContent";
import Hero from "./components/Hero";
import UniverseScene from "./components/UniverseScene";
import { useSpring, animated } from "react-spring";
import useScroll from "./hooks/useScroll";
import lerp from "./utils/lerp";
import scalePercent from "./utils/scalePercent";

function App() {
  const scrollData = useScroll();
  const { scrollY, scrollPercentage } = scrollData;
  const [{ opacity }, set] = useSpring(() => ({ opacity: 0 }));

  console.log(opacity);

  console.log(scrollY);

  // useEffect(() => {
  //   set({ opacity: 1 });
  // }, [scrollY]);

  return (
    <>
      <div
        style={{
          height: "100vh",
          width: "100vw",
          position: "fixed",
          opacity: lerp(1, 0, scalePercent(0, 60, scrollPercentage)),
          background: `radial-gradient(
              at 50% 100%,
              #873740 0%,
              #272730 40%,
              #171720 80%,
              #070710 100%
            )`,
        }}
      />
      <main>
        <div
          style={{
            zIndex: 100000,
            opacity: lerp(1, 0, scalePercent(0, 60, scrollPercentage)),
          }}
        >
          <Hero />
        </div>
        <div
          style={{
            opacity: lerp(0, 1, scalePercent(0, 100, scrollPercentage)),
          }}
        >
          <EssayContent />
        </div>
      </main>
      <Canvas
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          opacity: lerp(1, 0, scalePercent(0, 60, scrollPercentage)),
        }}
        camera={{ position: [0, 0, 20], fov: 50 }}
        performance={{ min: 0.1 }}
      >
        <UniverseScene scrollData={scrollData} />
      </Canvas>
    </>
  );
}

export default App;
