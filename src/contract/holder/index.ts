// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck

import { VerifiedContract, DATATYPES } from '../index';
import { VerifiedWallet } from "../../wallet";
import { abi, networks } from '../../abi/accounts/Holder.json';

enum FUNCTIONS {
    GETENTRIES = 'getEntries',
    UPDATEACCOUNTSTATEMENT = 'updateAccountStatement',
    GETACCOUNTSTATEMENT = 'getAccountStatement',
    CREATELEDGER = 'createLedger',
    GETTRANSACTIONS = 'getTransactions',
    FETCHTRANSACTIONS = 'fetchTransactions',
    GETENTRY = 'getEntry' 
}

export default class HolderContract extends VerifiedContract {

    public contractAddress: string
    
    constructor(signer: VerifiedWallet, holderAddress: string) {
        const chainId: string = signer.provider._network.chainId.toString()
        const address = holderAddress
        super(address, JSON.stringify(abi), signer)

        this.contractAddress = address
    }

    /**
     * The number of entries in the statement can be fetched using the following solidity function.
     * @returns [uint256]
     * Returns number of ledger entries for account holder
     */
    public getEntries(): number {
        return this.callContract(FUNCTIONS.GETENTRIES)
    }

    /**
     * Transaction statements can be viewed by both issuers and investors.
     * Before viewing a statement, it needs to be updated by calling the following solidity function
     *
     */
    public updateAccountStatement(options?: { gasPrice: number, gasLimit: number }): void {
        return this.callContract(FUNCTIONS.UPDATEACCOUNTSTATEMENT)
    }

    /**
     * For number of entries returned by getEntries(), the details of each entry can be fetched 
     * by calling getAccountStatement which returns the ledger name, ledger group and ledger balance for the index.
     * @param (uint256 statementIndex)
     * @returns [bytes32, bytes32, bytes16]
     */
    public async getAccountStatement(_statementIndex: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.NUMBER, _statementIndex)
        return this.callContract(FUNCTIONS.GETACCOUNTSTATEMENT, _statementIndex, options)
    }


    /**
     * Once the account is set up, ledgers need to be set up for grouping transactions. 
     * Where, _ledgerName is the name in characters, and _ledgerGroup is the transaction group. 
     * @param (bytes32 _ledgerName, bytes32 _ledgerGroup)
     * @returns [address]
     */
    public async createLedger(_ledgerName: string, _ledgerGroup: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.STRING, _ledgerName)
        await this.validateInput(DATATYPES.STRING, _ledgerGroup)
        return this.callContract(FUNCTIONS.CREATELEDGER, this.sanitiseInput(DATATYPES.BYTE32, _ledgerName), this.sanitiseInput(DATATYPES.BYTE32, _ledgerGroup), options)
    }

    /**
    * Prepare list of transactions for account holder [callable by KYC passed client
    * @param (uint256 _txDate)
    * _txDate is unix timestamp for date on and which transactions are returned. 
    */
    public async fetchTransactions(_txDate: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.NUMBER, _txDate)
        return this.callContract(FUNCTIONS.FETCHTRANSACTIONS, _txDate, options)
    }

    /**
    * Get list of transactions for account holder [callable by KYC passed client
    * @returns uint256 (number of transactions to _txDate and denominated in _currency)
    */
     public async getTransactions(_txDate: string, _currency: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.NUMBER, _txDate)
        await this.validateInput(DATATYPES.STRING, _currency)
        return this.callContract(FUNCTIONS.GETTRANSACTIONS, _txDate, this.sanitiseInput(DATATYPES.BYTE32, _currency), options)
    }

    /**
    * Get list of transactions for account holder [callable by KYC passed client
    * @returns (address party, uint256 amount, bytes32 currency, bytes32 transaction type, uint256 date, bytes32 description, bytes32 voucherType);
    */
    public async getEntry(_index:string, _txDate: string, _currency: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.NUMBER, _index)
        await this.validateInput(DATATYPES.NUMBER, _txDate)
        await this.validateInput(DATATYPES.STRING, _currency)
        return this.callContract(FUNCTIONS.GETENTRY, _index, _txDate, this.sanitiseInput(DATATYPES.BYTE32, _currency), options)
    }
}