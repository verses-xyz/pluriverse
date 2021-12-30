require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");

const privateKey = process.env.MNEMONIC;
const maticUrl = process.env.MATIC_APP_ID;
// const polyScan = process.env.POLYGONSCAN;
console.log(privateKey);
module.exports = {
  defaultNetwork: "matic",
  // Uncomment this line and comment above if using testing lol
  // defaultNetwork: "hardhat",
  solidity: {
    version: "0.8.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {},
    matic: {
      // chainId: 137, for matic mainnet
      chainId: 80001,
      // https://rpc-mumbai.maticvigil.com standard url
      url: `https://rpc-mumbai.maticvigil.com/v1/${maticUrl}`,
      accounts: [privateKey],
    },
  },
  // TODO: need to fill this out for verification, apparently helpful
  // //* Keep name as 'etherscan' to avoid errors.
  // etherscan: {
  //   url: "https://polygonscan.com/",
  //   apiKey: polyScan,
  // },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  mocha: {
    timeout: 20000,
  },
};
