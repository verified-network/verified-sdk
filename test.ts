import {ethers} from 'ethers'
import {Presets,Client, UserOperationMiddlewareFn, IUserOperation, BundlerJsonRpcProvider} from 'userop';
// Only for testing
const signingKey ='a6645c57b516720cc218e98a645887d59fa53b3e1e08fed0c58de17b3589b799';
const rpcUrl = "https://api.stackup.sh/v1/node/a6645c57b516720cc218e98a645887d59fa53b3e1e08fed0c58de17b3589b799";
const paymasterUrl = 'https://api.stackup.sh/v1/paymaster/a6645c57b516720cc218e98a645887d59fa53b3e1e08fed0c58de17b3589b799';

import {VerifiedWallet, Provider} from './src';

(async()=>{
  let mnemonics = await VerifiedWallet.generateMnemonic()
  let wallet = await VerifiedWallet.importWallet(mnemonics);
  console.log('wallet',wallet.address)
const rpcUrl = 'ropsten' // or any other network of your choice.
let walletWithProvider = wallet.setProvider(
    Provider.stackUpProvider(rpcUrl)
)


// Define the kind of paymaster you want to use. If you do not want to use a paymaster,
  // comment out these lines.
//   const paymasterContext = { type: "payg" };
//   const paymasterMiddleware = Presets.Middleware.verifyingPaymaster(
//     paymasterUrl,
//     paymasterContext
//   );

//   // Initialize the User Operation
//   // Userop.js has a few presets for different smart account types to set default fields
//   // for user operations. This uses the ZeroDev Kernel contracts.
//   const signer = new ethers.Wallet(signingKey);
//   const builder = await Presets.Builder.Kernel.init(signer, rpcUrl, {
//     paymasterMiddleware: paymasterMiddleware,
//   });
//     // Send the user operation
// const client = await Client.init(rpcUrl);
// const res = await client.sendUserOperation(builder, {
//     onBuild: (op) => console.log("Signed UserOperation: ", op),
// });
// const address = builder.getSender();
//   console.log(`Account address: ${address}`);

// console.log(`UserOpHash: ${res.userOpHash}`);
// console.log("Waiting for transaction...");
// const ev = await res.wait();
// console.log(`Transaction hash: ${ev?.transactionHash ?? null}`);
})()