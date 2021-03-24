// @ts-nocheck

import { VerifiedContract } from '../index';
import { VerifiedWallet } from "../../wallet";
import { abi } from '../../abi/accounts/System.json';
import { contractAddress } from '../../contractAddress/index';
import { PostEntry } from '../../models/account';

enum FUNCTIONS {
    POSTENTRY = 'postEntry'
}

export default class AccountContract extends VerifiedContract {

    constructor(signer: VerifiedWallet) {

        const network: string = signer.provider._network.name
        super(contractAddress[network].Account, JSON.stringify(abi), signer)
    }

    /**
     * For each transaction, an account entry needs to be posted using the following solidity function.
     * Where, _vchType is voucher type and can be either ‘Journal’ , ‘Cash, ‘Bank, ‘Sale’ or ‘Purchase'.
     * @param {address _account, bytes32 _accountNumber, int256 _txAmount, bytes32 _txType, bytes32 _txDate, bytes32 _txDescription, bytes32 _vchType} 
     * @returns {address}
     */
    public postEntry(params: PostEntry): any {
        return this.callContract(FUNCTIONS.POSTENTRY, params)
    }
}