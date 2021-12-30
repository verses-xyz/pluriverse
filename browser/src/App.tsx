import { Canvas } from "@react-three/fiber";
import React from "react";
import EssayContent from "./components/EssayContent";
import Hero from "./components/Hero";
import UniverseScene from "./components/UniverseScene";

function App() {
  return (
    <main>
      <div className="content">
        <Hero />
        <EssayContent />
      </div>
      <div className="canvas-container">
        <Canvas
          camera={{ position: [0, 0, 20], fov: 50 }}
          performance={{ min: 0.1 }}
        >
          <UniverseScene />
        </Canvas>
      </div>
    </main>
  );
}

export default App;
