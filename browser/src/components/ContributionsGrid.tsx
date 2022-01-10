import { Contribution } from "src/types/common/server-api";
import { CompactContributionCard } from "./CompactContributionCard";
import { ContributionCard } from "./ContributionCard";

interface Props {
  contributions: Contribution[];
}

const mockContrubution = {
  id: 11,
  response: "a place and time where another world is possible",
  prompt: "LooksLike",
  pattern: "Pluriverse",
  createdAt: "2022-01-09T23:32:14.174Z",
  authorWalletId: "0x130C65c95A9c8fc80cC0360f23F85960B3B5Fa56",
  author: {
    id: "0x130C65c95A9c8fc80cC0360f23F85960B3B5Fa56",
    twitterVerified: false,
    twitterUsername: null,
    createdAt: "2022-01-09T23:32:13.928Z",
    walletId: "0x130C65c95A9c8fc80cC0360f23F85960B3B5Fa56",
  },
};

export default function ContributionsGrid() {
  // list with 15 mock contributions
  const mockContributions: Contribution[] = [];
  for (let i = 0; i < 12; i++) {
    mockContributions.push(mockContrubution);
  }

  // show contributions in a grid using tailwind
  return (
    <div className="pt-24">
      <h3 className="text-4xl font-bold pb-14">Contributions</h3>
      <div className="grid grid-cols-4 gap-6">
        {mockContributions.map((contribution, i) => (
          <CompactContributionCard contribution={contribution} key={i} />
        ))}
      </div>
    </div>
  );
}
