import { Scroll, ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import Hero from "./components/Hero";
import UniverseScene from "./components/UniverseScene";

function App() {
  return (
    <main>
      <Canvas
        camera={{ position: [0, 0, 20], fov: 50 }}
        performance={{ min: 0.1 }}
      >
        <ScrollControls pages={3} distance={1} damping={4}>
          <UniverseScene />
          <Scroll html>
            <Hero />
          </Scroll>
        </ScrollControls>
      </Canvas>
    </main>
  );
}

export default App;
