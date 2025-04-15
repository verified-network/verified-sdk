"use strict";
// import assert from 'assert';
// import { Provider } from "../utils/index";
// import { VerifiedWallet } from "../wallet/index";
// import {Custody} from "../index";
// describe("Sepolia(11155111) Custody Gassless Tests", () => {
//   const INFURA_API_KEY =   "e0951a7b82c84a6880f3c6f7bb182e21"
//   const newWallet = VerifiedWallet.createWallet();
//   const provider = Provider.infuraProvider(11155111, INFURA_API_KEY)
//   const signer = newWallet.setProvider(provider);
//   console.log("signer: ", signer?._signingKey())
//   describe("Tests some functions on custody contract", () => {
//     const custodyAddress = "0x7aE9f79067AB4FDc8d41B18f1e6491590ac76f9d";
//     const custodyContract = new Custody(
//       signer,
//       custodyAddress
//     );
//     it("it should create vault", async () => {
//       const createVaultRes = await custodyContract.createVault(Date.now().toString(), Date.now().toString());
//       assert(createVaultRes?.status === 0);
//     })
//   });
// });
