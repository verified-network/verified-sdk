// @ts-nocheck

import { VerifiedContract } from '../index';
import { VerifiedWallet } from "../../wallet";
import { abi } from '../../abi/accounts/Kyc.json';
import { contractAddress } from '../../contractAddress/index';
import { SetStatus, GetStatus } from '../../models/kyc';

enum FUNCTIONS {
    GETSTATUS = 'getStatus',
    SETSTATUS = 'setStatus'
}

export default class ClientContract extends VerifiedContract {

    constructor(signer: VerifiedWallet) {

        const network: string = signer.provider._network.name
        super(contractAddress[network].KYC, JSON.stringify(abi), signer)
    }

    public setStatus(params: GetStatus): any {
        return this.callContract(FUNCTIONS.GETSTATUS, params)
    }

    public getStatus(params: SetStatus): any {
        return this.callContract(FUNCTIONS.SETSTATUS, params)
    }


}