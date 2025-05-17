// import assert from "assert";
// import { Provider } from "../utils/index";
// import { VerifiedWallet } from "../wallet/index";
// import { Custody } from "../index";

// describe("Base Sepolia() Custody Gassless Tests", () => {
//   const newWallet = VerifiedWallet.createWallet();
//   const provider = new Provider("https://sepolia.base.org");
//   const signer = newWallet.setProvider(provider);

//   describe("Tests some functions on custody contract", () => {
//     const custodyAddress = "0xB1ae3Fc5B16d3736bf0db20606fB9a10b435392c";
//     const custodyContract = new Custody(signer, custodyAddress);
//     it("it should create vault", async () => {
//       const createVaultRes = await custodyContract.createVault(
//         Date.now().toString(),
//         Date.now().toString(),
//         { gasLimit: 10, gasPrice: 5 }
//       );
//       console.log("result: ", createVaultRes);
//       assert(createVaultRes.status === 0);
//     });
//   });
// });
