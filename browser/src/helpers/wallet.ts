import { ethers } from "ethers";
import { PluriverseAgreement } from "src/components/ContributionSection";

export async function connectWallet() {
  await window.ethereum.request({ method: "eth_requestAccounts" });
}

export async function generateSignature(): Promise<string> {
  if (!window.ethereum) {
    throw new Error(
      "No wallet found. Please install Metamask or another Web3 wallet provider."
    );
  }

  // Sign the declaration. Any errors here should be handled by the caller.
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  return await signer.signMessage(PluriverseAgreement);
}

export async function getWalletAddress(): Promise<string> {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  return await provider.getSigner().getAddress();
}

export async function signAndValidate(
  contributionResponse: string
): Promise<void> {
  // TODO: add the response at the top or bottom of the pluriverse article/agreement?
  const signature = await generateSignature();
  console.log(signature);
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  console.log(signer);
  const address = await signer.getAddress();
  console.log(address);
  const verifyingAddress = ethers.utils.verifyMessage(
    PluriverseAgreement,
    signature
  );
  if (verifyingAddress !== address) {
    throw new Error("Invalid Signature!");
  }
}
