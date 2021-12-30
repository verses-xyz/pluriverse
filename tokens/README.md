# Truffle-Tutorial-ERC721
### Repo for deploying and minting NFTs for opensea with truffle and ipfs
### Visit https://dev.to/yournewempire/deploy-nfts-with-truffle-ipfs-opensea-polygon-5581 for detailed tutorial
### Prerequisite programming in node.js would be beneficial.

# Getting started 
Clone this repo. 
Run `npm install` in terminal.
Place Matic RPC node key and Wallet Mnemonic in new .env file
Upload some nft metadata to an api. I used IPFS.
Place link to NFT Collection.json in contractURI method, under Contribution.sol. 
Deploy the contracts with `truffle develop` then `migrate --network mumbai` in the terminal, then copy the contract address.
Add your account address, contract address and token json link to the mint script.
Enter `node scripts/mint.js` into the console to mint.


This is inspired by opensea's tutorial: https://github.com/ProjectOpenSea/opensea-creatures and https://docs.openzeppelin.com/contracts/4.x/erc721
and is supposed to be an expanded version (with ipfs and solidity at a higher version). With that, I shall explain what is going on clearly in the future blog post. 

Once again, huge credit to opensea, ethereum infrastructure, and ipfs for making it all possible for me to build on and learn with.


# Storage
The animations and visualizations are stored on IPFS. Ideally, we would want to store this all on-chain, but it requires a more complex solution akin to what Artblocks does with storing the rendering script on-chain that we don't have time or resources to prioritize.

We manually deployed the collection metadata to IPFS for retrieval by external marketplaces.


https://github.com/YourNewEmpire/Hardhat-Opensea-Boilerplate


Currently has a bunch of template files that will be integrated at some point.
