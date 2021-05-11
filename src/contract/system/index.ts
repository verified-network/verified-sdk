// @ts-nocheck

import { VerifiedContract } from '../index';
import { VerifiedWallet } from "../../wallet";
import { abi, networks } from '../../abi/accounts/System.json';
import { DATATYPES } from "../index";

enum FUNCTIONS {
    CREATEHOLDER = 'createHolder',
    GETACCOUNTHOLDER = 'getAccountHolder',
    GETACCOUNTHOLDERS = 'getAccountHolders',
    GETACCOUNTLEDGER = 'getAccountLedger',
    GETLEDGERACCOUNT = 'getLedgerAccount',
    GETHOLDERDETAILS = 'getHolderDetails',
    GETLEDGERDETAILS = 'getLedgerDetails',
    GETLEDGERACCOUNTS = 'getLedgerAccounts',
    GETACCOUNTDETAILS = 'getAccountDetails',
    GETACCOUNTLEDGERS = 'getAccountLedgers',

}

export default class SystemContract extends VerifiedContract {

    constructor(signer: VerifiedWallet) {

        const chainId: string = signer.provider._network.chainId.toString()
        super(networks[chainId].address, JSON.stringify(abi), signer)
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
     * @param (address counterParty))
     * @returns [address]
     * _accountCreator is the client that created the account holders. Returns address array of account holders
     */
      public async getAccountHolder(_counterPartyAddress: string): any {
        await this.validateInput(DATATYPES.ADDRESS, _counterPartyAddress)
        return this.callContract(FUNCTIONS.GETACCOUNTHOLDER, _counterPartyAddress)
    }

    /**
     * The account holder’s address can be obtained by calling on the Account system the following solidity function.
     * @param (address accountCreator)
     * @returns [address]
     * _accountCreator is the client that created the account holders. Returns address array of account holders
     */
    public async getAccountHolders(_accountCreatorAddress: string): any {
        await this.validateInput(DATATYPES.ADDRESS, _accountCreatorAddress)
        return this.callContract(FUNCTIONS.GETACCOUNTHOLDERS, _accountCreatorAddress)
    }

    /**
     * The account ledger address can be obtained by calling the following function on the Account system contract
     * @param (address accountHolder)
     * @returns (address[] memory)
     * _accountHolder is the account holder for which the ledger was created in 5.3. Returns address array of ledgers.
     */
    public async getAccountLedger(_accountHolderAddress: string): any {
        await this.validateInput(DATATYPES.ADDRESS, _accountHolderAddress)
        return this.callContract(FUNCTIONS.GETACCOUNTLEDGER, _accountHolderAddress)
    }

    /**
     * Get list of account ledgers
     * @param (address _accountLedger)
     * @returns (address[] memory)
     * _accountLedger is the ledger in which the accounts were created in createAccount()
     */
     public async getLedgerAccount(_accountLedgerAddress: string): any {
        await this.validateInput(DATATYPES.ADDRESS, _accountLedgerAddress)
        return this.callContract(FUNCTIONS.GETLEDGERACCOUNT, _accountLedgerAddress)
    }
    /**
     * Get list of account ledgers
     * @param (address _accountLedger)
     * @returns (address[] memory)
     * _accountLedger is the ledger in which the accounts were created in createAccount()
     */
    public async getLedgerAccounts(_accountLedgerAddress: string): any {
        await this.validateInput(DATATYPES.ADDRESS, _accountLedgerAddress)
        return this.callContract(FUNCTIONS.GETLEDGERACCOUNTS, _accountLedgerAddress)
    }

    /**
     * Get account holder details
     * @param (address accountLedger) 
     * @returns bytes32
     * _holder is any one of the account holders returned in getAccountHolders()
     */
    public async getHolderDetails(_holder: string): any {
        await this.validateInput(DATATYPES.ADDRESS, _holder)
        return this.callContract(FUNCTIONS.GETHOLDERDETAILS, _holder)
    }

    /**
   * Get list of account ledgers
   * @param (address _ledger)
   * @returns bytes32
   * _ledger is the any of the ledgers returned in getAccountLedgers()
   */
    public async getLedgerDetails(_ledger: string): any {
        await this.validateInput(DATATYPES.ADDRESS, _ledger)
        return this.callContract(FUNCTIONS.GETLEDGERDETAILS, _ledger)
    }

    /**
     * Get list of account ledgers
     * @param (address _account)
     * @returns (bytes32, bytes32)
     * _account is any of the accounts returned in getLedgerAccounts()
     */
    public async getAccountDetails(_account: string): any {
        await this.validateInput(DATATYPES.ADDRESS, _account)
        return this.callContract(FUNCTIONS.GETACCOUNTDETAILS, _account)
    }

     /**
     * The account ledger address can be obtained by calling the following function on the Account system contract
     * @param (address accountHolder)
     * @returns (address[] memory)
     * _accountHolder is the account holder for which the ledger was created in 5.3. Returns address array of ledgers.
     */
      public async getAccountLedgers(_accountHolderAddress: string): any {
        await this.validateInput(DATATYPES.ADDRESS, _accountHolderAddress)
        return this.callContract(FUNCTIONS.GETACCOUNTLEDGERS, _accountHolderAddress)
    }    
}