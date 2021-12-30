const hre = require("hardhat");
async function main() {
  const NFT = await hre.ethers.getContractFactory("Pluriverse");
  // Use base64 encoding.
  const URI =
    "data:application/json;base64,ewogICJhbmltYXRpb25fdXJsIjogImlwZnM6Ly9RbVplUU5nZE04Q3huM0REQks5Y2Y1alR4NUhnNVNORlRTMjdMM0NodWJ6cjViIiwKICAiZXh0ZXJuYWxfdXJsIjogImh0dHBzOi8vcGx1cml2ZXJzZS53b3JsZCIsCiAgImJhY2tncm91bmRfY29sb3IiOiAiIzAwMDAwMCIsCiAgImF0dHJpYnV0ZXMiOiBbCiAgICB7ICJ0cmFpdF90eXBlIjogIlByb21wdCIsICJ2YWx1ZSI6ICJUaGUgX19fXyBpcy4uLiIgfSwKICAgIHsgInRyYWl0X3R5cGUiOiAiUGF0dGVybiIsICJ2YWx1ZSI6ICIgcGx1cml2ZXJzZSIgfQogIF0sCiAgIm5hbWUiOiAiUGx1cml2ZXJzZSAjMyIsCiAgImRlc2NyaXB0aW9uIjogIl9UaGUgcGx1cml2ZXJzZSBpcyBmcmVlIGdhcmRlbnMuX1xuXG5QbHVyaXZlcnNlcyBhcmUgdG9rZW5zIHJlcHJlc2VudGluZyBjb250cmlidXRpb25zIHRvIHRoZSBUb3dhcmRzIGEgUGx1cml2ZXJzZSBlc3NheS4iCn0K";
  // const URI = "ipfs://QmaVk7tgCkAL8nCMV4NWASRLd2fRrpL2T724jZjwn1H71v";
  const WALLET_ADDRESS = "0x6C8c8050a9C551B765aDBfe5bf02B8D8202Aa010";
  const CONTRACT_ADDRESS = "0xC3Eb1EF81C73Cc22488a54Acc2e0b0f52D35945F";
  const contract = NFT.attach(CONTRACT_ADDRESS);
  const id = await contract.mint(WALLET_ADDRESS, URI);
  console.log("NFT minted:", id);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
