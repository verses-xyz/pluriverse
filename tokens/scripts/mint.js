const hre = require("hardhat");
const NUM_ITEMS = 5;
const OWNER_ADDRESS = "";

async function main() {

      const GameItem = await hre.ethers.getContractFactory("GameItem");
      const gameItem = await GameItem.attach('yourcontractaddress')

      for (var i = 1; i <= NUM_ITEMS; i++) {
            await gameItem.mintItem(OWNER_ADDRESS, `your_metadata_uri`);
      }
}

main()
      .then(() => process.exit(0))
      .catch((error) => {
            console.error(error);
            process.exit(1);
      });
