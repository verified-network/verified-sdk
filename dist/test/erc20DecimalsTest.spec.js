"use strict";
// import assert from 'assert';
// import { Provider } from "../utils/index";
// import { VerifiedWallet } from "../wallet/index";
// import { ERC20 } from "../index";
// describe("Test to check decimals function just added on ERC20", () => {
//   const INFURA_API_KEY = "e0951a7b82c84a6880f3c6f7bb182e21";        
//   const SIGNER_MNEMONICS =
//     "correct galaxy various swap chair assault blue improve ivory pear infant oak";
//   const sender = VerifiedWallet.importWallet(SIGNER_MNEMONICS);
//   const signer = sender.setProvider(Provider.infuraProvider(11155111, INFURA_API_KEY));
//   const currencyTokenAddress = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";  //usdc
//   const securityTokenAddress = "0xd67ab44e2b5Ed42559D9470bd367793f0eC183db";
//   describe("Sepolia Currency decimals test", () => {
//     const currencyContract = new ERC20(
//         signer,
//         currencyTokenAddress
//       );
//     it("call and return decimals", async () => {
//       const decimalsRes = await currencyContract.decimals();
//       console.log("decimals response: ", decimalsRes.response) //log response to better explain
//       assert(decimalsRes.status === 0) //check no error(s)
//     });
//   });
//   describe("Sepolia Security decimals test", () => {
//     const securityContract = new ERC20(
//         signer,
//         securityTokenAddress
//       );
//     it("call and return decimals", async () => {
//       const decimalsRes = await securityContract.decimals();
//       console.log("decimals response: ", decimalsRes.response) //log response to better explain
//       assert(decimalsRes.status === 0) //check no error(s)
//     });
//   });
// });
