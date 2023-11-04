import {ethers} from 'ethers'
import {Presets,Client, UserOperationMiddlewareFn, IUserOperation} from 'userop'
import ERC20_ABI from "../abi/erc-20/erc20Abi.json"; // ERC-20 ABI in json format

interface SendAndApproveResponse{
    to: string
    value: ethers.BigNumber
    data:string
}

interface TransactionResponse {
    transactionHash: string | null;
    signedUserOperation:IUserOperation | null;
    userOperationHash: string;
}

interface Options{
    PaymasterApiType: 'payg' | 'erc20token'
}

interface TransactionParams{
    amount:string
    to:string
}

interface GaslessTypes{
    bundlerUrl:string;
    apiKey:string;
    paymasterUrl:string;
    resetOp:()=>Promise<void>
    tokenAddress: string,
    getSenderAddress:()=>Promise<string>
    makeTransaction: (params:TransactionParams)=>Promise<TransactionResponse>
}

interface ClassParams {
    bundlerUrl:string,
    apiKey:string, 
    paymasterUrl:string,
    tokenAddress: string,
    options?:Options
}

const isNumber =(value:number):boolean=> {
    return !isNaN(value) && typeof value === 'number';
  }

export class GasLessTransaction implements GaslessTypes{
    bundlerUrl:string;
    apiKey:string;
    paymasterUrl:string;
    tokenAddress: string
    private _signer: ethers.Wallet;
    private _paymasterMiddleware: UserOperationMiddlewareFn
    private _PaymasterApiType: 'payg' | 'erc20token'

    constructor(params:ClassParams){
        this.bundlerUrl = params.bundlerUrl;
        this.apiKey = params.apiKey;
        this.paymasterUrl = params.paymasterUrl;
        this.tokenAddress = params.tokenAddress
        this._PaymasterApiType = params?.options?.PaymasterApiType || 'payg'

        // Typescript is enough to capture this this error but simulating usage in non typescript environment
        if(!params.bundlerUrl || !params.apiKey || !params.paymasterUrl || !params.tokenAddress){
            throw new Error("bundlerUrl, apiKey, paymasterUrl and tokenAddress are required");  
        }
         // Define the kind of paymaster you want to use. If you do not want to use a paymaster,
         const paymasterContext = this._PaymasterApiType ==='payg' ? { type: "payg" }:{
            "type": "erc20token",
  	        "token": this.tokenAddress
        }

        this._paymasterMiddleware = Presets.Middleware.verifyingPaymaster(
            this.paymasterUrl,
            paymasterContext
        );

        // Initialize the User Operation
        // Userop.js has a few presets for different smart account types to set default fields
        // for user operations. This uses the ZeroDev Kernel contracts.
        this._signer = new ethers.Wallet(this.apiKey);
      
    }

    private async getBuilder ():Promise<Presets.Builder.Kernel> {
        return await Presets.Builder.Kernel.init(this._signer, this.bundlerUrl, {
            paymasterMiddleware: this._paymasterMiddleware,
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

    async makeTransaction(params:TransactionParams):Promise<TransactionResponse>{
        // Typescript is enough to capture this this error but simulating usage in non typescript environment
        if(!params.to || !params.amount){
            throw new Error("Wallet address to send and amount are required");  
        }
         // If amount is not number in string quotes
         if(!isNumber(+params.amount)){
            throw new Error("Amount should be number in string quotes");  
        }

        const calls = await this.approveAndSendToken(params.to, params.amount);
       
        const builder = await this.getBuilder();

        const client = await this.getClient()

         // In case builder or client are not initialized
         if(!builder || !client){
            throw new Error("Some methods are not initialized, follow instructions on how to use the SDK");  
        }

        let  signedUserOperation:IUserOperation | null = null 
        const res = await client.sendUserOperation(builder.executeBatch(calls), {
            onBuild: (op) => {
                signedUserOperation = op;
            }
        });

        const ev = await res.wait();
       
        return{
            userOperationHash: res.userOpHash,
            signedUserOperation,
            transactionHash: ev?.transactionHash ?? null
        }
    }

    // This function creates the call data that will be executed. This combines the approval
    // and send call in a single transaction. You can add as many contract calls as you want
    // in a User Operation.
    private async approveAndSendToken(to:string, value:string):Promise<SendAndApproveResponse[]>{
        const provider = new ethers.providers.JsonRpcProvider(this.bundlerUrl);
        const erc20 = new ethers.Contract(this.tokenAddress, ERC20_ABI, provider);
        const decimals = await Promise.all([erc20.decimals()]);
        const amount = ethers.utils.parseUnits(value, decimals);
  
        const approve = {
            to: this.tokenAddress,
            value: ethers.constants.Zero,
            data: erc20.interface.encodeFunctionData("approve", [to, amount]),
        };
  
        const send = {
            to: this.tokenAddress,
            value: ethers.constants.Zero,
            data: erc20.interface.encodeFunctionData("transfer", [to, amount]),
        };
  
        return [approve, send];    
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