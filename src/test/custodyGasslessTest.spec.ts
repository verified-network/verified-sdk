// import assert from "assert";
// import { Provider } from "../utils/index";
// import { VerifiedWallet } from "../wallet/index";
// import { Custody } from "../index";

import { ethers } from "ethers";

// describe("Sepolia(11155111) Custody Tests", () => {
//   const INFURA_API_KEY = "e0951a7b82c84a6880f3c6f7bb182e21";
//   const newWallet = new VerifiedWallet(
//     "0xdcae180d539f8144535e4ed23903cdd338caaede740145b3e606ad007e1aeb9f"
//   );
//   const provider = Provider.infuraProvider(11155111, INFURA_API_KEY);
//   const signer = newWallet.setProvider(provider);
//   const creatorId = ethers.utils.formatBytes32String(Date.now()?.toString());
//   const vaultPin = "1111";
//   const newPin = "2222";

//   describe("Tests vault creation, reset pin and check quorum", () => {
//     const custodyAddress = "0x260A6Afc5a200b721D643CbeBD16d83833F4E0BB";
//     const custodyContract = new Custody(signer, custodyAddress);
//     it("it should create vault", async () => {
//       await custodyContract
//         .createVault(creatorId, vaultPin)
//         .then(async (res: any) => {
//           assert(res?.status === 0);
//           const trueAny: any = true;
//           const confirmRes = await custodyContract.confirmParticipant(
//             creatorId,
//             vaultPin,
//             creatorId,
//             vaultPin,
//             trueAny
//           );
//           assert(confirmRes?.status === 0);
//         });
//     });

// it("it validate vault pin", async () => {
//   const getCreatorRes = await custodyContract.getCreator(
//     creatorId,
//     vaultPin
//   );
//   assert(getCreatorRes?.status === 0);
//   console.log("vault creator: ", getCreatorRes?.response?.result);
// });

//     it("it should reset/change vault pin", async () => {
//       await custodyContract
//         .resetPin(creatorId, vaultPin, newPin)
//         .then(async (res: any) => {
//           assert(res?.status === 0);
//           const trueAny: any = true;
//           const confirmRes = await custodyContract.confirmParticipant(
//             creatorId,
//             newPin,
//             creatorId,
//             newPin,
//             trueAny
//           );
//           assert(confirmRes?.status === 0);
//         });
//     });

//     it("it should validate with new vault pin", async () => {
//       const getCreatorRes = await custodyContract.getCreator(creatorId, newPin);
//       assert(getCreatorRes?.status === 0);
//       console.log("vault creator: ", getCreatorRes?.response?.result);
//     });

//     it("it should not validate with old vault pin", async () => {
//       const getCreatorRes = await custodyContract.getCreator(
//         creatorId,
//         vaultPin
//       );
//       assert(getCreatorRes?.status !== 0);
//       assert(getCreatorRes?.reason?.toLowerCase() === "invalid pin");
//     });

//     it("it should get quorum before defining quorum", async () => {
//       const getQuorumRes = await custodyContract.getQuorum(creatorId, newPin);
//       assert(getQuorumRes?.status === 0);
//       console.log("quorum before: ", getQuorumRes?.response?.result);
//     });

//     it("it should define quorum for 2 signers", async () => {
//       const defineQuorumRes = await custodyContract.defineQuorum(
//         creatorId,
//         newPin,
//         "2"
//       );
//       assert(defineQuorumRes?.status === 0);
//     });

//     it("it should get quorum after defining quorum for 2 signers", async () => {
//       const getQuorumRes = await custodyContract.getQuorum(creatorId, newPin);
//       console.log("quorum after 2 signers: ", getQuorumRes?.response?.result);
//       assert(getQuorumRes?.status === 0);
//       assert(Number(getQuorumRes?.response?.result[0]) === 2);
//     });

//     it("it should define quorum for 3 signers", async () => {
//       const defineQuorumRes = await custodyContract.defineQuorum(
//         creatorId,
//         newPin,
//         "3"
//       );
//       assert(defineQuorumRes?.status === 0);
//     });

//     it("it should get quorum after defining quorum for 3 signers", async () => {
//       const getQuorumRes = await custodyContract.getQuorum(creatorId, newPin);
//       console.log("quorum after 3 signers: ", getQuorumRes?.response?.result);
//       assert(getQuorumRes?.status === 0);
//       assert(Number(getQuorumRes?.response?.result[0]) === 3);
//     });
//   });
// });
