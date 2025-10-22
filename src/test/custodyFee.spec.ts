// import assert from "assert";
// import { Provider } from "../utils/index";
// import { VerifiedWallet } from "../wallet/index";
// import { Custody, ERC20 } from "../index";
// import { ethers } from "ethers";
// import CUSTODY from "../abi/custody/Vault.json";
// import SECURITY from "../abi/securities/Security.json";
// import { AbiCoder } from "ethers/lib/utils";

// describe("Sepolia(11155111) Custody Fee Tests(Not Gasless)", () => {
//   const INFURA_API_KEY = "e0951a7b82c84a6880f3c6f7bb182e21";
//   //   const newWallet = VerifiedWallet.createWallet();
//   const provider = Provider.infuraProvider(11155111, INFURA_API_KEY);
//   const user = new VerifiedWallet(
//     "0x255a6cb953eeb165f35ed6c5f11dfda0bfe0729767e86716dbeb8ea0652b5663"
//   );
//   const userSigner = user.setProvider(provider);
//   const distributor = new VerifiedWallet(
//     "0xb4eba810619da531863b8a996bd5514be48b4b8e5f38042ed8bd88b9dd145a52"
//   );
//   const distributorSigner = distributor.setProvider(provider);

//   const user2 = new VerifiedWallet(
//     "0x255a6cb953eeb165f35ed6c5f11dfda0bfe0729767e86716dbeb8ea0652b5663"
//   );
//   const user2Signer = distributor.setProvider(provider);
//   describe("Tests some functions on custody contract", () => {
//     const custodyAddress = "0x1a14423c04eA34146F80becC00CC9408f9594671";
//     const usdcAddress = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";
//     const custodyContractUser = new Custody(userSigner, custodyAddress);
//     const custodyContractDistributor = new Custody(
//       distributorSigner,
//       custodyAddress
//     );
//     const usdcContractUser = new ERC20(userSigner, usdcAddress);
//     const usdcContractDistributor = new ERC20(distributorSigner, usdcAddress);
//     const userAddress = "0x6846E3f8b0edF1b1B9D727De0467cdE5BB704C89";
//     const distributorAddress = "0x19836182a3786CD592523cAB7445325be26c3334";
//     const startTime = Math.floor(Date.now() / 1000)?.toString();
//     const creatorId = Date.now()?.toString();
//     const creatorId2 = `${Date.now()?.toString()}test`;
//     const pin = "1111";
//     let genTx;

//     it("it should set distributor as admin", async () => {
//       //   await custodyContractDistributor
//       //     .setCustodyFee(`${Number(ethers.utils.parseEther("0.5"))}`)
//       //     .then((res: any) => {
//       //       assert(res?.status === 0);
//       //     });

//       const custodyEth = new ethers.Contract(
//         custodyAddress,
//         CUSTODY.abi,
//         distributorSigner
//       );
//       const tx = await custodyEth.setDistributor(distributorAddress);

//       const txRp = await tx.wait();

//       assert(txRp?.transactionHash?.length > 0);
//     });

//     it("it should set 50 custody fee.....", async () => {
//       //   await custodyContractDistributor
//       //     .setCustodyFee(`${Number(ethers.utils.parseEther("0.5"))}`)
//       //     .then((res: any) => {
//       //       assert(res?.status === 0);
//       //     });

//       const custodyEth = new ethers.Contract(
//         custodyAddress,
//         CUSTODY.abi,
//         distributorSigner
//       );
//       const tx = await custodyEth.setCustodyFee("100000000000000000000");

//       const txRp = await tx.wait();

//       assert(txRp?.transactionHash?.length > 0);
//     });

//     it("it should create vault for user", async () => {
//       const custodyEth = new ethers.Contract(
//         custodyAddress,
//         CUSTODY.abi,
//         userSigner
//       );

//       const crTx = await custodyEth.createVault(
//         ethers.utils.formatBytes32String(creatorId)
//       );
//       const crTxRp = await crTx.wait();

