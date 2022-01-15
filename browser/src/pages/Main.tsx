import { Ref } from "react";
import EssayContent from "../components/EssayContent";
import PatternsContent from "../components/PatternsContent";
import Hero from "../components/Hero";
import { ContributionSection } from "../components/ContributionSection";
import { SignatureContent } from "../components/SignatureContent";
import { NavLink } from "react-router-dom";
import { ButtonLinkStyling } from "../types/styles";

interface Props {
  essayContentRef: Ref<any>;
  patternsContentRef: Ref<any>;
}

export interface SignatureContext {
  // getSignatures
}

export interface ContributionsContext {
  // getContributions
  // getContribution
}

export interface WalletContext {
  // getProvider
  // setProvider
}

export function Main({ essayContentRef, patternsContentRef }: Props) {
  return (
    <>
      <div className="fadeOutOnScroll">
        <Hero />
      </div>
      <div className="mainContent">
        <div id="essay-content" ref={essayContentRef}>
          <EssayContent />
        </div>
        <div ref={patternsContentRef}>
          <PatternsContent />
        </div>
        <div
          id="contributionSection"
          className="container w-full md:max-w-3xl mx-auto pb-20"
        >
          <ContributionSection />
          <br />
          <div className="text-center">
            <NavLink to="/contributions">
              <button className={`glass-button`}>All Contributions</button>
            </NavLink>
          </div>
          <br />
          <SignatureContent />
        </div>
      </div>
    </>
  );
}
