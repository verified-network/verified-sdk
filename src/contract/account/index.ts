// @ts-nocheck

import { VerifiedContract } from '../index';
import { VerifiedWallet } from "../../wallet";
import { abi, networks} from '../../abi/accounts/System.json';
import { contractAddress } from '../../contractAddress/index';
import { DATATYPES } from "../index";
import { PostEntry } from '../../models/account';

enum FUNCTIONS {
    POSTENTRY = 'postEntry'
}

export default class AccountContract extends VerifiedContract {

    constructor(signer: VerifiedWallet) {

        const chainId: string = signer.provider._network.chainId.toString()
        super(networks[chainId].address, JSON.stringify(abi), signer)
    }

    /**
     * For each transaction, an account entry needs to be posted using the following solidity function.
     * Where, _vchType is voucher type and can be either ‘Journal’ , ‘Cash, ‘Bank, ‘Sale’ or ‘Purchase'.
     * @param (address _account, bytes32 _accountNumber, int256 _txAmount, bytes32 _txType, bytes32 _txDate, bytes32 _txDescription, bytes32 _vchType)
     * 
     */
    public async postEntry(_accountAddress, _accountNumber, _txAmount, _txType, _txDate, _txDescription, _vchType, options?: { gasLimit, gasPrice }): any {

        await this.validateInput(DATATYPES.ADDRESS, _accountAddress)
        await this.validateInput(DATATYPES.STRING, _accountNumber)
        await this.validateInput(DATATYPES.NUMBER, _txAmount)
        
        return this.callContract(FUNCTIONS.POSTENTRY, _accountAddress, _accountNumber, _txAmount, this.sanitiseInput(DATATYPES.BYTE32, _txType), this.sanitiseInput(DATATYPES.BYTE32, _txDate), this.sanitiseInput(DATATYPES.BYTE32, _txDescription), this.sanitiseInput(DATATYPES.BYTE32, _vchType), options)
    }
}