import { UserOperationEventEvent } from "userop/dist/typechain/EntryPoint";
import { VerifiedWallet } from "../../wallet";
import { Signer } from "ethers";
import  VerifiedContract, {USEROP_DATATYPES}  from "./contract";
import abi from '../../abi/erc-20/erc20Abi.json'

const response: { transactionHash: string | null, result: UserOperationEventEvent | null } = { transactionHash: null, result: null }
export type UseropResponse = typeof response;

type TransactionParams ={
  value:string
}
 export default class UseropContract extends VerifiedContract {
    private address: string;
    private apiKey:string;
    private paymasterUrl:string;
    constructor(address: string, signer: VerifiedWallet | Signer){
      super(address, JSON.stringify(abi), signer)
        this.address = address
        this.apiKey = process.env.API_KEY
        this.paymasterUrl = process.env.PAY_MASTER_URL
    }

    async makeTransaction(params:TransactionParams):Promise<UseropResponse>{
        const value = params.value
         // Validate value input
        this.validateInput(USEROP_DATATYPES.VALUE, value)
         // Validate the address
        this.validateInput(USEROP_DATATYPES.ADDRESS,this.address)

        // Validate paymasterUrl
        this.validateInput(USEROP_DATATYPES.STRING,this.paymasterUrl)

        // Validate api key
        this.validateInput(USEROP_DATATYPES.STRING,this.apiKey)
      
       // Call contract
       return this.callContract({address:this.address,apiKey:this.apiKey,paymasterUrl:this.paymasterUrl,value})
    }



    
}