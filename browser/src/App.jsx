import { Canvas } from "@react-three/fiber";
import React from "react";
import EssayContent from "./components/EssayContent";
import Hero from "./components/Hero";
import UniverseScene from "./components/UniverseScene";

function App() {
  return (
    <>
      <main>
        <Hero />
        <EssayContent />
      </main>
      <Canvas
        style={{ position: "fixed", top: 0, left: 0 }}
        camera={{ position: [0, 0, 20], fov: 50 }}
        performance={{ min: 0.1 }}
      >
        <UniverseScene />
      </Canvas>
    </>
  );
}

export default App;
