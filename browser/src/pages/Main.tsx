import { Ref, useContext, useEffect, useRef, useState } from "react";
import EssayContent from "../components/EssayContent";
import PatternsContent from "../components/PatternsContent";
import Hero from "../components/Hero";
import { ContributionSection } from "../components/ContributionSection";
import { SignatureContent } from "../components/SignatureContent";
import { NavLink } from "react-router-dom";
import { Author } from "src/types/common/server-api";
import React from "react";
import { getUsers } from "src/helpers/api";
import useGsap from "src/hook/useGsap";
import { StatsContext } from "src/helpers/contexts/StatsContext";

export interface SignaturesContextInfo {
  signatures: Author[];
  fetchSignatures(newSignature?: Author): void;
}

export const SignaturesContext = React.createContext<SignaturesContextInfo>({
  signatures: [],
  fetchSignatures: () => {},
});

function SignaturesProvider({ children }) {
  const [authors, setAuthors] = useState<Author[]>([]);
  useEffect(async () => {
    await fetchSignatures();
  }, []);

  async function fetchSignatures(newSignature?: Author) {
    const users = await getUsers();
    setAuthors([...(newSignature ? [newSignature] : []), ...users]);
  }

  const signaturesContext = {
    signatures: authors,
    fetchSignatures,
  };

  return (
    <SignaturesContext.Provider value={signaturesContext}>
      {children}
    </SignaturesContext.Provider>
  );
}

export function Main() {
  const gsap = useGsap();

  const essayContentRef = useRef<any>();
  const patternsContentRef = useRef<any>();

  const { stats } = useContext(StatsContext);
  const fixedOpacity = 0.05;

  useEffect(() => {
    gsap.fromTo(
      ".fadeInOnTermsOnContributionSection",
      {
        opacity: fixedOpacity,
      },
      {
        opacity: 0.3,
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
        opacity: fixedOpacity,
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
        opacity: fixedOpacity,
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
    <>
      <div className="fadeOutOnScroll">
        <Hero />
      </div>
      <SignaturesProvider>
        <div className="mainContent px-2">
          <div id="essay-content" ref={essayContentRef}>
            <EssayContent />
          </div>
          <div ref={patternsContentRef}>
            <PatternsContent stats={stats} />
          </div>
          <div
            id="contributionSection"
            className="container w-full md:max-w-4xl mx-auto pb-20 px-4"
          >
            <ContributionSection />
            <br />

            <br />
            <SignatureContent />
          </div>
        </div>
      </SignaturesProvider>
    </>
  );
}
