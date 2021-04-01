// @ts-nocheck

import { VerifiedContract } from '../index';
import { VerifiedWallet } from "../../wallet";
import { abi } from '../../abi/accounts/System.json';
import { contractAddress } from '../../contractAddress/index';
import { DATATYPES } from "../index";
import { CreateHolder, GetAccountHolder, GetAccountLedger, GetLedgerAccount } from '../../models/system';

enum FUNCTIONS {
    CREATEHOLDER = 'createHolder',
    GETACCOUNTHOLDER = 'getAccountHolder',
    GETACCOUNTLEDGER = 'getAccountLedger',
    GETLEDGERACCOUNT = 'getLedgerAccount'
}

export default class SystemContract extends VerifiedContract {

    constructor(signer: VerifiedWallet) {

        const network: string = signer.provider._network.name
        super(contractAddress[network].System, JSON.stringify(abi), signer)
    }

    /**
     * When an investor or issuer account is set up, the Verified Dapp needs to set up its account. Where, the _holderName is the name or ID of the issuer or investor, and _accountHolder is the address of the issuer or investor. The accoun.older’s address can be obtained by calling on the Account system the following solidity function
     * @param (bytes32 _holderName, address _accountHolder)
     * @returns {address}
     */
    public async createHolder(_holderName: string, _accountHolder: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.STRING, _holderName)
        await this.validateInput(DATATYPES.STRING, _accountHolder)
        return this.callContract(FUNCTIONS.CREATEHOLDER, this.sanitiseInput(DATATYPES.BYTE32, _holderName), _accountHolder, options)
    }

    /**
     * The account holder’s address can be obtained by calling on the Account system the following solidity function.
     * @param (address accountCreator)
     * @returns {address}
     */
    public async getAccountHolder(_accountCreatorAddress: string): any {
        await this.validateInput(DATATYPES.ADDRESS, _accountCreatorAddress)
        return this.callContract(FUNCTIONS.GETACCOUNTHOLDER, _accountCreatorAddress)
    }

    /**
     * The account ledger address can be obtained by calling the following function on the Account system contract
     * @param (address accountHolder)
     * @returns 
     */
    public async getAccountLedger(_accountHolderAddress: string): any {
        await this.validateInput(DATATYPES.ADDRESS, _accountHolderAddress)
        return this.callContract(FUNCTIONS.GETACCOUNTLEDGER, _accountHolderAddress)
    }

    /**
     * The created account address can be obtained by calling the following function on the Account system contract.
     * @param (address accountLedger) 
     * @returns 
     */
    public async getLedgerAccount(_accountLedgerAddress: string): any {
        await this.validateInput(DATATYPES.ADDRESS, _accountLedgerAddress)
        return this.callContract(FUNCTIONS.GETLEDGERACCOUNT, _accountLedgerAddress)
    }
}