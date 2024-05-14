// import assert from 'assert';
// import { Provider } from "../utils/index";
// import { VerifiedWallet } from "../wallet/index";
// import { Liquidity, PrimaryIssueManager } from "../index";

// describe("Test to check new tempOutout fix on sepolia chain(11155111)", () => {
//   const INFURA_API_KEY = "e0951a7b82c84a6880f3c6f7bb182e21";        
//   const SIGNER_MNEMONICS =
//     "correct galaxy various swap chair assault blue improve ivory pear infant oak";
//   const sender = VerifiedWallet.importWallet(SIGNER_MNEMONICS);
//   const signer = sender.setProvider(Provider.infuraProvider(11155111, INFURA_API_KEY));
//   const liquidityContractAddress = "0x27006b68b3594EF5Ae04C5457c24F0c7CF1E5553";
//   const primaryManagerAddress = "0x41bB86106CC5156d915052c3a3EFb4be70Ec544E";
//   const currencyOffered = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238" //sepolia(11155111) USDC
//   //test using getSupportedTokens on liquidity contract and getOffered on primaryIssueManager contract due to dapp error
  
//   describe("getSupportedTokens Test", () => {
//     const liquidityContract = new Liquidity(
//         signer,
//         liquidityContractAddress
//       );
//     it("it call getSupportedTokens on liquidity contract and return response without error(s)", async () => {
//       const getSupportedTokenRes = await liquidityContract.getSupportedTokens();
//       console.log("get supported tokens response: ", getSupportedTokenRes.response) //log response to better explain
//       assert(getSupportedTokenRes.status === 0) //check no error(s)
//     });
//   });

//   describe("getOffered Test", () => {
//     const primarymanagerContract = new PrimaryIssueManager(signer, primaryManagerAddress, "balancer");
//     it("it call getOffered on balancer primaryissue manager contract and return response without error(s)", async () => {
//         const getOfferedRes = await primarymanagerContract.getOffered(currencyOffered);
//         console.log("get offered response: ", getOfferedRes.response.result) //log response
//         assert(getOfferedRes.status === 0) //check no error(s)
//     });

//   });
// });