//       assert(crTxRp?.transactionHash?.length > 0);
//       const trueAny: any = true;
//       const coTx = await custodyEth.confirmParticipant(
//         ethers.utils.formatBytes32String(creatorId),
//         ethers.utils.formatBytes32String(creatorId),
//         trueAny
//       );
//       const coTxRp = await coTx.wait();
//       assert(coTxRp?.transactionHash?.length > 0);
//     });

//     // it("it add participant for  user", async () => {
//     //   const custodyEth = new ethers.Contract(
//     //     custodyAddress,
//     //     CUSTODY.abi,
//     //     userSigner
//     //   );
//     //   const coTx = await custodyEth.addParticipant(
//     //     ethers.utils.formatBytes32String(creatorId),
//     //     ethers.utils.formatBytes32String(creatorId),
//     //     ethers.utils.formatBytes32String("Text1")
//     //   );
//     //   const coTxRp = await coTx.wait();
//     //   assert(coTxRp?.transactionHash?.length > 0);
//     //   const coTx2 = await custodyEth.addParticipant(
//     //     ethers.utils.formatBytes32String(creatorId),
//     //     ethers.utils.formatBytes32String(creatorId2),
//     //     ethers.utils.formatBytes32String("Text2")
//     //   );
//     //   const coTx2Rp = await coTx2.wait();
//     //   assert(coTx2Rp?.transactionHash?.length > 0);
//     //   const coTx3 = await custodyEth.defineQuorum(
//     //     ethers.utils.formatBytes32String(creatorId),
//     //     "2"
//     //   );
//     //   const coTx3Rp = await coTx3.wait();
//     //   assert(coTx3Rp?.transactionHash?.length > 0);
//     // });

//     // it("it should create vault for user2 and accept invitation", async () => {
//     //   const custodyEth = new ethers.Contract(
//     //     custodyAddress,
//     //     CUSTODY.abi,
//     //     distributorSigner
//     //   );
//     //   const crTx = await custodyEth.createVault(
//     //     ethers.utils.formatBytes32String(creatorId2)
//     //   );
//     //   const crTxRp = await crTx.wait();

//     //   assert(crTxRp?.transactionHash?.length > 0);
//     //   const trueAny: any = true;
//     //   const coTx = await custodyEth.confirmParticipant(
//     //     ethers.utils.formatBytes32String(creatorId2),
//     //     ethers.utils.formatBytes32String(creatorId2),
//     //     trueAny
//     //   );
//     //   const coTxRp = await coTx.wait();
//     //   assert(coTxRp?.transactionHash?.length > 0);

//     //   const coTx2 = await custodyEth.confirmParticipant(
//     //     ethers.utils.formatBytes32String(creatorId),
//     //     ethers.utils.formatBytes32String(creatorId2),
//     //     trueAny
//     //   );
//     //   const coTx2Rp = await coTx2.wait();
//     //   assert(coTx2Rp?.transactionHash?.length > 0);
//     // });

//     // // it("it try recover saved text", async () => {
//     // //   const custodyEth = new ethers.Contract(
//     // //     custodyAddress,
//     // //     CUSTODY.abi,
//     // //     userSigner
//     // //   );
//     // //   const custodyEthDis = new ethers.Contract(
//     // //     custodyAddress,
//     // //     CUSTODY.abi,
//     // //     distributorSigner
//     // //   );
//     // //   const crTx = await custodyEth.promptSignatures(
//     // //     ethers.utils.formatBytes32String(creatorId)
//     // //   );
//     // //   const crTxRp = await crTx.wait();

//     // //   assert(crTxRp?.transactionHash?.length > 0);

//     // //   //   console.log("logs: ", crTxRp?.logs);

