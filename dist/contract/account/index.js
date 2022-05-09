"use strict";
// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const Account_json_1 = require("../../abi/accounts/Account.json");
var FUNCTIONS;
(function (FUNCTIONS) {
    FUNCTIONS["POSTENTRY"] = "postEntry";
})(FUNCTIONS || (FUNCTIONS = {}));
class AccountContract extends index_1.VerifiedContract {
    constructor(signer, accountAddress) {
        const chainId = signer.provider._network.chainId.toString();
        const address = accountAddress;
        super(address, JSON.stringify(Account_json_1.abi), signer);
        this.contractAddress = address;
    }
    /**
     * For each transaction, an account entry needs to be posted using the following solidity function.
     * Where, _vchType is voucher type and can be either ‘Journal’ , ‘Cash, ‘Bank, ‘Sale’ or ‘Purchase'.
     * @param (address _account, bytes32 _accountNumber, int256 _txAmount, bytes32 _txType, bytes32 _txDate, bytes32 _txDescription, bytes32 _vchType)
     *
     */
    async postEntry(_counterParty, _txAmount, _txType, _txDate, _txDescription, _vchType, _txHash, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _counterParty);
        await this.validateInput(index_1.DATATYPES.NUMBER, _txAmount);
        await this.validateInput(index_1.DATATYPES.NUMBER, _txDate);
        await this.validateInput(index_1.DATATYPES.STRING, _txType);
        await this.validateInput(index_1.DATATYPES.STRING, _txDescription);
        await this.validateInput(index_1.DATATYPES.STRING, _vchType);
        await this.validateInput(index_1.DATATYPES.STRING, _txHash);
        return this.callContract(FUNCTIONS.POSTENTRY, _counterParty, _txAmount, this.sanitiseInput(index_1.DATATYPES.BYTE32, _txType), _txDate, this.sanitiseInput(index_1.DATATYPES.BYTE32, _txDescription), this.sanitiseInput(index_1.DATATYPES.BYTE32, _vchType), _txHash, options);
    }
}
exports.default = AccountContract;
