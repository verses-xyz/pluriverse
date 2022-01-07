import { Canvas } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import EssayContent from "./components/EssayContent";
import PatternsContent from "./components/PatternsContent";
import Hero from "./components/Hero";
import UniverseScene from "./components/UniverseScene";
import GradientManager from "./components/GradientManager";
import useGsap from "./hook/useGsap";
import { ContributionSection } from "./components/ContributionSection";

function App() {
  const gsap = useGsap();

  const essayContentRef = useRef<any>();
  const patternsContentRef = useRef<any>();

  useEffect(() => {
    gsap.fromTo(
      ".fadeOutOnScroll",
      {
        opacity: 1,
      },
      {
        opacity: 0,
        scrollTrigger: {
          trigger: essayContentRef.current,
          start: 0,
          end: " top top",
          scrub: true,
        },
      }
    );
  }, []);

  useEffect(() => {
    gsap.fromTo(
      essayContentRef.current,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        scrollTrigger: {
          trigger: essayContentRef.current,
          start: 0,
          end: " top top",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <div>
      <main>
        <div className="fadeOutOnScroll">
          <Hero />
        </div>
        <div style={{ backdropFilter: `blur(3px)` }}>
          <div id="essay-content" ref={essayContentRef}>
            <EssayContent />
          </div>
          <div ref={patternsContentRef}>
            <PatternsContent />
          </div>
          <div className="container w-full md:max-w-3xl mx-auto pb-20">
            <ContributionSection />
          </div>
        </div>
      </main>
      <GradientManager
        essayContentRef={essayContentRef}
        patternsContentRef={patternsContentRef}
      />
      <div className="canvas-container">
        <Canvas camera={{ position: [0, 0, 20], fov: 50 }}>
          <UniverseScene />
        </Canvas>
      </div>
    </div>
  );
}

export default App;
