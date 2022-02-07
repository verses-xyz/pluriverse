import React, { useContext } from "react";
import { ContributionsContext } from "src/helpers/contexts/ContributionsContext";
import {
  Contribution,
  GetStatsResponse,
  Pattern,
} from "src/types/common/server-api";
import { Principles } from "../types";
import ContributionsCarousel from "./ContributionsCarousel";
import "./PatternsContent.css";
import PatternSection from "./PatternSection";
import { ContributeButton } from "./Navbar";
import { NavLink } from "react-router-dom";

function getContributionsByPattern(
  contributions: Contribution[],
  pattern: Pattern
) {
  const filteredContributions = contributions.filter(
    (c) => c.pattern === pattern
  );
  return filteredContributions;
}

export default function PatternsContent({
  stats,
}: {
  stats: GetStatsResponse | undefined;
}) {
  const { contributions } = useContext(ContributionsContext);

  return (
    <div className="container w-full md:max-w-5xl mx-auto my-8">
      <h2
        id={Pattern.Pluriverse}
        className="font-title text-4xl font-bold my-8"
      >
        Patterns
      </h2>
      <p className="pt-0 mt-8 mb-4">
        Each contribution to these patterns has been seeded and gifted by a
        reader like you. We hope this artifact functions as a collective garden,
        continuously tended to by the citizens of cyberspace.
      </p>
      <p className="pt-0 mb-8 mt-4">
        Please browse the pattern formulations below and contribute to the ones
        that resonate to share what is meaningful to and necessary for you and
        the broader community to create the pluriverse.
      </p>
      <ContributionsCarousel
        contributions={getContributionsByPattern(
          contributions,
          Pattern.Pluriverse
        )}
      />
      {stats && (
        <div className="mb-16 text-center w-1/2 mx-auto">
          <p className="mb-4">
            <b>{stats.authorsTotal}</b> members of the{" "}
            <b className="shimmer">Pluriverse</b> community have signed, and{" "}
            <b>{stats.contributionsTotal}</b> contributions have been submitted.
          </p>
          <ContributeButton />
          <div className="mt-4">
            <NavLink to="/contributions">
              <button className={`glass-button md:px-6`}>
                Browse all contributions
              </button>
            </NavLink>
          </div>
        </div>
      )}
      {Object.entries(Principles).map(
        ([pattern, { title, problem, solution }], index) => (
          <PatternSection
            key={index}
            pattern={pattern}
            title={`0${index + 1}. ${title}`}
            problem={problem}
            solution={solution}
            contributions={getContributionsByPattern(
              contributions,
              pattern as Pattern
            )}
          />
        )
      )}
    </div>
  );
}
