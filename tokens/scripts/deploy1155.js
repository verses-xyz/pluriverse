
const hre = require("hardhat");

async function main() {

  const GameItems = await hre.ethers.getContractFactory("GameItems");
  // Example URI would be "https://sharpart-frontend.vercel.app/nft-metadata/jsons/{id}.json"

  const gameitems = await GameItems.deploy("Contract Name", "Base URI with id param");

  await gameitems.deployed();
  console.log("Greeter deployed to:", gameitems.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
