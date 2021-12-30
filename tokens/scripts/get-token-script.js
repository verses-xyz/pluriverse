const hre = require("hardhat");
async function main() {
  const NFT = await hre.ethers.getContractFactory("Pluriverse");
  const CONTRACT_ADDRESS = "0xC3Eb1EF81C73Cc22488a54Acc2e0b0f52D35945F";
  const contract = NFT.attach(CONTRACT_ADDRESS);
  const owner = await contract.ownerOf(1);
  console.log("Owner:", owner);
  const uri = await contract.tokenURI(1);
  console.log("URI: ", uri);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
