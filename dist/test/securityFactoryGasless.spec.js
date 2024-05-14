"use strict";
// import assert from 'assert';
// import { Provider } from "../utils/index";
// import { VerifiedWallet } from "../wallet/index";
// import { SecuritiesFactory, Security } from "../index";
// import { ethers } from "ethers";
// describe("Polygon Mumbai Testnet Gassless Tests", () => {
//   const INFURA_API_KEY = "e0951a7b82c84a6880f3c6f7bb182e21";        
//   const SECURITY_HOLDER_MNEMONICS =
//     "correct galaxy various swap chair assault blue improve ivory pear infant oak";
//   const sender = VerifiedWallet.importWallet(SECURITY_HOLDER_MNEMONICS);
//   const signer = sender.setProvider(Provider.infuraProvider(80001, INFURA_API_KEY));
//   describe("SecurityFactories Gasless Test", () => {
//     const securityFactoryAddress = "0xf1f349C2CBDA5BCAfD7F95b20C812b4A17c9333D";
//     const securityFactoryContract = new SecuritiesFactory(
//       signer,
//       securityFactoryAddress
//     );
//     const zeroAddress = "0x0000000000000000000000000000000000000000";
//     it("it should Issue Security", async () => {
//       const BTCShortBytes = "0x425443";
//       const currency = "0x07865c6E87B9F70255377e024ace6630C1Eaa37F"; //usdc
//       const defaultBytes =
//         "0x4346440000000000000000000000000000000000000000000000000000000000";
//       const indiaBytes =
//         "0x496e646961000000000000000000000000000000000000000000000000000000";
//       const abiCoder = ethers.utils.defaultAbiCoder;
//       const encodedArray = abiCoder.encode(["bytes32[]"], [[]]);
//       await securityFactoryContract
//         .issueSecurity(
//           zeroAddress,
//           defaultBytes,
//           BTCShortBytes,
//           BTCShortBytes,
//           currency,
//           signer.address,
//           signer.address,
//           encodedArray,
//           indiaBytes,
//           "false"
//         )
//         .then(async (res: any) => {
//           let hash = res.response.hash || "";
//           console.log(
//             "Issued Security successfully with transaction hash: ",
//             hash
//           );
//           assert.notEqual(hash.length, 0)
//         })
//         .catch((err: any) => {
//           console.error("IssueSecurity failed with error: ", err);
//           assert.equal(1, 0) //should fail test
//         });
//     });
//     it(`should add Balance(mint 100) security tokens to user's wallet `, async() => {
//       const securityIssued = "0x46247bd421989de3beec138f37db892c8adfdf9c"
//       await securityFactoryContract
//       .addBalance(
//         securityIssued,
//         zeroAddress,
//         signer.address,
//         "1000000000000000000000"
//       )
//       .then(async (res: any) => {
//         let addBalanceHash = res.response.hash || "";
//         console.log(
//           "Security Minted succesfully with hash: ",
//           addBalanceHash
//         );
//         assert.notEqual(addBalanceHash.length, 0)
//       })
//       .catch((err: any) => {
//         console.error("Mint security failed with error: ", err);
//         assert.equal(1, 0) //should fail test
//       });
//     })
//     it(`should test sending 1 security token from callers's wallet`, async () => {
//       const securityIssued = "0x46247bd421989de3beec138f37db892c8adfdf9c"
//           const securityContract = new Security(signer, securityIssued);
//           const receiverAddress = "0x286a759DACfd0C533B88E42b9e7571040008D778";
//           const amount = "1000000000000000000";
//             await securityContract
//             .transfer(receiverAddress, amount)
//             .then((res: any) => {
//               let transferHash = res.response.hash || "";
//               console.log("Transfer succesful with hash: ", transferHash);
//               assert.notEqual(transferHash, 0);
//             })
//             .catch((err: any) => {
//               console.error("Transfer failed with error: ", err);
//               assert.equal(1, 0) //should fail test
//             });
//     })
//   });
// });
