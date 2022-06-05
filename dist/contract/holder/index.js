"use strict";
// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const Holder_json_1 = require("../../abi/accounts/Holder.json");
var FUNCTIONS;
(function (FUNCTIONS) {
    FUNCTIONS["GETENTRIES"] = "getEntries";
    FUNCTIONS["UPDATEACCOUNTSTATEMENT"] = "updateAccountStatement";
    FUNCTIONS["GETACCOUNTSTATEMENT"] = "getAccountStatement";
    FUNCTIONS["CREATELEDGER"] = "createLedger";
    FUNCTIONS["GETTRANSACTIONS"] = "getTransactions";
    FUNCTIONS["FETCHTRANSACTIONS"] = "fetchTransactions";
    FUNCTIONS["GETENTRY"] = "getEntry";
    FUNCTIONS["SETBLOCK"] = "setBlock";
    FUNCTIONS["GETBLOCK"] = "getBlock";
})(FUNCTIONS || (FUNCTIONS = {}));
class HolderContract extends index_1.VerifiedContract {
    constructor(signer, holderAddress) {
        const address = holderAddress;
        super(address, JSON.stringify(Holder_json_1.abi), signer);
        this.contractAddress = address;
    }
    /**
     * The number of entries in the statement can be fetched using the following solidity function.
     * @returns [uint256]
     * Returns number of ledger entries for account holder
     */
    getEntries() {
        return this.callContract(FUNCTIONS.GETENTRIES);
    }
    /**
     * Transaction statements can be viewed by both issuers and investors.
     * Before viewing a statement, it needs to be updated by calling the following solidity function
     *
     */
    updateAccountStatement(options) {
        return this.callContract(FUNCTIONS.UPDATEACCOUNTSTATEMENT);
    }
    /**
     * For number of entries returned by getEntries(), the details of each entry can be fetched
     * by calling getAccountStatement which returns the ledger name, ledger group and ledger balance for the index.
     * @param (uint256 statementIndex)
     * @returns [bytes32, bytes32, bytes16]
     */
    async getAccountStatement(_statementIndex, options) {
        await this.validateInput(index_1.DATATYPES.NUMBER, _statementIndex);
        return this.callContract(FUNCTIONS.GETACCOUNTSTATEMENT, _statementIndex, options);
    }
    /**
     * Once the account is set up, ledgers need to be set up for grouping transactions.
     * Where, _ledgerName is the name in characters, and _ledgerGroup is the transaction group.
     * @param (bytes32 _ledgerName, bytes32 _ledgerGroup)
     * @returns [address]
     */
    async createLedger(_ledgerName, _ledgerGroup, options) {
        await this.validateInput(index_1.DATATYPES.STRING, _ledgerName);
        await this.validateInput(index_1.DATATYPES.STRING, _ledgerGroup);
        return this.callContract(FUNCTIONS.CREATELEDGER, this.sanitiseInput(index_1.DATATYPES.BYTE32, _ledgerName), this.sanitiseInput(index_1.DATATYPES.BYTE32, _ledgerGroup), options);
    }
    /**
    * Prepare list of transactions for account holder [callable by KYC passed client
    * @param (uint256 _txDate)
    * _txDate is unix timestamp for date on and which transactions are returned.
    */
    async fetchTransactions(_startDate, _endDate, options) {
        await this.validateInput(index_1.DATATYPES.NUMBER, _startDate);
        await this.validateInput(index_1.DATATYPES.NUMBER, _endDate);
        return this.callContract(FUNCTIONS.FETCHTRANSACTIONS, _startDate, _endDate, options);
    }
    /**
    * Get list of transactions for account holder [callable by KYC passed client
    * @returns uint256 (number of transactions to _txDate and denominated in _currency)
    */
    async getTransactions(_txDate, _currency, options) {
        await this.validateInput(index_1.DATATYPES.NUMBER, _txDate);
        await this.validateInput(index_1.DATATYPES.STRING, _currency);
        return this.callContract(FUNCTIONS.GETTRANSACTIONS, _txDate, this.sanitiseInput(index_1.DATATYPES.BYTE32, _currency), options);
    }
    /**
    * Get list of transactions for account holder [callable by KYC passed client
    * @returns (address party, uint256 amount, bytes32 currency, bytes32 transaction type, uint256 date, bytes32 description, bytes32 voucherType);
    */
    async getEntry(_start, _end, _txDate, _currency, options) {
        await this.validateInput(index_1.DATATYPES.NUMBER, _start);
        await this.validateInput(index_1.DATATYPES.NUMBER, _end);
        await this.validateInput(index_1.DATATYPES.NUMBER, _txDate);
        await this.validateInput(index_1.DATATYPES.STRING, _currency);
        return this.callContract(FUNCTIONS.GETENTRY, _start, _end, _txDate, this.sanitiseInput(index_1.DATATYPES.BYTE32, _currency), options);
    }
    async setBlock(_block, options) {
        await this.validateInput(index_1.DATATYPES.NUMBER, _block);
        return this.callContract(FUNCTIONS.SETBLOCK, _block, options);
    }
    async getBlock(options) {
        return this.callContract(FUNCTIONS.GETBLOCK);
    }
}
exports.default = HolderContract;
