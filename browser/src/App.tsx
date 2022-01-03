import { Canvas } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import EssayContent from "./components/EssayContent";
import Hero from "./components/Hero";
import UniverseScene from "./components/UniverseScene";
import GradientManager from "./components/GradientManager";
import useGsap from "./hook/useGsap";
import { ContributionSection } from "./components/ContributionSection";

function App() {
  const gsap = useGsap();

  const essayContentRef = useRef<any>();

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
        <div ref={essayContentRef}>
          <EssayContent />
          <div className="container w-full md:max-w-2xl mx-auto pb-20">
            <ContributionSection />
          </div>
        </div>
      </main>
      <GradientManager essayContentRef={essayContentRef} />
      <div className="canvas-container fadeOutOnScroll">
        <Canvas camera={{ position: [0, 0, 20], fov: 50 }}>
          <UniverseScene essayContentRef={essayContentRef} />
        </Canvas>
      </div>
    </div>
  );
}

export default App;
