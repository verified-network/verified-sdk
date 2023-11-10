
import { ethers, utils, ContractInterface, Signer } from "ethers";
import { UserOperationEventEvent } from "userop/dist/typechain/EntryPoint";
import { VerifiedWallet } from "../../wallet";
import { Client, Presets, UserOperationMiddlewareFn } from "userop";

export enum USEROP_DATATYPES {
    VALUE = 'number',
    STRING = 'string',
    ADDRESS = 'address',
}

const response: { transactionHash: string | null, result: UserOperationEventEvent | null } = { transactionHash: null, result: null }
export type UseropResponse = typeof response;


export class UseropVerifiedContract {
    private paymasterUrl:string
    private apiKey:string
    private walletAddress:string
    private bundlerUrl:string
    private useropSigner: ethers.Wallet;
    private paymasterMiddleware: UserOperationMiddlewareFn

    constructor(signer: VerifiedWallet, apiKey:string, paymasterUrl:string, wallet:VerifiedWallet ) {
        this.apiKey = apiKey;
        this.paymasterUrl = paymasterUrl;
        this.walletAddress = wallet.address;
        // @ts-ignore
        this.bundlerUrl = signer.provider.connection.url

          // Define the kind of paymaster you want to use. If you do not want to use a paymaster,
          const paymasterContext = { type: "payg" };

          this.paymasterMiddleware = Presets.Middleware.verifyingPaymaster(
              this.paymasterUrl,
              paymasterContext
          );

          // Initialize the User Operation
        // Userop.js has a few presets for different smart account types to set default fields
        // for user operations. This uses the ZeroDev Kernel contracts.
        this.useropSigner = new ethers.Wallet(this.apiKey);
    }

    private isNumber(value:number):boolean{
        return !isNaN(value) && typeof value === 'number';
    }

    private async getBuilder ():Promise<Presets.Builder.Kernel> {
        return await Presets.Builder.Kernel.init(this.useropSigner, this.bundlerUrl, {
            paymasterMiddleware: this.paymasterMiddleware,
        });
    }

    private async getClient():Promise<Client> {
        // Send the User Operation to the ERC-4337 mempool
        const client = await Client.init(this.bundlerUrl);
        return client
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

    protected validateInput(type: USEROP_DATATYPES, data: any) {
        switch (type) {
            // If wallet address is invalid
            case USEROP_DATATYPES.ADDRESS:
                if (!utils.isAddress(data)){
                  throw new Error("Invalid address value");  
                }else return true
            // If value is not number in string quotes
            case USEROP_DATATYPES.VALUE:
                if (!this.isNumber(+data)){
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

    protected  async callContract(value:string){
        const builder = await this.getBuilder();

        const client = await this.getClient()

         // In case builder or client are not initialized
         if(!builder || !client){
            throw new Error("Some methods are not initialized, follow instructions on how to use the SDK");  
        }

        const simpleAccount = await Presets.Builder.SimpleAccount.init(
            this.useropSigner, // Any object compatible with ethers.Signer
            this.bundlerUrl,{
              paymasterMiddleware: this.paymasterMiddleware,
            }
          );

        const res = await client.sendUserOperation(
            simpleAccount.execute(this.walletAddress, value, "0x"),
            { onBuild: (op) => console.log("Signed UserOperation:", op) }
          );

        const ev = await res.wait();

        return this.generateOutPut(ev);
    }

}