// @ts-nocheck

import { VerifiedContract } from '../index';
import { VerifiedWallet } from "../../wallet";
import { abi } from '../../abi/accounts/Ledger.json';
import { contractAddress } from '../../contractAddress/index';
import { CreateAccount } from '../../models/ledger';

enum FUNCTIONS {
    CREATEACCOUNT = 'createAccount'
}

export default class ClientContract extends VerifiedContract {

    constructor(signer: VerifiedWallet) {

        const network: string = signer.provider._network.name
        super(contractAddress[network].KYC, JSON.stringify(abi), signer)
    }

    public createAccount(params: CreateAccount): any {
        return this.callContract(FUNCTIONS.CREATEACCOUNT, params)
    }


}