// import assert from "assert";
// import { Provider } from "../utils/index";
// import { VerifiedWallet } from "../wallet/index";
// import { Custody, ERC20 } from "../index";
// import { ethers } from "ethers";

// describe("Base Sepolia() Custody MEE ERC20 Gas Payment Tests", () => {
//   const newWallet = new VerifiedWallet(
//     "0xdcae180d539f8144535e4ed23903cdd338caaede740145b3e606ad007e1aeb9f"
//   );
//   const provider = new Provider("https://sepolia.base.org");
//   const signer = newWallet.setProvider(provider);

//   describe("Tests some functions on custody contract", () => {
//     const custodyAddress = "0xd942BF5772Ccd05B0a0a2a29D060bFA82FF4a031";
//     const custodyContract = new Custody(signer, custodyAddress);
//     it("it should create vault", async () => {
//       const createVaultRes = await custodyContract.createVault(
//    ethers.utils.formatBytes32String(Date.now().toString())
//         Date.now().toString(),
//         {
//           paymentToken: "0x036CbD53842c5426634e7929541eC2318f3dCF7e", // USDC
//         }
//       );
//       console.log("result: ", createVaultRes);
//       assert(createVaultRes.status === 0);
//     });
//   });
// });
