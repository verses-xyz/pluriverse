import React, { useEffect, useRef, useState } from "react";
import { Contribution } from "src/types/common/server-api";
import getMockContributions from "src/utils/getMockContributions";
import { UseMock } from "src/utils/mock";
import { getContributions, getContribution } from "../api";

interface ContributionsContextInfo {
  contributions: Contribution[];
  fetchContributions(): void;
  fetchContribution(id: number): Promise<Contribution>;
}

export const ContributionsContext =
  React.createContext<ContributionsContextInfo>({
    contributions: [],
    fetchContributions: () => {},
    fetchContribution: () => Promise.resolve(undefined),
  });

export function ContributionsProvider({ children }) {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const contributionIdsSet = useRef(new Set<number>());

  useEffect(() => {
    void fetchContributions();
  }, []);

  async function fetchContributions(highlightedContributionId?: number) {
    let newContributions: Contribution[];
    if (UseMock) {
      newContributions = getMockContributions();
    } else {
      newContributions = await getContributions({
        contributionId: highlightedContributionId,
      });
      for (const { id } of newContributions) {
        contributionIdsSet.current.add(id);
      }
    }
    // TODO: this is overriding highlighted contribution, fix
    setContributions(newContributions);
  }

  async function fetchContribution(id: number) {
    const contribution = await getContribution({ id });
    if (!contributionIdsSet.current.has(id)) {
      contributionIdsSet.current.add(id);
      console.log("setting contributions");
      const newContributions = [...contributions, contribution];
      console.log(newContributions);
      setContributions(newContributions);
    }
    return contribution;
  }

  const contributionsContext = {
    contributions,
    fetchContributions,
    fetchContribution,
  };

  return (
    <ContributionsContext.Provider value={contributionsContext}>
      {children}
    </ContributionsContext.Provider>
  );
}
