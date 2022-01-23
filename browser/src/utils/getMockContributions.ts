import { Contribution } from "../../../server/common/server-api";

const mockContrubution = {
  id: 11,
  response:
    "lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, quisquam. lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, quisquam.  lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, quisquam. ",
  prompt: "LooksLike",
  pattern: "Interoperability",
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

export default function getMockContributions() {
  const mockContributions: Contribution[] = [];

  for (let i = 0; i < 12; i++) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    mockContributions.push({ ...mockContrubution, id: i });
  }

  for (let i = 13; i < 24; i++) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    mockContributions.push({ ...mockContrubution, pattern: "Agency", id: i });
  }

  return mockContributions;
}
