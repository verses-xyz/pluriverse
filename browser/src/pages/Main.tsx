import { Ref, useEffect, useRef, useState } from "react";
import EssayContent from "../components/EssayContent";
import PatternsContent from "../components/PatternsContent";
import Hero from "../components/Hero";
import { ContributionSection } from "../components/ContributionSection";
import { SignatureContent } from "../components/SignatureContent";
import { NavLink } from "react-router-dom";
import { Contribution } from "src/types/common/server-api";
import React from "react";
import { getContributions } from "src/helpers/api";
import useGsap from "src/hook/useGsap";

export interface SignatureContext {
  // getSignatures
}

interface ContributionsContextInfo {
  contributions: Contribution[];
  fetchContributions(): void;
}

export const ContributionsContext =
  React.createContext<ContributionsContextInfo>({
    contributions: [],
    fetchContributions: () => {},
  });

function ContributionsProvider({ children }) {
  const [contributions, setContributions] = useState<Contribution[]>([]);

  useEffect(async () => {
    await fetchContributions();
  }, []);

  async function fetchContributions() {
    const newContributions = await getContributions({});
    setContributions(newContributions);
  }

  const contributionsContext = {
    contributions,
    fetchContributions,
  };

  return (
    <ContributionsContext.Provider value={contributionsContext}>
      {children}
    </ContributionsContext.Provider>
  );
}

export interface WalletContext {
  // getProvider
  // setProvider
}

export function Main() {
  const gsap = useGsap();

  const essayContentRef = useRef<any>();
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
    <>
      <div className="fadeOutOnScroll">
        <Hero />
      </div>
      <ContributionsProvider>
        <div className="mainContent">
          <div id="essay-content" ref={essayContentRef}>
            <EssayContent />
          </div>
          <div ref={patternsContentRef}>
            <PatternsContent />
          </div>
          <div
            id="contributionSection"
            className="container w-full md:max-w-4xl mx-auto pb-20 px-4"
          >
            <ContributionSection />
            <br />
            <div className="text-center pb-8">
              <NavLink to="/contributions">
                <button className={`glass-button`}>All Contributions</button>
              </NavLink>
            </div>
            <br />
            <SignatureContent />
          </div>
        </div>
      </ContributionsProvider>
      <footer className="pt-2 pb-16">
        <span>
          a drop from <a href="https://verses.xyz">Verses</a>, which is
          supported with 💜&nbsp; by <a href="https://gitcoin.co">Gitcoin</a>{" "}
          and <a href="https://fil.org/">Filecoin Foundation</a>
        </span>
      </footer>
    </>
  );
}
