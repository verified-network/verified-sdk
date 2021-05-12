// @ts-nocheck

import { VerifiedContract } from '../index';
import { VerifiedWallet } from "../../wallet";
import { abi, networks } from '../../abi/accounts/Account.json';
import { contractAddress } from '../../contractAddress/index';
import { DATATYPES } from "../index";
import { PostEntry } from '../../models/account';

enum FUNCTIONS {
    POSTENTRY = 'postEntry',
    GETENTRY = 'getEntry'
}

export default class AccountContract extends VerifiedContract {
    public contractAddress: string
    constructor(signer: VerifiedWallet) {

        const chainId: string = signer.provider._network.chainId.toString()
        const address = networks[chainId].address
        super(address, JSON.stringify(abi), signer)

        this.contractAddress = address
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

    /**
    * View account transaction [callable by KYC passed client
    * @param (bytes32 _accountNumber, bytes32 _txDate)
    * @returns (address, address, bytes16, bytes32, bytes32, bytes32)
    *  For _accountNumber on _txDate, returns ledger, party, txAmount, txType, txDescription, voucherType
    */
    public async getEntry(_accountNumber, _txDate, options?: { gasLimit, gasPrice }): any {

        await this.validateInput(DATATYPES.STRING, _accountNumber)
        await this.validateInput(DATATYPES.STRING, _txDate)
        return this.callContract(FUNCTIONS.GETENTRY, this.sanitiseInput(DATATYPES.BYTE32, _accountNumber), this.sanitiseInput(DATATYPES.BYTE32, _txDate), options)
    }
}