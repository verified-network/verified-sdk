// import assert from "assert";
// import { Provider } from "../utils/index";
// import { VerifiedWallet } from "../wallet/index";
// import { Custody, ERC20 } from "../index";
// import { ethers } from "ethers";

// describe("Sepolia(11155111) Custody Tests", async () => {
//   const INFURA_API_KEY = "e0951a7b82c84a6880f3c6f7bb182e21";
//   describe("Tests vault creation, and check quorum", () => {
//     const custodyAddress = "0x3B3AD30e32fFef3dD598dd3EfDf6DCC392897786";
//     const custodyContract = new Custody(signer, custodyAddress);
//     it("it should create vault", async () => {
//       await custodyContract.createVault(creatorId).then(async (res: any) => {
//         assert(res?.status === 0);
//         //   const trueAny: any = true;
//         //   const confirmRes = await custodyContract.confirmParticipant(
//         //     creatorId,
//         //     vaultPin,
//         //     creatorId,
//         //     vaultPin,
//         //     trueAny
//         //   );
//         //   assert(confirmRes?.status === 0);
//         const defineQuorumRes0 = await custodyContract.defineQuorum(
//           creatorId,
//           "0",
//         );
//         console.log("quorum 0: ", defineQuorumRes0);
//         // assert(defineQuorumRes0?.status === 0);
//         const defineQuorumRes1 = await custodyContract.defineQuorum(
//           creatorId,
//           "1",
//         );
//         console.log("quorum 1: ", defineQuorumRes1);
//         // assert(defineQuorumRes1?.status === 0);
//         const defineQuorumRes1M = await custodyContract.defineQuorum(
//           creatorId,
//           "-1",
//         );
//         console.log("quorum -1: ", defineQuorumRes1M);
//         // assert(defineQuorumRes1M?.status === 0);
//       });
//     });
//     // it("it validate vault pin", async () => {
//     //   const getCreatorRes = await custodyContract.getCreator(
//     //     creatorId,
//     //     vaultPin
//     //   );
//     //   assert(getCreatorRes?.status === 0);
//     //   console.log("vault creator: ", getCreatorRes?.response?.result);
//     // });
//     //     it("it should reset/change vault pin", async () => {
//     //       await custodyContract
//     //         .resetPin(creatorId, vaultPin, newPin)
//     //         .then(async (res: any) => {
//     //           assert(res?.status === 0);
//     //           const trueAny: any = true;
//     //           const confirmRes = await custodyContract.confirmParticipant(
//     //             creatorId,
//     //             newPin,
//     //             creatorId,
//     //             newPin,
//     //             trueAny
//     //           );
//     //           assert(confirmRes?.status === 0);
//     //         });
//     //     });
//     //     it("it should validate with new vault pin", async () => {
//     //       const getCreatorRes = await custodyContract.getCreator(creatorId, newPin);
//     //       assert(getCreatorRes?.status === 0);
//     //       console.log("vault creator: ", getCreatorRes?.response?.result);
//     //     });
//     //     it("it should not validate with old vault pin", async () => {
//     //       const getCreatorRes = await custodyContract.getCreator(
//     //         creatorId,
//     //         vaultPin
//     //       );
//     //       assert(getCreatorRes?.status !== 0);
//     //       assert(getCreatorRes?.reason?.toLowerCase() === "invalid pin");
//     //     });
//     //     it("it should get quorum before defining quorum", async () => {
//     //       const getQuorumRes = await custodyContract.getQuorum(creatorId, newPin);
//     //       assert(getQuorumRes?.status === 0);
//     //       console.log("quorum before: ", getQuorumRes?.response?.result);
//     //     });
//     //     it("it should define quorum for 2 signers", async () => {
//     //       const defineQuorumRes = await custodyContract.defineQuorum(
//     //         creatorId,
//     //         newPin,
//     //         "2"
//     //       );
//     //       assert(defineQuorumRes?.status === 0);
//     //     });
//     //     it("it should get quorum after defining quorum for 2 signers", async () => {
//     //       const getQuorumRes = await custodyContract.getQuorum(creatorId, newPin);
//     //       console.log("quorum after 2 signers: ", getQuorumRes?.response?.result);
//     //       assert(getQuorumRes?.status === 0);
//     //       assert(Number(getQuorumRes?.response?.result[0]) === 2);
//     //     });
//     //     it("it should define quorum for 3 signers", async () => {
//     //       const defineQuorumRes = await custodyContract.defineQuorum(
//     //         creatorId,
//     //         newPin,
//     //         "3"
//     //       );
//     //       assert(defineQuorumRes?.status === 0);
//     //     });
//     //     it("it should get quorum after defining quorum for 3 signers", async () => {
//     //       const getQuorumRes = await custodyContract.getQuorum(creatorId, newPin);
//     //       console.log("quorum after 3 signers: ", getQuorumRes?.response?.result);
//     //       assert(getQuorumRes?.status === 0);
//     //       assert(Number(getQuorumRes?.response?.result[0]) === 3);
//     //     });
//   });
// });
