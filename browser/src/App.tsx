import { Canvas } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import EssayContent from "./components/EssayContent";
import Hero from "./components/Hero";
import UniverseScene from "./components/UniverseScene";
import useGsap from "./hook/useGsap";

function App() {
  const gsap = useGsap();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const universeRef = useRef<any>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const essayContentRef = useRef<any>();

  useEffect(() => {
    gsap.fromTo(
      universeRef.current,
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
        <Hero />
        <div ref={essayContentRef}>
          <EssayContent />
        </div>
      </main>
      <div className="universe-background" ref={universeRef}>
        <Canvas camera={{ position: [0, 0, 20], fov: 50 }}>
          <UniverseScene essayContentRef={essayContentRef} />
        </Canvas>
      </div>
    </div>
  );
}

export default App;
