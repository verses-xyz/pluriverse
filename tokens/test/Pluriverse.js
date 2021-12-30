const { expect } = require("chai");

describe("Pluriverse contract", function () {
  it("It should deploy the contract, mint a token, and resolve to the right URI", async function () {
    const NFT = await ethers.getContractFactory("Pluriverse");
    const nft = await NFT.deploy();
    const URI = "ipfs://QmWJBNeQAm9Rh4YaW8GFRnSgwa4dN889VKm9poc2DQPBkv";
    await nft.deployed();
    await nft.mint("0x7028f6756a9b815711bc2d37e8d5be23fdac846d", URI);
    console.log(await nft.tokenURI(1));
    expect(await nft.tokenURI(1)).to.equal(URI);
  });
});
