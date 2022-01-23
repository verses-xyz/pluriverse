# Overview
This is an artifact created by [Verses](verses.xyz). Our first drop was the [Declaration](interdependence.online), where we introduced the term “pluriverse” and this is an essay artifact created to demonstrate the importance of that term and allow the community to collectively build the pluriverse together.

This is an interactive essay, where contributions to the patterns listed in the body of the text are created by readers and visitors by signing with their web3 identity (wallet). Contributions are free-form textual responses that follow provided sentence starters and map to a generative art blob (universe) that represents the contribution in the artistic, space representation of the pluriverse. Readers are able to sign onto the doc (in agreement or disagreement) and contribute their own meanings and creations to the pluriverse.

# Technical Specifics
## Wallets
We support wallets through Metamask and WalletConnect.

## Database
Data is storeed using Prisma with a Postgres underlying data store. Ideally, we would host all of our data on decentralized data storage (like IPFS, Solid, or others), but given the nascency of the technology and the overhead in keeping this data accessible, we have opted to use our own postgres server for ease of consumption and evolution. 

To embrace the principles of interoperability and commons as outlined in the essay, we automatically upload the essay content to Arweave whenever it changes and also store signatures on Arweave, associated with the live version of the document. We are hoping to make the Contributions created by readers owned by them via generated tokens moving forward and seek to make the Patterns of the Pluriverse easy for anyone to add onto.

## Deployment
We use Vercel for hosting both the frontend and backend (React and Node/Express server). Ideally, we'd like this to not rely on a single point of failure and considered using Argo as well for hosting and deployment.

This repo set up to automatically deploy to https://pluriverse-browser.vercel.app/ from `main`.

# Project Structure
All browser-related files are located in `browser` and all server-related files are located in `server`.
