import { ethers } from "ethers";
import { Author } from "src/types/common/server-api";
import { getUser } from "./api";
import { providers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";
import { useEffect, useState } from "react";
import React from "react";

export interface UserContextInfo {
  provider: ethers.providers.Web3Provider | undefined;
  setProvider(provider: ethers.providers.Web3Provider | undefined): void;
  currentUser: Author | undefined;
  setCurrentUser(user: Author | undefined): void;
  connectWallet(): Promise<providers.Web3Provider>;
  generateSignature(textToSign: string): Promise<string>;
  getWalletAddress(): Promise<string>;
  signAndValidate(textToSign: string): Promise<string>;
  fetchUserFromWalletAddress(): Promise<Author | undefined>;
}

export const UserContext = React.createContext<UserContextInfo>({
  provider: undefined,
  setProvider: () => {},
  currentUser: undefined,
  setCurrentUser: () => {},
  connectWallet: async () => ({} as any),
  generateSignature: async () => "",
  getWalletAddress: async () => "",
  signAndValidate: async () => "",
  fetchUserFromWalletAddress: async () => undefined,
});

const Web3ModalProviderOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: process.env.REACT_APP_INFURA_ID,
    },
  },
};
const web3Modal = new Web3Modal({
  network: "mainnet",
  cacheProvider: true,
  providerOptions: Web3ModalProviderOptions,
});

export function UserProvider({ children }) {
  const [provider, setProvider] = useState(
    window.ethereum
      ? new ethers.providers.Web3Provider(window.ethereum)
      : undefined
  );
  const [currentUser, setCurrentUser] = useState<Author | undefined>();

  // Connects a WalletConnect wallet.
  // async function connectWithWalletConnect(): Promise<providers.Web3Provider> {
  //   //  Create WalletConnect Provider

  //   // USE web3Modal
  //   // const providerOptions = {
  //   //   walletconnect: {
  //   //     package: WalletConnectProvider,
  //   //     options: {
  //   //       infuraId: process.env.REACT_APP_INFURA_ID,
  //   //     },
  //   //   },
  //   // };
  //   // const web3Modal = new Web3Modal({
  //   //   network: "mainnet",
  //   //   cacheProvider: false,
  //   //   disableInjectedProvider: false,
  //   //   providerOptions,
  //   // });
  //   // const provider = await web3Modal.connect();

  //   // USE WALLETCONNECT LIBRARIES
  //   const provider = new WalletConnectProvider({
  //     infuraId: process.env.REACT_APP_INFURA_ID, // Required
  //   });

  //   //  Enable session (triggers QR Code modal)
  //   await provider.enable();
  //   return new providers.Web3Provider(provider);
  // }

  // // Uses window.ethereum to connect wallet
  // async function connectBrowserWallet() {
  //   if (!window.ethereum) {
  //     throw new Error(
  //       "No wallet found. Please install Metamask or another Web3 wallet provider."
  //     );
  //   }

  //   await window.ethereum.request({ method: "eth_requestAccounts" });
  // }

  async function fetchUserFromWalletAddress(): Promise<Author | undefined> {
    const addr = await getWalletAddress();
    if (addr) {
      return getUser({
        id: addr,
      });
    }
  }

  async function connectWallet(): Promise<providers.Web3Provider> {
    const instance = await web3Modal.connect();
    await instance.enable();
    const newProvider = new providers.Web3Provider(instance);
    setProvider(newProvider);
    return newProvider;
  }

  // Utility methods for accessing a connected wallet account.
  async function generateSignature(textToSign: string): Promise<string> {
    if (!provider) {
      throw new Error("No web3 provider found!");
    }
    // Sign the declaration. Any errors here should be handled by the caller.
    const signer = provider.getSigner();
    return await signer.signMessage(textToSign);
  }

  async function getWalletAddress(): Promise<string> {
    if (!provider) {
      throw new Error("No web3 provider found!");
    }
    return await provider.getSigner().getAddress();
  }

  async function signAndValidate(textToSign: string): Promise<string> {
    if (!provider) {
      throw new Error("No web3 provider found!");
    }
    const signature = await generateSignature(textToSign);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const verifyingAddress = ethers.utils.verifyMessage(textToSign, signature);
    if (verifyingAddress !== address) {
      throw new Error("Invalid Signature!");
    }
    return signature;
  }

  useEffect(async () => {
    try {
      if (provider) {
        const fetchedUser = await fetchUserFromWalletAddress();
        setCurrentUser(fetchedUser);
      } else {
        setCurrentUser(undefined);
      }
      // eslint-disable-next-line no-empty
    } catch {}
  }, [provider]);

  const userContext = {
    provider,
    setProvider,
    currentUser,
    setCurrentUser,
    connectWallet,
    generateSignature,
    getWalletAddress,
    signAndValidate,
    fetchUserFromWalletAddress,
  };

  return (
    <UserContext.Provider value={userContext}>{children}</UserContext.Provider>
  );
}
