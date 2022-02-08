import React, { useContext } from "react";
import { ContributionsContext } from "src/helpers/contexts/ContributionsContext";
import { Contribution, Pattern } from "src/types/common/server-api";
import { Principles } from "../types";
import ContributionsCarousel from "./ContributionsCarousel";
import "./PatternsContent.css";
import PatternSection from "./PatternSection";
import SectionDivider from "./SectionDivider";

function getContributionsByPattern(
  contributions: Contribution[],
  pattern: Pattern
) {
  const filteredContributions = contributions.filter(
    (c) => c.pattern === pattern
  );
  return filteredContributions;
}

export default function PatternsContent() {
  const { contributions } = useContext(ContributionsContext);

  return (
    <div className="container w-full md:max-w-7xl mx-auto mt-8">
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
      {[
        [Pattern.Pluriverse, { title: Pattern.Pluriverse }],
        ...Object.entries(Principles),
      ].map(([pattern, { title, problem, solution }], index) => (
        <PatternSection
          key={index}
          index={index}
          title={title}
          pattern={pattern as Pattern}
          problem={problem}
          solution={solution}
          contributions={getContributionsByPattern(
            contributions,
            pattern as Pattern
          )}
          defaultExpanded={index === 0}
        />
      ))}
      <div className="flex w-full items-center justify-center">
        <SectionDivider />
      </div>
    </div>
  );
}