//     // //   const vaultLogs = crTxRp?.logs?.filter(
//     // //     (log: any) =>
//     // //       log?.address?.toLowerCase() === custodyAddress?.toLowerCase() &&
//     // //       log?.topics
//     // //         ?.map((tp: string) => tp?.toLowerCase())
//     // //         ?.includes(
//     // //           "0x7f8d3f14b960b3bcf34baea4b46178e331b54a33e565d7d50d77cdfe9e926fe8"?.toLowerCase()
//     // //         )
//     // //   );
//     // //   const txData = vaultLogs[0]?.data;
//     // //   const abiCoder = new AbiCoder();
//     // //   const decodedTxData = abiCoder
//     // //     .decode(["bytes32", "bytes32", "uint256"], txData)
//     // //     ?.map((val, idx) => (idx < 2 ? val : Number(val)))
//     // //     .flat();
//     // //   const txId = decodedTxData[decodedTxData?.length - 1];

//     // //   console.log("txId: ", txId);

//     // //   const crTxSg = await custodyEth.signTransaction(
//     // //     ethers.utils.formatBytes32String(creatorId),
//     // //     ethers.utils.formatBytes32String(creatorId),
//     // //     txId
//     // //   );

//     // //   const crTxSgRp = await crTxSg.wait().catch((err: any) => {
//     // //     console.log("sign for creator failed: ", err);
//     // //   });

//     // //   assert(crTxSgRp?.transactionHash?.length > 0);

//     // //   console.log("tx1: ", crTxSgRp?.transactionHash);

//     // //   const crTxSg1 = await custodyEthDis.signTransaction(
//     // //     ethers.utils.formatBytes32String(creatorId),
//     // //     ethers.utils.formatBytes32String(creatorId2),
//     // //     txId
//     // //   );
//     // //   const crTxSgRp1 = await crTxSg1.wait();

//     // //   assert(crTxSgRp1?.transactionHash?.length > 0);

//     // //   console.log("tx1: ", crTxSgRp1?.transactionHash);

//     // //   //   const crTxl = await custodyEth.cleanTx(
//     // //   //     ethers.utils.formatBytes32String(creatorId),
//     // //   //     txId
//     // //   //   );
//     // //   //   const crTxlRp = await crTxl.wait();

//     // //   //   assert(crTxlRp?.transactionHash?.length > 0);

//     // //   const qxTx = await custodyEth.checkQuorum(
//     // //     ethers.utils.formatBytes32String(creatorId),
//     // //     txId
//     // //   );

//     // //   console.log("quorum res: ", qxTx);

//     // //   const shTx = await custodyEth.getShards(
//     // //     ethers.utils.formatBytes32String(creatorId),
//     // //     txId
//     // //   );
//     // //   console.log("shards res: ", shTx);
//     // //   //   const trueAny: any = true;
//     // //   //   const coTx = await custodyEth.confirmParticipant(
//     // //   //     ethers.utils.formatBytes32String(creatorId2),
//     // //   //     ethers.utils.formatBytes32String(creatorId2),
//     // //   //     trueAny
//     // //   //   );
//     // //   //   await coTx.wait();
//     // //   //   assert(coTx?.transactionHash?.length > 0);

//     // //   //   const coTx2 = await custodyEth.confirmParticipant(
//     // //   //     ethers.utils.formatBytes32String(creatorId),
//     // //   //     ethers.utils.formatBytes32String(creatorId2),
//     // //   //     trueAny
//     // //   //   );
//     // //   //   await coTx2.wait();
//     // //   //   assert(coTx2?.transactionHash?.length > 0);
//     // // });

//     // it("it try recover saved text", async () => {
//     //   // const custodyEth = new ethers.Contract(
//     //   //   custodyAddress,
//     //   //   CUSTODY.abi,
//     //   //   user2Signer
//     //   // );

//     //   const custodyEthDis = new ethers.Contract(
//     //     custodyAddress,
//     //     CUSTODY.abi,
//     //     userSigner
//     //   );

//     //   const crTx = await custodyEthDis.promptSignatures(
//     //     ethers.utils.formatBytes32String(creatorId)
//     //   );
//     //   const crTxRp = await crTx.wait();

