require("@nomiclabs/hardhat-waffle");

const { ethers } = require("hardhat");
async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const NFT = await ethers.getContractFactory("Pluriverse");
  const nft = await NFT.deploy();
  await nft.deployed();
  // somehow this nft.address is wrong and points to an existing address which seems like a huge bug lol
  // so instead log the transaction address of the deployment and you can look up the actual
  // minted address from that on polygonscan.com
  // console.log("NFT deployed to:", nft.address);
  console.log("Deploy NFT transaction address:", nft.deployTransaction.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
