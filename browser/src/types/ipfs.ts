// import * as IPFS from "ipfs-core";
/* import the ipfs-http-client library */
import { create } from "ipfs-http-client";

/* Create an instance of the client */
const client = create({ url: "https://ipfs.infura.io:5001/api/v0" });

export const ipfs = client;

// async function init() {
//   ipfs = await IPFS.create();
// }
// // TODO: turn this into provider/consumers
// void init();