//     //   console.log("otherrrrr prompt: ", crTxRp?.transactionHash);

//     //   const vaultLogs = crTxRp?.logs?.filter(
//     //     (log: any) =>
//     //       log?.address?.toLowerCase() === custodyAddress?.toLowerCase() &&
//     //       log?.topics
//     //         ?.map((tp: string) => tp?.toLowerCase())
//     //         ?.includes(
//     //           "0x7f8d3f14b960b3bcf34baea4b46178e331b54a33e565d7d50d77cdfe9e926fe8"?.toLowerCase()
//     //         )
//     //   );
//     //   const txData = vaultLogs[0]?.data;
//     //   const abiCoder = new AbiCoder();
//     //   const decodedTxData = abiCoder
//     //     .decode(["bytes32", "bytes32", "uint256"], txData)
//     //     ?.map((val, idx) => (idx < 2 ? val : Number(val)))
//     //     .flat();
//     //   const txId = decodedTxData[decodedTxData?.length - 1];

//     //   console.log("txId: ", txId);

//     //   genTx = txId;

//     //   const crTxSg = await custodyEthDis.signTransaction(
//     //     ethers.utils.formatBytes32String(creatorId),
//     //     ethers.utils.formatBytes32String(creatorId),
//     //     txId
//     //   );

//     //   const crTxSgRp = await crTxSg.wait();

//     //   console.log("other tx1: ", crTxSgRp?.transactionHash);

//     //   const crTxSg1 = await custodyEthDis.signTransaction(
//     //     ethers.utils.formatBytes32String(creatorId),
//     //     ethers.utils.formatBytes32String(creatorId2),
//     //     txId
//     //   );
//     //   const crTxSgRp1 = await crTxSg1.wait();

//     //   console.log("other tx2: ", crTxSgRp1?.transactionHash);

//     //   const qxTx = await custodyEthDis.checkQuorum(
//     //     ethers.utils.formatBytes32String(creatorId),
//     //     txId
//     //   );

//     //   console.log("quorum res: ", qxTx);

//     //   const shTx = await custodyEthDis.getShards(
//     //     ethers.utils.formatBytes32String(creatorId),
//     //     txId
//     //   );
//     //   console.log("shards res: ", shTx);

//     //   const crTxl = await custodyEthDis.cleanTx(
//     //     ethers.utils.formatBytes32String(creatorId),
//     //     txId
//     //   );
//     //   const crTxlRp = await crTxl.wait();

//     //   assert(crTxlRp?.transactionHash?.length > 0);

//     //   const shTxAf = await custodyEthDis.getShards(
//     //     ethers.utils.formatBytes32String(creatorId),
//     //     txId
//     //   );
//     //   console.log("shards after res: ", shTxAf);

//     //   // const qxTxD = await custodyEthDis.checkQuorum(
//     //   //   ethers.utils.formatBytes32String(creatorId),
//     //   //   txId
//     //   // );

//     //   // console.log("quorum res: ", qxTxD);

//     //   // const shTxD = await custodyEthDis.getShards(
//     //   //   ethers.utils.formatBytes32String(creatorId),
//     //   //   txId
//     //   // );
//     //   // console.log("shards res: ", shTxD);
//     //   //   const trueAny: any = true;
//     //   //   const coTx = await custodyEth.confirmParticipant(
//     //   //     ethers.utils.formatBytes32String(creatorId2),
//     //   //     ethers.utils.formatBytes32String(creatorId2),
//     //   //     trueAny
//     //   //   );
//     //   //   await coTx.wait();
//     //   //   assert(coTx?.transactionHash?.length > 0);

//     //   //   const coTx2 = await custodyEth.confirmParticipant(
//     //   //     ethers.utils.formatBytes32String(creatorId),
//     //   //     ethers.utils.formatBytes32String(creatorId2),
//     //   //     trueAny
//     //   //   );
//     //   //   await coTx2.wait();
//     //   //   assert(coTx2?.transactionHash?.length > 0);
//     // });

