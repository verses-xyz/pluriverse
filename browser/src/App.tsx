import { Canvas } from "@react-three/fiber";
import React from "react";
import EssayContent from "./components/EssayContent";
import Hero from "./components/Hero";
import UniverseScene from "./components/UniverseScene";
import useScroll from "./hook/useScroll";
import lerp from "./utils/lerp";
import scalePercent from "./utils/scalePercent";

function App() {
  // only init once to initialize a single scroll scroll listener, TODO: maybe pass scroll data through react context
  const { scrollPercentage } = useScroll();

  // TODO: refactor to rely less on magic numbers, this is brittle as the page percentages will change if the content length of the page is altered
  const objectsToHideOpacity = lerp(
    1,
    0,
    scalePercent(0, 32, scrollPercentage)
  );

  const objectsToShowOpacity = lerp(
    0,
    1,
    scalePercent(10, 30, scrollPercentage)
  );

  return (
    <div>
      <main>
        <Hero />
        <div
          style={{
            opacity: objectsToShowOpacity,
          }}
        >
          <EssayContent />
        </div>
      </main>
      <div
        className="universe-background"
        style={{
          opacity: objectsToHideOpacity,
        }}
      >
        <Canvas camera={{ position: [0, 0, 20], fov: 50 }}>
          <UniverseScene scrollPercentage={scrollPercentage} />
        </Canvas>
      </div>
    </div>
  );
}

export default App;
