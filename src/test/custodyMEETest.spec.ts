// import assert from "assert";
// import { Provider } from "../utils/index";
// import { VerifiedWallet } from "../wallet/index";
// import { Custody, ERC20 } from "../index";
// import { ethers } from "ethers";

// describe("Base Sepolia() Custody MEE ERC20 Gas Payment Tests", () => {
//   const newWallet = VerifiedWallet.createWallet();
//   const provider = new Provider(
//     "https://eth-sepolia.g.alchemy.com/v2/NU7PIV1TOBJUvS8to-3VTQhxoloY3JjT",
//   );
//   const signer = newWallet.setProvider(provider);

//   describe("Tests some functions on custody contract", () => {
//     const custodyAddress = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";
//     const custodyContract = new Custody(signer, custodyAddress);
//     it("it should create vault", async () => {
//       const creatorId = ethers.utils.formatBytes32String("qq1aawe@gmail.com");
//       const createVaultRes = await custodyContract.getQuote(
//         "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
//         "approve",
//         ["0x554A8d7Ba257769665115Eac096a54B0Ee1cD44c", "10000"],
//       );
//       console.log(createVaultRes);
//       // const confirmVaultRes = await custodyContract.confirmParticipant(
//       //   creatorId,
//       //   creatorId,
//       //   true as any,
//       // );
//       // console.log(confirmVaultRes);
//       // const addVaultRes = await custodyContract.addParticipant(
//       //   creatorId,
//       //   creatorId,
//       //   "qmmm",
//       // );

//       // console.log(addVaultRes);

//       // const addOtherVaultRes = await custodyContract.addParticipant(
//       //   creatorId,
//       //   ethers.utils.formatBytes32String("qq2@gmail.com"),
//       //   "qmmme",
//       // );

//       // console.log(addOtherVaultRes);

//       // const quorumVaultRes = await custodyContract.defineQuorum(creatorId, "2");

//       // console.log(quorumVaultRes);
//     });
//   });
// });
