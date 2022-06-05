"use strict";
// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const Ledger_json_1 = require("../../abi/accounts/Ledger.json");
var FUNCTIONS;
(function (FUNCTIONS) {
    FUNCTIONS["CREATEACCOUNT"] = "createAccount";
})(FUNCTIONS || (FUNCTIONS = {}));
class LedgerContract extends index_1.VerifiedContract {
    constructor(signer, ledgerAddress) {
        const address = ledgerAddress;
        super(address, JSON.stringify(Ledger_json_1.abi), signer);
        this.contractAddress = address;
    }
    /**
     * Once the general ledgers are set up, accounts need to be created for each party that the issuer or investor transacts with.
     * For example, a issuer can be a counter party for an investor. An investor who buys a bond from another investor will also
     * become its counter party. Accounts need to be created using the following solidity function using the party/counterparty’s address
     * @param (address _account, bytes32 _currency)
     * @returns
     */
    async createAccount(_accountName, _currency, options) {
        await this.validateInput(index_1.DATATYPES.STRING, _accountName);
        await this.validateInput(index_1.DATATYPES.STRING, _currency);
        return this.callContract(FUNCTIONS.CREATEACCOUNT, this.sanitiseInput(index_1.DATATYPES.BYTE32, _accountName), this.sanitiseInput(index_1.DATATYPES.BYTE32, _currency)); //, options)
    }
}
exports.default = LedgerContract;
