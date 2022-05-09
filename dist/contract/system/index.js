"use strict";
// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const System_json_1 = require("../../abi/accounts/System.json");
var FUNCTIONS;
(function (FUNCTIONS) {
    FUNCTIONS["CREATEHOLDER"] = "createHolder";
    FUNCTIONS["GETACCOUNTHOLDER"] = "getAccountHolder";
    FUNCTIONS["GETACCOUNTHOLDERS"] = "getAccountHolders";
    FUNCTIONS["GETACCOUNTLEDGER"] = "getAccountLedger";
    FUNCTIONS["GETLEDGERACCOUNT"] = "getLedgerAccount";
    FUNCTIONS["GETHOLDERDETAILS"] = "getHolderDetails";
    FUNCTIONS["GETLEDGERDETAILS"] = "getLedgerDetails";
    FUNCTIONS["GETLEDGERACCOUNTS"] = "getLedgerAccounts";
    FUNCTIONS["GETACCOUNTDETAILS"] = "getAccountDetails";
    FUNCTIONS["GETACCOUNTLEDGERS"] = "getAccountLedgers";
})(FUNCTIONS || (FUNCTIONS = {}));
class SystemContract extends index_1.VerifiedContract {
    constructor(signer) {
        const chainId = signer.provider._network.chainId.toString();
        const address = System_json_1.networks[chainId].address;
        super(address, JSON.stringify(System_json_1.abi), signer);
        this.contractAddress = address;
    }
    /**
     * When an investor or issuer account is set up, the Verified Dapp needs to set up its account. Where, the _holderName is the name or ID of the issuer or investor, and _accountHolder is the address of the issuer or investor. The accoun.older’s address can be obtained by calling on the Account system the following solidity function
     * @param (bytes32 _holderName, address _accountHolder)
     * @returns {address}
     */
    async createHolder(_holderName, _accountHolder, options) {
        await this.validateInput(index_1.DATATYPES.STRING, _holderName);
        await this.validateInput(index_1.DATATYPES.ADDRESS, _accountHolder);
        return this.callContract(FUNCTIONS.CREATEHOLDER, this.sanitiseInput(index_1.DATATYPES.BYTE32, _holderName), _accountHolder, options);
    }
    /**
    * The account holder’s address can be obtained by calling on the Account system the following solidity function.
    * @param (address counterParty))
    * @returns [address]
    * _accountCreator is the client that created the account holders. Returns address array of account holders
    */
    async getAccountHolder(_counterPartyAddress, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _counterPartyAddress);
        return this.callContract(FUNCTIONS.GETACCOUNTHOLDER, _counterPartyAddress, options);
    }
    /**
     * The account holder’s address can be obtained by calling on the Account system the following solidity function.
     * @param (address accountCreator)
     * @returns [address]
     * _accountCreator is the client that created the account holders. Returns address array of account holders
     */
    async getAccountHolders(_accountCreatorAddress, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _accountCreatorAddress);
        return this.callContract(FUNCTIONS.GETACCOUNTHOLDERS, _accountCreatorAddress, options);
    }
    /**
     * The account ledger address can be obtained by calling the following function on the Account system contract
     * @param (address accountHolder)
     * @returns (address[] memory)
     * _accountHolder is the account holder for which the ledger was created in 5.3. Returns address array of ledgers.
     */
    async getAccountLedger(_accountHolderAddress, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _accountHolderAddress);
        return this.callContract(FUNCTIONS.GETACCOUNTLEDGER, _accountHolderAddress, options);
    }
    /**
     * Get list of account ledgers
     * @param (address _accountLedger)
     * @returns (address[] memory)
     * _accountLedger is the ledger in which the accounts were created in createAccount()
     */
    async getLedgerAccount(_accountLedgerAddress, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _accountLedgerAddress);
        return this.callContract(FUNCTIONS.GETLEDGERACCOUNT, _accountLedgerAddress, options);
    }
    /**
     * Get list of account ledgers
     * @param (address _accountLedger)
     * @returns (address[] memory)
     * _accountLedger is the ledger in which the accounts were created in createAccount()
     */
    async getLedgerAccounts(_accountLedgerAddress, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _accountLedgerAddress);
        return this.callContract(FUNCTIONS.GETLEDGERACCOUNTS, _accountLedgerAddress, options);
    }
    /**
     * Get account holder details
     * @param (address accountLedger)
     * @returns bytes32
     * _holder is any one of the account holders returned in getAccountHolders()
     */
    async getHolderDetails(_holder, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _holder);
        return this.callContract(FUNCTIONS.GETHOLDERDETAILS, _holder, options);
    }
    /**
   * Get list of account ledgers
   * @param (address _ledger)
   * @returns bytes32
   * _ledger is the any of the ledgers returned in getAccountLedgers()
   */
    async getLedgerDetails(_ledger, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _ledger);
        return this.callContract(FUNCTIONS.GETLEDGERDETAILS, _ledger, options);
    }
    /**
     * Get list of account ledgers
     * @param (address _account)
     * @returns (bytes32, bytes32)
     * _account is any of the accounts returned in getLedgerAccounts()
     */
    async getAccountDetails(_account, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _account);
        return this.callContract(FUNCTIONS.GETACCOUNTDETAILS, _account, options);
    }
    /**
    * The account ledger address can be obtained by calling the following function on the Account system contract
    * @param (address accountHolder)
    * @returns (address[] memory)
    * _accountHolder is the account holder for which the ledger was created in 5.3. Returns address array of ledgers.
    */
    async getAccountLedgers(_accountHolderAddress, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _accountHolderAddress);
        return this.callContract(FUNCTIONS.GETACCOUNTLEDGERS, _accountHolderAddress, options);
    }
}
exports.default = SystemContract;