//     // it("it try remove participant", async () => {
//     //   const custodyEth = new ethers.Contract(
//     //     custodyAddress,
//     //     CUSTODY.abi,
//     //     user2Signer
//     //   );

//     //   const crTx = await custodyEth.removeParticipant(
//     //     ethers.utils.formatBytes32String(creatorId),
//     //     ethers.utils.formatBytes32String(creatorId2)
//     //   );
//     //   const crTxRp = await crTx.wait();

//     //   console.log("failed rm: ", crTxRp);
//     // });

//     // it("it try remove participant", async () => {
//     //   const custodyEth = new ethers.Contract(
//     //     custodyAddress,
//     //     CUSTODY.abi,
//     //     userSigner
//     //   );

//     //   const crTx = await custodyEth.removeParticipant(
//     //     ethers.utils.formatBytes32String(creatorId),
//     //     ethers.utils.formatBytes32String(creatorId2)
//     //   );
//     //   const crTxRp = await crTx.wait();

//     //   console.log("failed rm: ", crTxRp);

//     //   assert(crTxRp?.transactionHash?.length > 0);
//     // });

//     // it("it try transfer vault", async () => {
//     //   const custodyEth = new ethers.Contract(
//     //     custodyAddress,
//     //     CUSTODY.abi,
//     //     userSigner
//     //   );

//     //   const crTx = await custodyEth.transferVault(
//     //     ethers.utils.formatBytes32String(creatorId),
//     //     distributorAddress
//     //   );
//     //   const crTxRp = await crTx.wait();

//     //   console.log("failed rm: ", crTxRp);

//     //   assert(crTxRp?.transactionHash?.length > 0);
//     // });

//     // it("it try addParticipant from old owner", async () => {
//     //   const custodyEth = new ethers.Contract(
//     //     custodyAddress,
//     //     CUSTODY.abi,
//     //     userSigner
//     //   );
//     //   const coTx = await custodyEth.addParticipant(
//     //     ethers.utils.formatBytes32String(creatorId),
//     //     ethers.utils.formatBytes32String(Date.now()?.toString()),
//     //     "Text3"
//     //   );
//     //   const coTxRp = await coTx.wait();
//     //   console.log("failed add: ", coTxRp);
//     // });

//     // it("it try addParticipant from new owner", async () => {
//     //   const custodyEth = new ethers.Contract(
//     //     custodyAddress,
//     //     CUSTODY.abi,
//     //     distributorSigner
//     //   );
//     //   const coTx = await custodyEth.addParticipant(
//     //     ethers.utils.formatBytes32String(creatorId),
//     //     ethers.utils.formatBytes32String(Date.now()?.toString()),
//     //     "Text3"
//     //   );
//     //   const coTxRp = await coTx.wait();
//     //   assert(coTxRp?.transactionHash?.length > 0);
//     //   console.log("not failed add: ", coTxRp);
//     // });

//     it("it should log USDC balances before starting.....", async () => {
//       const distributorBalance = await usdcContractDistributor.balanceOf(
//         distributorAddress
//       );
//       const userBalance = await usdcContractUser.balanceOf(userAddress);
//       const custodyBalance = await usdcContractDistributor.balanceOf(
//         custodyAddress
//       );
//       console.log(
//         "Distributor USDC balance before...: ",
//         Number(distributorBalance?.response?.result[0])
//       );

//       console.log(
//         "User USDC balance before...: ",
//         Number(userBalance?.response?.result[0])
//       );

//       console.log(
//         "Custody USDC balance before...: ",
//         Number(custodyBalance?.response?.result[0])
//       );
//     });

//     it("it should take user's snapshot.....", async () => {
//       const custodyEth = new ethers.Contract(
//         custodyAddress,
//         CUSTODY.abi,
//         user2Signer
//       );
//       const tx = await custodyEth.snapshotBalance(
//         ethers.utils.formatBytes32String(creatorId),
//         usdcAddress
//       );

