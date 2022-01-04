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
  await window.ethereum.request({ method: "eth_requestAccounts" });
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  return await signer.signMessage(PluriverseAgreement);
}

export async function connectWalletAndSign() {
  const signature = generateSignature();
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const address = await signer.getAddress();
  const verifyingAddress = ethers.utils.verifyMessage(
    PluriverseAgreement,
    signature
  );
  if (verifyingAddress !== address) {
    throw new Error("Signature mismatch");
  }
}
