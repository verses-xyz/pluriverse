import { Canvas } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import UniverseScene from "./components/UniverseScene";
import GradientManager from "./components/GradientManager";
import useGsap from "./hook/useGsap";
import { DevelopmentBanner } from "./components/DevelopmentBanner";
import { Routes, Route } from "react-router-dom";
import { About } from "./pages/About";
import { ContributionsPage } from "./pages/ContributionsPage";
import { Navbar } from "./components/Navbar";
import { Main } from "./pages/Main";

function App() {
  return (
    <div className="mainContainer">
      <main>
        <DevelopmentBanner />
        <Navbar />
        <Routes>
          <Route index={true} element={<Main />} />
          <Route path="about" element={<About />} />
          <Route path="contributions" element={<ContributionsPage />} />
          <Route
            path="contributions/:contributionId"
            element={<ContributionsPage />}
          />
        </Routes>
      </main>
      <Routes>
        <Route
          index={true}
          element={
            <>
              <GradientManager />
              <div className="canvas-container fadeOutOnScroll fadeInOnTermsOnContributionSection">
                <Canvas camera={{ position: [0, 0, 20], fov: 50 }}>
                  <UniverseScene />
                </Canvas>
              </div>
            </>
          }
        />
        <Route path="about" element={<GradientManager />} />
        <Route path="contributions*" element={<GradientManager />} />
      </Routes>
    </div>
  );
}

export default App;