//       const txRp = await tx.wait();
//       console.log(
//         "first snapshot time is : ",
//         Math.floor(Date.now() / 1000)?.toString()
//       );

//       //   console.log("hash: ", tx?.hash);

//       assert(txRp?.transactionHash?.length > 0);
//     });

//     it("it should take user's snapshot after 10 minute.....", async () => {
//       // await new Promise((resolve) => setTimeout(resolve, 100 * 1000));
//       const usdcContractUserEth = new ethers.Contract(
//         usdcAddress,
//         SECURITY.abi,
//         user2Signer
//       );
//       const tx1 = await usdcContractUserEth.approve(
//         custodyAddress,
//         "10000000000000000000000000000000"
//       );
//       const tx1Rp = await tx1.wait();

//       assert(tx1Rp?.transactionHash?.length > 0);

//       const tx2 = await usdcContractUserEth.approve(
//         custodyAddress,
//         "10000000000000000000000000000000"
//       );
//       const tx2Rp = await tx2.wait();

//       assert(tx2Rp?.transactionHash?.length > 0);

//       const custodyEth = new ethers.Contract(
//         custodyAddress,
//         CUSTODY.abi,
//         user2Signer
//       );
//       const tx = await custodyEth.snapshotBalance(
//         ethers.utils.formatBytes32String(creatorId),
//         usdcAddress
//       );

//       const txRp = await tx.wait();

//       console.log(
//         "second snapshot time is : ",
//         Math.floor(Date.now() / 1000)?.toString()
//       );

//       assert(txRp?.transactionHash?.length > 0);
//     });

//     // it("it should take user's snapshot.....", async () => {
//     //   const usdcContractUserEth = new ethers.Contract(
//     //     usdcAddress,
//     //     SECURITY.abi,
//     //     userSigner
//     //   );
//     //   const tx1 = await usdcContractUserEth.approve(
//     //     custodyAddress,
//     //     "10000000000000000000000000000000"
//     //   );
//     //   const tx1Rp = await tx1.wait();

//     //   assert(tx1Rp?.transactionHash?.length > 0);

//     //   const tx2 = await usdcContractUserEth.approve(
//     //     custodyAddress,
//     //     "10000000000000000000000000000000"
//     //   );
//     //   const tx2Rp = await tx2.wait();

//     //   assert(tx2Rp?.transactionHash?.length > 0);

//     //   const custodyEth = new ethers.Contract(
//     //     custodyAddress,
//     //     CUSTODY.abi,
//     //     userSigner
//     //   );
//     //   const tx = await custodyEth.snapshotBalance(
//     //     ethers.utils.formatBytes32String(creatorId),
//     //     usdcAddress
//     //   );

//     //   const txRp = await tx.wait();

//     //   //   console.log("hash: ", tx?.hash);

//     //   assert(txRp?.transactionHash?.length > 0);
//     // });

//     // it("it should take user's snapshot.....", async () => {
//     //   const usdcContractUserEth = new ethers.Contract(
//     //     usdcAddress,
//     //     SECURITY.abi,
//     //     userSigner
//     //   );
//     //   const tx1 = await usdcContractUserEth.approve(
//     //     custodyAddress,
//     //     "10000000000000000000000000000000"
//     //   );
//     //   const tx1Rp = await tx1.wait();

//     //   assert(tx1Rp?.transactionHash?.length > 0);

//     //   const tx2 = await usdcContractUserEth.approve(
//     //     custodyAddress,
//     //     "10000000000000000000000000000000"
//     //   );
//     //   const tx2Rp = await tx2.wait();

//     //   assert(tx2Rp?.transactionHash?.length > 0);

//     //   const custodyEth = new ethers.Contract(
//     //     custodyAddress,
//     //     CUSTODY.abi,
//     //     userSigner
//     //   );
//     //   const tx = await custodyEth.snapshotBalance(
//     //     ethers.utils.formatBytes32String(creatorId),
//     //     usdcAddress
//     //   );

