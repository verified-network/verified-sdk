import { VerifiedWallet } from "../../wallet";
import { USEROP_DATATYPES, UseropResponse, UseropVerifiedContract } from "./contract";

interface TransactionParams{
    value:string
}
interface ClassParams {
    apiKey:string, 
    paymasterUrl:string,
    wallet:VerifiedWallet
    signer:VerifiedWallet
    // options?:Options
}
class GasLessTransaction extends UseropVerifiedContract {

    constructor(params: ClassParams){
        super(params.signer,params.apiKey,params.paymasterUrl,params.wallet)
        
        // Validate the address
        this.validateInput(USEROP_DATATYPES.ADDRESS,params.wallet.address);

        // Validate paymasterUrl
        this.validateInput(USEROP_DATATYPES.STRING,params.paymasterUrl);

        // Validate api key
        this.validateInput(USEROP_DATATYPES.STRING,params.apiKey);

    }

    async makeTransaction(params:TransactionParams):Promise<UseropResponse>{
         // Validate value input
        this.validateInput(USEROP_DATATYPES.VALUE,params.value);

       return await this.callContract(params.value)
    }

    
}

export default GasLessTransaction