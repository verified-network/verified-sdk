import { ethers, utils, ContractInterface, Signer } from "ethers";
import { UserOperationEventEvent } from "userop/dist/typechain/EntryPoint";
import { VerifiedWallet } from "../../wallet";
import { Client, Presets } from "userop";

export enum USEROP_DATATYPES {
    VALUE = 'number',
    STRING = 'string',
    ADDRESS = 'address',
}

interface Params {
    apiKey:string, 
    paymasterUrl:string,
    value:string
    address: string
}

const response: { transactionHash: string | null, result: UserOperationEventEvent | null } = { transactionHash: null, result: null }
export type UseropResponse = typeof response;


export default class VerifiedContract {
    private signer: VerifiedWallet | Signer;
    private contract: ethers.Contract;
    private abiInterface: ContractInterface;
    constructor(address: string, abi: string, signer: VerifiedWallet | Signer){
        this.signer = signer;
        this.abiInterface = new utils.Interface(abi)
        this.contract = new ethers.Contract(address, this.abiInterface, signer);
    }


    protected validateInput(type: USEROP_DATATYPES, data: any) {
        switch (type) {
            // If wallet address is invalid
            case USEROP_DATATYPES.ADDRESS:
                if (!utils.isAddress(data)){
                  throw new Error("Invalid address value");  
                }else return true
            // If value is not number in string quotes
            case USEROP_DATATYPES.VALUE:
                if (!ethers.BigNumber.from(data)){
                    throw new Error("Value should be number in string quotes")
                } return true
            case USEROP_DATATYPES.STRING:
                if ((typeof data !== 'string' || data.length < 10)){
                    throw new Error(`Invalid ${data}`)
                } return true      
        }
    }
    /**
     * Parses output to standard response
     * @param data 
     * @returns 
     */
   
    protected generateOutPut(element: UserOperationEventEvent | null): typeof response {
            if (element?.transactionHash) response.transactionHash =  element.transactionHash
            if (element?.args) response.result = element
            // if (utils.isAddress(element)) response.result.push(element)
            // if (utils.isBytesLike(element)) return response.result.push(element)
        return response
    }

    
   protected async callContract(params:Params):Promise<UseropResponse>{
       
       //@ts-ignore
       const bundlerUrl = this.signer?.provider?.connection.url
        // Send the User Operation to the ERC-4337 mempool
        const client = await Client.init(bundlerUrl,{});

          // Initialize the User Operation
        // Userop.js has a few presets for different smart account types to set default fields
        // for user operations. This uses the ZeroDev Kernel contracts.
        const useropSigner = new ethers.Wallet(params.apiKey);

          // Define the kind of paymaster you want to use. If you do not want to use a paymaster,
        const paymasterContext = { type: "payg" };

        const paymasterMiddleware = Presets.Middleware.verifyingPaymaster(
              params.paymasterUrl,
              paymasterContext,
          );

        const simpleAccount = await Presets.Builder.SimpleAccount.init(
            useropSigner, // Any object compatible with ethers.Signer
            bundlerUrl,{
              paymasterMiddleware,
            }
          );
        
        const res = await client.sendUserOperation(
            simpleAccount.execute(params.address, params.value, "0x"),
            { onBuild: (op) => console.log("Signed UserOperation:", op) }
          );

        const ev = await res.wait();

        return this.generateOutPut(ev);
    }

}