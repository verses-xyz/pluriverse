require('dotenv').config();
const { ArweaveClient } = require('ar-wrapper');
const fs = require('fs');
const { parse } = require('csv-parse');

const client = new ArweaveClient(process.env.ARWEAVE_ADDRESS, process.env.ARWEAVE_KEY);
const txId = "MvDewvGkfxPt1qEPcOlIKjmNa0O9oVM-3ygJdyBAy1Q";

function chunk<T>(arr: T[], chunkSize: number) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    chunks.push(arr.slice(i, i + chunkSize));
  }
  return chunks;
}

const walletAddresses: string[] = [];
fs.createReadStream("./signatures.csv")
  .pipe(parse({ delimiter: ',' }))
  .on('data', (csvrow: string[]) => {
    walletAddresses.push(csvrow[0]);
  })
  .on('end', async () => {
    console.log(`Finished processing CSV. Uploading ${walletAddresses.length} signatures`)
    const chunks = chunk(walletAddresses.slice(1), 10);
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      const promises = chunk.map(addr => {
        const name = `${txId}-${addr}`;
        const obj = {
          walletId: addr,
          docType: "signature",
          essayTransactionId: txId,
        }
        return client.addDocument(name, obj, obj);
      });
      const docs = await Promise.all(promises);
      docs.forEach(doc => console.log(`${doc.tags.walletId}, ${doc.txID}`))
    }
    console.log('Done!')
  });