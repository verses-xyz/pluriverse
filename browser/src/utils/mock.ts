import { Author } from "src/types/common/server-api";

export const UseMock = false;

export const MockSignatures: Author[] = [
  {
    name: "Spencer Chang",
    twitterVerified: false,
    twitterUsername: undefined,
    createdAt: new Date("2022-01-09T23:32:13.928Z"),
    walletId: "0x130C65c95A9c8fc80cC0360f23F85960B3B5Fa56",
    disagrees: false,
    signature: "0x123123812389",
  },
  {
    name: "Divya",
    twitterVerified: false,
    twitterUsername: undefined,
    createdAt: new Date("2022-01-03T23:32:13.928Z"),
    walletId: "0x130C65c95A9c8fc80cC0360f23F85960B3B5Fa56",
    disagrees: false,
    signature: "0x123123812389",
  },
  {
    name: "verses",
    twitterVerified: true,
    twitterUsername: "verses_xyz",
    createdAt: new Date("2022-01-08T23:32:13.928Z"),
    walletId: "0x130C65c95A9c8fc80cC0360f23F85960B3B5Fa56",
    disagrees: false,
    signature: "0x123123812389",
  },
];

export default function getMockSignatures(): Author[] {
  const mockSignatures: Author[] = [];

  for (let i = 0; i < 4; i++) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    mockSignatures.push(...MockSignatures);
  }

  return mockSignatures;
}
