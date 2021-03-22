// @ts-nocheck

import { VerifiedContract } from '../index';
import { VerifiedWallet } from "../../wallet";
import { abi } from '../../abi/accounts/System.json';
import { contractAddress } from '../../contractAddress/index';
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
        super(contractAddress[network].KYC, JSON.stringify(abi), signer)
    }

    /**
     * When an investor or issuer account is set up, the Verified Dapp needs to set up its account. Where, the _holderName is the name or ID of the issuer or investor, and _accountHolder is the address of the issuer or investor. The accoun.older’s address can be obtained by calling on the Account system the following solidity function
     * @param {bytes32 _holderName, address _accountHolder} 
     * @returns {address}
     */
    public createHolder(params: CreateHolder): any {
        return this.callContract(FUNCTIONS.CREATEHOLDER, params)
    }

    /**
     * The account holder’s address can be obtained by calling on the Account system the following solidity function.
     * @param {address accountCreator} 
     * @returns {address}
     */
    public getAccountHolder(params: GetAccountHolder): any {
        return this.callContract(FUNCTIONS.GETACCOUNTHOLDER, params)
    }

    /**
     * The account ledger address can be obtained by calling the following function on the Account system contract
     * @param {address accountHolder} 
     * @returns {address}
     */
    public getAccountLedger(params: GetAccountLedger): any {
        return this.callContract(FUNCTIONS.GETACCOUNTLEDGER, params)
    }

    /**
     * The created account address can be obtained by calling the following function on the Account system contract.
     * @param {address accountLedger} 
     * @returns {address}
     */
    public getLedgerAccount(params: GetLedgerAccount): any {
        return this.callContract(FUNCTIONS.GETLEDGERACCOUNT, params)
    }
}