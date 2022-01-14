import { ethers, providers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
// import Web3Modal from "web3modal";

// Connects a WalletConnect wallet.
export async function connectWithWalletConnect(): Promise<providers.Web3Provider> {
  //  Create WalletConnect Provider

  // USE web3Modal
  // const providerOptions = {
  //   walletconnect: {
  //     package: WalletConnectProvider,
  //     options: {
  //       infuraId: process.env.REACT_APP_INFURA_ID,
  //     },
  //   },
  // };
  // const web3Modal = new Web3Modal({
  //   network: "mainnet",
  //   cacheProvider: false,
  //   disableInjectedProvider: false,
  //   providerOptions,
  // });
  // const provider = await web3Modal.connect();

  // USE WALLETCONNECT LIBRARIES
  const provider = new WalletConnectProvider({
    infuraId: process.env.REACT_APP_INFURA_ID, // Required
  });

  //  Enable session (triggers QR Code modal)
  await provider.enable();
  return new providers.Web3Provider(provider);
}

// Uses window.ethereum to connect wallet
export async function connectBrowserWallet() {
  if (!window.ethereum) {
    throw new Error(
      "No wallet found. Please install Metamask or another Web3 wallet provider."
    );
  }

  await window.ethereum.request({ method: "eth_requestAccounts" });
}

// Utility methods for accessing a connected wallet account.
export async function generateSignature(
  textToSign: string,
  provider: providers.Web3Provider = new providers.Web3Provider(window.ethereum)
): Promise<string> {
  // Sign the declaration. Any errors here should be handled by the caller.
  const signer = provider.getSigner();
  return await signer.signMessage(textToSign);
}

export async function getWalletAddress(
  provider: providers.Web3Provider = new providers.Web3Provider(window.ethereum)
): Promise<string> {
  return await provider.getSigner().getAddress();
}

export async function signAndValidate(
  textToSign: string,
  provider: providers.Web3Provider = new providers.Web3Provider(window.ethereum)
): Promise<string> {
  const signature = await generateSignature(textToSign);
  const signer = provider.getSigner();
  const address = await signer.getAddress();
  const verifyingAddress = ethers.utils.verifyMessage(textToSign, signature);
  if (verifyingAddress !== address) {
    throw new Error("Invalid Signature!");
  }
  return signature;
}
