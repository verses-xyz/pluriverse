// import { ethers } from "ethers";

// export const connect = () => {
//   return async (dispatch) => {
//     if (window.ethereum) {
//       let web3 = new ethers(window.ethereum);
//       try {
//         const accounts = await window.ethereum.request({
//           method: "eth_requestAccounts",
//         });
//         const networkId = await window.ethereum.request({
//           method: "net_version",
//         });
//         const NetworkData = await SmartContract.networks[networkId];
//         if (NetworkData) {
//           const SmartContractObj = new ethers.Contract(
//             SmartContract.abi,
//             NetworkData.address
//           );
//           dispatch(
//             connectSuccess({
//               account: accounts[0],
//               smartContract: SmartContractObj,
//               web3: web3,
//             })
//           );
//           // Add listeners start
//           window.ethereum.on("accountsChanged", (accounts) => {
//             dispatch(updateAccount(accounts[0]));
//           });
//           window.ethereum.on("chainChanged", () => {
//             window.location.reload();
//           });
//           // Add listeners end
//         } else {
//           dispatch(connectFailed("Change network to Polygon."));
//         }
//       } catch (err) {
//         dispatch(connectFailed("Something went wrong."));
//       }
//     } else {
//       dispatch(connectFailed("Install Metamask."));
//     }
//   };
// };

export default {};
