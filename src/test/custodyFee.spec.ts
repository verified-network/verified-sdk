// import assert from "assert";
// import { Provider } from "../utils/index";
// import { VerifiedWallet } from "../wallet/index";
// import { Custody, ERC20 } from "../index";
// import { ethers } from "ethers";
// import CUSTODY from "../abi/custody/Vault.json";

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
//   describe("Tests some functions on custody contract", () => {
//     const custodyAddress = "0x1F97Bd2c4D3b42a87B225dd7990F4a13f1CF8760";
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
//     const pin = "1111";
//     console.log("StartTime is : ", startTime);

//     it("it should create vault for user", async () => {
//       const custodyEth = new ethers.Contract(
//         custodyAddress,
//         CUSTODY.abi,
//         userSigner
//       );
//       const crTx = await custodyEth.createVault(
//         ethers.utils.formatBytes32String(creatorId),
//         pin
//       );
//       await crTx.wait();

//       assert(crTx?.hash?.length > 0);
//       const trueAny: any = true;
//       const coTx = await custodyEth.confirmParticipant(
//         ethers.utils.formatBytes32String(creatorId),
//         pin,
//         ethers.utils.formatBytes32String(creatorId),
//         pin,
//         trueAny
//       );
//       assert(coTx?.hash?.length > 0);
//     });

//     // it("it should log USDC balances before starting.....", async () => {
//     //   const distributorBalance = await usdcContractDistributor.balanceOf(
//     //     distributorAddress
//     //   );
//     //   const userBalance = await usdcContractUser.balanceOf(userAddress);
//     //   const custodyBalance = await usdcContractDistributor.balanceOf(
//     //     custodyAddress
//     //   );
//     //   console.log(
//     //     "Distributor USDC balance before...: ",
//     //     Number(distributorBalance?.response?.result[0])
//     //   );

//     //   console.log(
//     //     "User USDC balance before...: ",
//     //     Number(userBalance?.response?.result[0])
//     //   );

//     //   console.log(
//     //     "Custody USDC balance before...: ",
//     //     Number(custodyBalance?.response?.result[0])
//     //   );
//     // });

//     // it("it should set 0.5 custody fee.....", async () => {
//     //   await custodyContractDistributor
//     //     .setCustodyFee(`${Number(ethers.utils.parseEther("0.5"))}`)
//     //     .then((res: any) => {
//     //       assert(res?.status === 0);
//     //     });

//     //   // const custodyEth = new ethers.Contract(
//     //   //   custodyAddress,
//     //   //   CUSTODY.abi,
//     //   //   distributorSigner
//     //   // );
//     //   // const tx = await custodyEth.setCustodyFee(
//     //   //   Number(ethers.utils.parseEther("0.5"))
//     //   // );

//     //   // await tx.wait();

//     //   // assert(tx?.hash?.length > 0);
//     // });
//     // it("it should calculate user average balance from startTime to now with only one snapshot taken.....", async () => {
//     //   await usdcContractUser
//     //     .approve(custodyAddress, "10000000000000000000000000000000")
//     //     .then(async (res: any) => {
//     //       console.log("approval res: ", res);
//     //       assert(res?.status === 0);

//     //       const nowTime = Math.floor(Date.now() / 1000);
//     //       console.log(
//     //         "difference between now and startime: ",
//     //         Number(nowTime) - Number(startTime)
//     //       );

//     //       const custodyEth = new ethers.Contract(
//     //         custodyAddress,
//     //         CUSTODY.abi,
//     //         userSigner
//     //       );
//     //       const tx = await custodyEth.calculateAverageBalance(
//     //         ethers.utils.formatBytes32String(creatorId),
//     //         pin,
//     //         usdcAddress,
//     //         Number(startTime),
//     //         Number(nowTime)
//     //       );
//     //       await tx.wait();

//     //       console.log("tx: ", tx, tx?.hash);

//     //       assert(tx?.hash?.length > 0);

//     //       // await usdcContractUser
//     //       //   .approve(custodyAddress, "23989897")
//     //       //   .then(async (_res: any) => {
//     //       //     assert(_res?.status === 0);
//     //       //     const nowTime = Math.floor(Date.now() / 1000);
//     //       //     console.log(
//     //       //       "difference between now and startime: ",
//     //       //       Number(nowTime) - Number(startTime)
//     //       //     );

//     //       //     const custodyEth = new ethers.Contract(
//     //       //       custodyAddress,
//     //       //       CUSTODY.abi,
//     //       //       userSigner
//     //       //     );
//     //       //     const tx = await custodyEth.calculateAverageBalance(
//     //       //       ethers.utils.formatBytes32String(creatorId),
//     //       //       pin,
//     //       //       usdcAddress,
//     //       //       Number(startTime),
//     //       //       Number(nowTime)
//     //       //     );
//     //       //     await tx.wait();

//     //       //     assert(tx?.hash?.length > 0);
//     //       //   });
//     //     });
//     // });

