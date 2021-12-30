
const hre = require("hardhat");

async function main() {

  const GameItem = await hre.ethers.getContractFactory("GameItem");
  const gameitem = await GameItem.deploy("MetaTxGameItem", "MTG");

  await gameitem.deployed();

  console.log("Greeter deployed to:", gameitem.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