//     //   const txRp = await tx.wait();

//     //   //   console.log("hash: ", tx?.hash);

//     //   assert(txRp?.transactionHash?.length > 0);
//     // });

//     // it("it should take user's snapshot.....", async () => {
//     //   const usdcContractUserEth = new ethers.Contract(
//     //     usdcAddress,
//     //     SECURITY.abi,
//     //     userSigner
//     //   );
//     //   const tx1 = await usdcContractUserEth.approve(
//     //     custodyAddress,
//     //     "10000000000000000000000000000000"
//     //   );
//     //   const tx1Rp = await tx1.wait();

//     //   assert(tx1Rp?.transactionHash?.length > 0);

//     //   const tx2 = await usdcContractUserEth.approve(
//     //     custodyAddress,
//     //     "10000000000000000000000000000000"
//     //   );
//     //   const tx2Rp = await tx2.wait();

//     //   assert(tx2Rp?.transactionHash?.length > 0);

//     //   const custodyEth = new ethers.Contract(
//     //     custodyAddress,
//     //     CUSTODY.abi,
//     //     userSigner
//     //   );
//     //   const tx = await custodyEth.snapshotBalance(
//     //     ethers.utils.formatBytes32String(creatorId),
//     //     usdcAddress
//     //   );

//     //   const txRp = await tx.wait();

//     //   //   console.log("hash: ", tx?.hash);

//     //   assert(txRp?.transactionHash?.length > 0);
//     // });

//     it("it should calculate user average balance.....", async () => {
//       const usdcContractUserEth = new ethers.Contract(
//         usdcAddress,
//         SECURITY.abi,
//         user2Signer
//       );
//       const tx1 = await usdcContractUserEth.approve(
//         custodyAddress,
//         "10000000000000000000000000000000000000"
//       );
//       const tx1Rp = await tx1.wait();

//       //   console.log("tx: ", tx, tx?.hash);

//       assert(tx1Rp?.transactionHash?.length > 0);

//       const custodyEth = new ethers.Contract(
//         custodyAddress,
//         CUSTODY.abi,
//         user2Signer
//       );
//       const tx = await custodyEth.calculateAverageBalance(
//         ethers.utils.formatBytes32String(creatorId),
//         usdcAddress
//       );
//       const txRp = await tx.wait();

//       console.log(
//         "average balance calculation time is : ",
//         Math.floor(Date.now() / 1000)?.toString()
//       );

//       assert(txRp?.transactionHash?.length > 0);
//     });

//     it("it should try  to collect USDC custody fee after 4 usdc approvals, taking user snapshot(5) and calculating average balance.....", async () => {
//       //   await custodyContractDistributor
//       //     .collectCustodyFee(usdcAddress)
//       //     .then((res: any) => {
//       //       assert(res?.status === 0);
//       //       console.log("collect fee returns...: ", res?.response?.result);
//       //     });

//       const custodyEth = new ethers.Contract(
//         custodyAddress,
//         CUSTODY.abi,
//         distributorSigner
//       );
//       const tx = await custodyEth.collectCustodyFee(usdcAddress);

//       const txRp = await tx.wait();

//       assert(txRp?.transactionHash?.length > 0);
//     });

//     it("it should log USDC balances after first collect fee.....", async () => {
//       const distributorBalance = await usdcContractDistributor.balanceOf(
//         distributorAddress
//       );
//       const userBalance = await usdcContractUser.balanceOf(userAddress);
//       const custodyBalance = await usdcContractDistributor.balanceOf(
//         custodyAddress
//       );
//       console.log(
//         "Distributor USDC balance before...: ",
//         Number(distributorBalance?.response?.result[0])
//       );

//       console.log(
//         "User USDC balance before...: ",
//         Number(userBalance?.response?.result[0])
//       );

//       console.log(
//         "Custody USDC balance before...: ",
//         Number(custodyBalance?.response?.result[0])
//       );
//     });
//   });
// });