//     it("it should try  to collect USDC custody fee before taking user snapshot and calculating balance.....", async () => {
//       await custodyContractDistributor
//         .collectCustodyFee(usdcAddress)
//         .then((res: any) => {
//           assert(res?.status === 0);
//           console.log("collect fee returns...: ", res?.response?.result);
//         });
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

//     it("it should take user's snapshot.....", async () => {
//       const custodyEth = new ethers.Contract(
//         custodyAddress,
//         CUSTODY.abi,
//         userSigner
//       );
//       const tx = await custodyEth.snapshotBalance(
//         ethers.utils.formatBytes32String(creatorId),
//         pin,
//         usdcAddress
//       );

//       await tx.wait();

//       console.log("hash: ", tx?.hash);

//       assert(tx?.hash?.length > 0);
//     });

//     it("it should try  to collect USDC custody fee after user snapshots are taken.....", async () => {
//       await custodyContractDistributor
//         .collectCustodyFee(usdcAddress)
//         .then((res: any) => {
//           assert(res?.status === 0);
//           console.log("collect fee returns...: ", res?.response?.result);
//         });
//     });

//     it("it should log USDC balances after second collect fee.....", async () => {
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

//     it("it should calculate user average balance from startTime to now with only one snapshot taken.....", async () => {
//       await usdcContractUser
//         .approve(custodyAddress, "10000000000000000000000000000000")
//         .then(async (res: any) => {
//           console.log("approval res: ", res);
//           assert(res?.status === 0);

//           const nowTime = Math.floor(Date.now() / 1000);
//           console.log(
//             "difference between now and startime: ",
//             Number(nowTime) - Number(startTime)
//           );

//           const custodyEth = new ethers.Contract(
//             custodyAddress,
//             CUSTODY.abi,
//             userSigner
//           );
//           const tx = await custodyEth.calculateAverageBalance(
//             ethers.utils.formatBytes32String(creatorId),
//             pin,
//             usdcAddress,
//             Number(startTime),
//             Number(nowTime)
//           );
//           await tx.wait();

//           console.log("hash: ", tx?.hash);

//           assert(tx?.hash?.length > 0);

//           // await usdcContractUser
//           //   .approve(custodyAddress, "23989897")
//           //   .then(async (_res: any) => {
//           //     assert(_res?.status === 0);
//           //     const nowTime = Math.floor(Date.now() / 1000);
//           //     console.log(
//           //       "difference between now and startime: ",
//           //       Number(nowTime) - Number(startTime)
//           //     );

//           //     const custodyEth = new ethers.Contract(
//           //       custodyAddress,
//           //       CUSTODY.abi,
//           //       userSigner
//           //     );
//           //     const tx = await custodyEth.calculateAverageBalance(
//           //       ethers.utils.formatBytes32String(creatorId),
//           //       pin,
//           //       usdcAddress,
//           //       Number(startTime),
//           //       Number(nowTime)
//           //     );
//           //     await tx.wait();

//           //     assert(tx?.hash?.length > 0);
//           //   });
//         });
//     });

//     it("it should try  to collect USDC custody fee after average balance is calculated for only 1 snapshot.....", async () => {
//       await custodyContractDistributor
//         .collectCustodyFee(usdcAddress)
//         .then((res: any) => {
//           assert(res?.status === 0);
//           console.log("collect fee returns...: ", res?.response?.result);
//         });
//     });

//     it("it should log USDC balances after third collect fee.....", async () => {
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

//     it("it should take second user's snapshot.....", async () => {
//       const custodyEth = new ethers.Contract(
//         custodyAddress,
//         CUSTODY.abi,
//         userSigner
//       );
//       const tx = await custodyEth.snapshotBalance(
//         ethers.utils.formatBytes32String(creatorId),
//         pin,
//         usdcAddress
//       );

//       await tx.wait();

//       assert(tx?.hash?.length > 0);
//     });

//     it("it should calculate user average balance from startTime to now with only two snapshots taken.....", async () => {
//       await usdcContractUser
//         .approve(custodyAddress, "10000000000000000000000000000000")
//         .then(async (res: any) => {
//           console.log("approval res: ", res);
//           assert(res?.status === 0);

//           const nowTime = Math.floor(Date.now() / 1000);
//           console.log(
//             "difference between now and startime: ",
//             Number(nowTime) - Number(startTime)
//           );

//           const custodyEth = new ethers.Contract(
//             custodyAddress,
//             CUSTODY.abi,
//             userSigner
//           );
//           const tx = await custodyEth.calculateAverageBalance(
//             ethers.utils.formatBytes32String(creatorId),
//             pin,
//             usdcAddress,
//             Number(startTime),
//             Number(nowTime)
//           );
//           await tx.wait();

//           assert(tx?.hash?.length > 0);
//         });
//     });

//     it("it should try  to collect USDC custody fee after average balance is calculated for only 2 snapshots.....", async () => {
//       await custodyContractDistributor
//         .collectCustodyFee(usdcAddress)
//         .then((res: any) => {
//           assert(res?.status === 0);
//           console.log("collect fee returns...: ", res?.response?.result);
//         });
//     });

//     it("it should log USDC balances after fourth collect fee.....", async () => {
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
