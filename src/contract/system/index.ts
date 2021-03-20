// @ts-nocheck

import { VerifiedContract } from '../index';
import { VerifiedWallet } from "../../wallet";
import { abi } from '../../abi/accounts/System.json';
import { contractAddress } from '../../contractAddress/index';
import { GetAccountHolder, GetAccountLedger ,GetLedgerAccount} from '../../models/system';

enum FUNCTIONS {
    CREATEHOLDER='createHolder',
    GETACCOUNTHOLDER = 'getAccountHolder',
    GETACCOUNTLEDGER = 'getAccountLedger',
    GETLEDGERACCOUNT = 'getLedgerAccount'
}

export default class systemContract extends VerifiedContract {

    constructor(signer: VerifiedWallet) {

        const network: string = signer.provider._network.name
        super(contractAddress[network].KYC, JSON.stringify(abi), signer)
    }

     public createHolder(params: GetAccountHolder): any {
        return this.callContract(FUNCTIONS.CREATEHOLDER, params)
    }
    
    public getAccountHolder(params: GetAccountHolder): any {
        return this.callContract(FUNCTIONS.GETACCOUNTHOLDER, params)
    }


    public getAccountLedger(params: GetAccountLedger): any {
        return this.callContract(FUNCTIONS.GETACCOUNTLEDGER, params)
    }

    public getLedgerAccount(params: GetLedgerAccount): any {
        return this.callContract(FUNCTIONS.GETLEDGERACCOUNT, params)
    }


}