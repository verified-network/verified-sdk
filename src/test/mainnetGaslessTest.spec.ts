// import assert from 'assert';
// import { Provider } from "../utils/index";
// import { VerifiedWallet } from "../wallet/index";
// import {Client, Custody} from "../index";


// describe("Ethereum Mainnet Client Gassless Tests", () => {   
//   const newWallet = new VerifiedWallet("0x09fe6efb430044937f419b26883382ff3c8d82e356ff48ddb7456fe98589872a");
//   const provider = new Provider("https://rpc.sepolia.org");
//   const signer = newWallet.setProvider(provider);
 
//   describe("Tests some functions on custody contract", () => {
//     const custodyAddress = "0xeEa4F0C03fAb166Aa20f38A2747469084cB769d0";
//     const custodyContract = new Client(
//       signer,
//       custodyAddress
//     );
//     it("it update KYC for Signer", async () => {
//       const kycUpdate = await custodyContract.fullKycUpdate(signer.address, "Oracle Signer", "", "");
//       console.log("result: ", kycUpdate)
//       assert(kycUpdate.status === 0);
//       await custodyContract.getFullClientKYC(signer.address).then((res: any) => {
//         console.log("full kyc: ", res)
//       })
//     })

//   });
// });
