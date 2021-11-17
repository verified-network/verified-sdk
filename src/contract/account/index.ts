// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck

import { VerifiedContract, DATATYPES } from '../index';
import { VerifiedWallet } from "../../wallet";
import { abi, networks } from '../../abi/accounts/Account.json';

enum FUNCTIONS {
    POSTENTRY = 'postEntry'
}

export default class AccountContract extends VerifiedContract {

    public contractAddress: string
    
    constructor(signer: VerifiedWallet, accountAddress: string) {

        const chainId: string = signer.provider._network.chainId.toString()
        const address = accountAddress
        super(address, JSON.stringify(abi), signer)

        this.contractAddress = address
    }

    /**
     * For each transaction, an account entry needs to be posted using the following solidity function.
     * Where, _vchType is voucher type and can be either ‘Journal’ , ‘Cash, ‘Bank, ‘Sale’ or ‘Purchase'.
     * @param (address _account, bytes32 _accountNumber, int256 _txAmount, bytes32 _txType, bytes32 _txDate, bytes32 _txDescription, bytes32 _vchType)
     * 
     */
    public async postEntry(_counterParty:address, _txAmount:string, _txType:string, _txDate:string, _txDescription:string, _vchType:string, options?: { gasLimit, gasPrice }): any {
        await this.validateInput(DATATYPES.ADDRESS, _counterParty)
        await this.validateInput(DATATYPES.NUMBER, _txAmount)
        await this.validateInput(DATATYPES.NUMBER, _txDate)
        await this.validateInput(DATATYPES.STRING, _txType)
        await this.validateInput(DATATYPES.STRING, _txDescription)
        await this.validateInput(DATATYPES.STRING, _vchType)
        return this.callContract(FUNCTIONS.POSTENTRY, _counterParty, _txAmount, this.sanitiseInput(DATATYPES.BYTE32, _txType), _txDate, this.sanitiseInput(DATATYPES.BYTE32, _txDescription), this.sanitiseInput(DATATYPES.BYTE32, _vchType), options)
    }

}