import { useEffect, useState } from "react";
import { getContributions } from "src/helpers/api";
import { Contribution, Pattern } from "src/types/common/server-api";
import { ButtonClass } from "src/types/styles";
import { Principles } from "../types";
import { ContributionCard } from "./ContributionCard";
import "./PatternsContent.css";
import PatternSection from "./PatternSection";

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
  const [contributions, setContributions] = useState<Contribution[]>([]);

  useEffect(async () => {
    const newContributions = await getContributions({});
    setContributions(newContributions);
  }, []);

  return (
    <div className="container w-full md:max-w-7xl mx-auto pb-20 px-8">
      {/* <hr />
      <div className="px-3 py-20">
        <div className="grid md:grid-cols-4 items-center justify-center">
          <div className="col-span-1">
            <h2 className="font-title font-mono italic text-4xl pl-8 font-bold pb-12">
              Patterns
            </h2>
          </div>
          <div className="col-span-3">
            <p className="pl-8 pr-2 pt-0">
              The digital pluriverse will cultivate the flourishing of many
              different, and potentially contrasting worlds. Deeply informed by
              Escobar’s autonomous design principles, as well as Christopher
              Alexander’s concept of pattern languages, we lay out below a set
              of intentions and epistemes for pluriversality, modeled as the
              beginning of a pattern language for the pluriverse. Each pattern
              maps to and connects with the others, in what we hope will be a
              network that is both ever-expanding and ever-concretizing.
            </p>
          </div>
        </div>
      </div>
      <hr /> */}
      {Object.values(Principles).map(({ title, problem, solution }, index) => (
        <PatternSection
          key={index}
          title={`0${index + 1}. ${title}`}
          problem={problem}
          solution={solution}
          contributions={getContributionsByPattern(
            contributions,
            title as Pattern
          )}
        />
      ))}
    </div>
  );
}
