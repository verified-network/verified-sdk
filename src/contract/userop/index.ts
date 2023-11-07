// SPDX-License-Identifier: BUSL-1.1
import { ethers, utils, ContractInterface, Signer } from "ethers";
import { UserOperationMiddlewareFn, Presets, Client } from "userop";
import { UserOperationEventEvent } from "userop/dist/typechain/EntryPoint";
import { VerifiedWallet } from "../../wallet";

enum STATUS {
    SUCCESS,
    ERROR
}

interface SCResponse {
    response: object;
    status: STATUS;
    message: string;
    reason: string;
    code: number
}

enum DATATYPES {
    VALUE = 'number',
    STRING = 'string',
    ADDRESS = 'address',
}

interface TransactionParams{
    value:string
}

const response: { transactionHash: string | null, result: UserOperationEventEvent | null } = { transactionHash: null, result: null }
type Response = typeof response;

class VerifiedContract {

    constructor() {

    }

    private isNumber(value:number):boolean{
        return !isNaN(value) && typeof value === 'number';
      }
    protected validateInput(type: DATATYPES, data: any) {
        switch (type) {
            // If wallet address is invalid
            case DATATYPES.ADDRESS:
                if (!utils.isAddress(data)){
                  throw new Error("Invalid address value");  
                }else return true
            // If value is not number in string quotes
            case DATATYPES.VALUE:
                if (!this.isNumber(+data)){
                    throw new Error("Value should be number in string quotes")
                } return true
            case DATATYPES.STRING:
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

}

interface ClassParams {
    apiKey:string, 
    paymasterUrl:string,
    wallet:VerifiedWallet
    walletWithProvider: VerifiedWallet
    // options?:Options
}

class GasLessTransaction extends VerifiedContract {
    private paymasterUrl:string
    private apiKey:string
    private signer: ethers.Wallet;
    private paymasterMiddleware: UserOperationMiddlewareFn
    private walletAddress:string
    private bundlerUrl:string
    constructor(params: ClassParams){
        super()
        this.apiKey = params.apiKey;
        this.paymasterUrl = params.paymasterUrl;
        this.walletAddress = params.wallet.address;
        // @ts-ignore
        this.bundlerUrl = params.walletWithProvider.provider.connection.url
        // Validate the address
        this.validateInput(DATATYPES.ADDRESS,this.walletAddress);

        // Validate paymasterUrl
        this.validateInput(DATATYPES.STRING,this.paymasterUrl);

        // Validate api key
        this.validateInput(DATATYPES.STRING,this.walletAddress);

        // Define the kind of paymaster you want to use. If you do not want to use a paymaster,
        const paymasterContext = { type: "payg" };

        this.paymasterMiddleware = Presets.Middleware.verifyingPaymaster(
            this.paymasterUrl,
            paymasterContext
        );

        // Initialize the User Operation
        // Userop.js has a few presets for different smart account types to set default fields
        // for user operations. This uses the ZeroDev Kernel contracts.
        this.signer = new ethers.Wallet(this.apiKey);
    }

    private async getBuilder ():Promise<Presets.Builder.Kernel> {
        return await Presets.Builder.Kernel.init(this.signer, this.bundlerUrl, {
            paymasterMiddleware: this.paymasterMiddleware,
        });
    }

    private async getClient():Promise<Client> {
        // Send the User Operation to the ERC-4337 mempool
        const client = await Client.init(this.bundlerUrl);
        return client
    }

    async makeTransaction(params:TransactionParams):Promise<Response>{
         // Validate value input
        this.validateInput(DATATYPES.VALUE,params.value);

       
        const builder = await this.getBuilder();

        const client = await this.getClient()

         // In case builder or client are not initialized
         if(!builder || !client){
            throw new Error("Some methods are not initialized, follow instructions on how to use the SDK");  
        }

        const simpleAccount = await Presets.Builder.SimpleAccount.init(
            this.signer, // Any object compatible with ethers.Signer
            this.bundlerUrl,{
              paymasterMiddleware: this.paymasterMiddleware,
            }
          );

        const res = await client.sendUserOperation(
            simpleAccount.execute(this.walletAddress, params.value, "0x"),
            { onBuild: (op) => console.log("Signed UserOperation:", op) }
          );

        const ev = await res.wait();
       
        return this.generateOutPut(ev);
    }

    async getSenderAddress():Promise<string> {
        const builder = await this.getBuilder();

          // In case builder is not initialized
          if(!builder){
            throw new Error("Some method(s) are not initialized, follow instructions on how to use the SDK");  
        }

        return builder.getSender();
    }

    async resetOp():Promise<void>{
        const builder = await this.getBuilder();
         // In case builder is not initialized
         if(!builder){
            throw new Error("Some method(s) are not initialized, follow instructions on how to use the SDK");  
        }
        builder.resetOp();
    }
}

export default GasLessTransaction