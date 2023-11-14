import { UserOperationEventEvent } from "userop/dist/typechain/EntryPoint";
import { VerifiedWallet } from "../../wallet";
import { ethers, utils } from "ethers";
import { Client, Presets } from "userop";

interface Params {
    apiKey:string, 
    paymasterUrl:string,
    wallet:VerifiedWallet
    signer:VerifiedWallet
    value:string
}

const response: { transactionHash: string | null, result: UserOperationEventEvent | null } = { transactionHash: null, result: null }
export type UseropResponse = typeof response;

 class VerifiedContract {

    constructor(){

    }

   static async callContract(params:Params):Promise<UseropResponse>{
         // Validate value input
        if (!ethers.BigNumber.from(params.value)) {
            throw new Error("Value should be number in string quotes")
        }
         // // Validate the address
         if (!utils.isAddress(params.wallet.address)){
            throw new Error("Invalid address value");  
          }
        // // Validate paymasterUrl
        if ((typeof params.paymasterUrl !== 'string')){
            throw new Error(`Invalid ${params.paymasterUrl}`)
        }

        // // Validate api key
        if ((typeof params.apiKey !== 'string')){
            throw new Error(`Invalid ${params.apiKey}`)
        }
        // @ts-ignore
       const bundlerUrl = params.signer.provider.connection.url
        // Send the User Operation to the ERC-4337 mempool
        const client = await Client.init(bundlerUrl);

          // Initialize the User Operation
        // Userop.js has a few presets for different smart account types to set default fields
        // for user operations. This uses the ZeroDev Kernel contracts.
        const useropSigner = new ethers.Wallet(params.apiKey);

          // Define the kind of paymaster you want to use. If you do not want to use a paymaster,
        const paymasterContext = { type: "payg" };

        const paymasterMiddleware = Presets.Middleware.verifyingPaymaster(
              params.paymasterUrl,
              paymasterContext
          );
        
        const builder =  Presets.Builder.Kernel.init(useropSigner, bundlerUrl, {
            paymasterMiddleware
        });

        const simpleAccount = await Presets.Builder.SimpleAccount.init(
            useropSigner, // Any object compatible with ethers.Signer
            bundlerUrl,{
              paymasterMiddleware
            }
          );
        
        const res = await client.sendUserOperation(
            simpleAccount.execute(params.wallet.address, params.value, "0x"),
            { onBuild: (op) => console.log("Signed UserOperation:", op) }
          );

        const ev = await res.wait();

       return {
        transactionHash: ev?.transactionHash!,
        result: ev
       }
    }

    
}

export default VerifiedContract