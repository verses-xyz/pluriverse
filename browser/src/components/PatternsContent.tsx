import { useEffect, useState } from "react";
import { getContributions } from "src/helpers/api";
import { Contribution, Pattern } from "src/types/common/server-api";
import { ButtonClass } from "src/types/styles";
import { Principles } from "../types";
import { ContributionCard } from "./ContributionCard";
import "./PatternsContent.css";
import PatternSection from "./PatternSection";

const PreviewContributionLimit = 3;

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
    <div className="container w-full md:max-w-6xl mx-auto pt-20 pb-20">
      <h2 className="font-title font-mono text-4xl pt-16 font-bold pb-3">
        Patterns
      </h2>
      <p className="max-w-2xl">
        The digital pluriverse will cultivate the flourishing of many different,
        and potentially contrasting worlds. Deeply informed by Escobar’s
        autonomous design principles, as well as Christopher Alexander’s concept
        of pattern languages, we lay out below a set of intentions and epistemes
        for pluriversality, modeled as the beginning of a pattern language for
        the pluriverse. Each pattern maps to and connects with the others, in
        what we hope will be a network that is both ever-expanding and
        ever-concretizing.
      </p>
      <div className="pt-16">
        {Object.values(Principles).map(({ title, body }, index) => (
          <PatternSection
            key={index}
            title={`0${index + 1}. ${title}`}
            body={body}
            contributions={getContributionsByPattern(
              contributions,
              title as Pattern
            )}
          />
        ))}
      </div>
    </div>
  );
}
