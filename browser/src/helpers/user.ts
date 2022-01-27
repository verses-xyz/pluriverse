import { ethers } from "ethers";
import { Author } from "src/types/common/server-api";
import { getUser } from "./api";
import { getWalletAddress } from "./wallet";

export async function fetchUserFromWalletAddress(
  providerToFetch: ethers.providers.Web3Provider
): Promise<Author | undefined> {
  const addr = await getWalletAddress(providerToFetch);
  if (addr) {
    return getUser({
      id: addr,
    });
  }
}
