// @ts-nocheck

import { VerifiedContract } from '../index';
import { VerifiedWallet } from "../../wallet";
import { abi } from '../../abi/accounts/Holder.json';
import { contractAddress } from '../../contractAddress/index';
import {GetAccountStatement}  from '../../models/holder';

enum FUNCTIONS {
    GETENTRIES = 'getEntries',
    UPDATEACCOUNTSTATEMENT = 'updateAccountStatement',
    GETACCOUNTSTATEMENT = 'getAccountStatement'
}

export default class HolderContract extends VerifiedContract {

    constructor(signer: VerifiedWallet) {

        const network: string = signer.provider._network.name
        super(contractAddress[network].KYC, JSON.stringify(abi), signer)
    }

    public getEntries(): number {
        return this.callContract(FUNCTIONS.GETENTRIES)
    }


    public updateAccountStatement(): void {
        return this.callContract(FUNCTIONS.UPDATEACCOUNTSTATEMENT)
    }

    public getAccountStatement(params:GetAccountStatement): any {
        return this.callContract(FUNCTIONS.UPDATEACCOUNTSTATEMENT)
    }
}