import { Contribution, Pattern } from "src/types/common/server-api";
import { MockSignatures } from "./mock";

const mockContributionCommon = {
  response:
    "lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, quisquam. lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, quisquam.  lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, quisquam. ",
  prompt: "LooksLike",
  pattern: "Interoperability",
  createdAt: "2022-01-09T23:32:14.174Z",
};

export default function getMockContributions() {
  const mockContributions: Contribution[] = [];

  for (let i = 0; i < 12; i++) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    mockContributions.push({
      ...mockContributionCommon,
      id: i,
      author: MockSignatures[i % MockSignatures.length],
    });
  }

  for (let i = 13; i < 24; i++) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    mockContributions.push({
      ...mockContributionCommon,
      pattern: Pattern.Agency,
      id: i,
      author: MockSignatures[i % MockSignatures.length],
    });
  }

  return mockContributions;
}
