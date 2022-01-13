import { ethers } from "ethers";

export async function connectWallet() {
  await window.ethereum.request({ method: "eth_requestAccounts" });
}

export async function generateSignature(textToSign: string): Promise<string> {
  if (!window.ethereum) {
    throw new Error(
      "No wallet found. Please install Metamask or another Web3 wallet provider."
    );
  }

  // Sign the declaration. Any errors here should be handled by the caller.
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  return await signer.signMessage(textToSign);
}

export async function getWalletAddress(): Promise<string> {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  return await provider.getSigner().getAddress();
}

export async function signAndValidate(textToSign: string): Promise<string> {
  const signature = await generateSignature(textToSign);
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const address = await signer.getAddress();
  const verifyingAddress = ethers.utils.verifyMessage(textToSign, signature);
  if (verifyingAddress !== address) {
    throw new Error("Invalid Signature!");
  }
  return signature;
}
