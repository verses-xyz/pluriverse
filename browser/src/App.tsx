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
  const gsap = useGsap();

  const essayContentRef = useRef<any>();
  const mainRef = useRef<any>();
  const patternsContentRef = useRef<any>();

  useEffect(() => {
    gsap.fromTo(
      ".fadeInOnTermsOnContributionSection",
      {
        opacity: 0,
      },
      {
        opacity: 1,
        scrollTrigger: {
          trigger: "#contributionSection",
          scrub: true,
        },
      }
    );
  }, []);

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
          end: "top top",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <div className="mainContainer">
      <main ref={mainRef}>
        <DevelopmentBanner />
        <Navbar />
        <Routes>
          <Route
            index={true}
            element={
              <Main
                essayContentRef={essayContentRef}
                patternsContentRef={patternsContentRef}
              />
            }
          />
          <Route path="about" element={<About />} />
          <Route path="contributions" element={<ContributionsPage />} />
        </Routes>
      </main>
      <Routes>
        <Route
          index={true}
          element={
            <>
              <GradientManager
                essayContentRef={essayContentRef}
                patternsContentRef={patternsContentRef}
              />
              <div className="canvas-container fadeOutOnScroll fadeInOnTermsOnContributionSection">
                <Canvas camera={{ position: [0, 0, 20], fov: 50 }}>
                  <UniverseScene />
                </Canvas>
              </div>
            </>
          }
        />
        <Route
          path="about"
          element={
            <GradientManager
              essayContentRef={mainRef}
              patternsContentRef={mainRef}
            />
          }
        />
        <Route
          path="contributions"
          element={
            <GradientManager
              essayContentRef={mainRef}
              patternsContentRef={mainRef}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
