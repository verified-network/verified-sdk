"use strict";
// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const Cash_json_1 = require("../../abi/payments/Cash.json");
var FUNCTIONS;
(function (FUNCTIONS) {
    FUNCTIONS["PAYIN"] = "payIn";
    FUNCTIONS["REQUESTISSUE"] = "requestIssue";
    FUNCTIONS["BURNCASHTOKENS"] = "burnCashTokens";
    FUNCTIONS["TRANSFERFROM"] = "transferFrom";
    FUNCTIONS["BALANCE"] = "balanceOf";
    FUNCTIONS["ISSUE"] = "CashIssued";
    FUNCTIONS["REDEEM"] = "CashRedeemed";
    FUNCTIONS["TRANSFER"] = "CashTransfer";
    FUNCTIONS["EXCHANGE"] = "CashDeposits";
})(FUNCTIONS || (FUNCTIONS = {}));
class Cash extends index_1.VerifiedContract {
    constructor(signer, currencyAddress) {
        const address = currencyAddress;
        super(address, JSON.stringify(Cash_json_1.abi), signer);
        this.contractAddress = address;
    }
    /**
     * Request pay out [callable by manager]
     * @param (uint256 _tokens, address _payer, bytes32 _currency, address _sender)
     * @returns boolean
     */
    async payIn(_tokens, _payer, _currency, options) {
        await this.validateInput(index_1.DATATYPES.NUMBER, _tokens);
        await this.validateInput(index_1.DATATYPES.ADDRESS, _payer);
        await this.validateInput(index_1.DATATYPES.STRING, _currency);
        return this.callContract(FUNCTIONS.PAYIN, _tokens, _payer, this.sanitiseInput(index_1.DATATYPES.BYTE32, _currency), options);
    }
    async requestIssue(_amount, _buyer, _currency, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _buyer);
        await this.validateInput(index_1.DATATYPES.NUMBER, _amount);
        await this.validateInput(index_1.DATATYPES.STRING, _currency);
        return this.callContract(FUNCTIONS.REQUESTISSUE, _amount, _buyer, this.sanitiseInput(index_1.DATATYPES.BYTE32, _currency), options);
    }
    async burnCashTokens(_tokens, _payer, _currency, options) {
        await this.validateInput(index_1.DATATYPES.NUMBER, _tokens);
        await this.validateInput(index_1.DATATYPES.ADDRESS, _payer);
        await this.validateInput(index_1.DATATYPES.STRING, _currency);
        return this.callContract(FUNCTIONS.BURNCASHTOKENS, _tokens, _payer, this.sanitiseInput(index_1.DATATYPES.BYTE32, _currency), options);
    }
    /**
    * An investor can also request cash tokens from Verified by paying in another cash token.
    * For example, an investor can request a USD cash token by paying in a EUR cash token.
    * where, the sender is the address of cash token paid in, the receiver is the address of the cash token converted to
    * and the tokens parameter is a numeric specifying number of cash tokens paid in.
    * @param (address sender, address receiver, uint256 tokens)
    * @returns boolean
    */
    async transferFrom(_senderAddress, _recieverAddress, _tokens, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _senderAddress);
        await this.validateInput(index_1.DATATYPES.ADDRESS, _recieverAddress);
        await this.validateInput(index_1.DATATYPES.NUMBER, _tokens);
        return this.callContract(FUNCTIONS.TRANSFERFROM, _senderAddress, _recieverAddress, _tokens, options);
    }
    /* Request balance of wallet in contract
    */
    async balanceOf(_wallet, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _wallet);
        return this.callContract(FUNCTIONS.BALANCE, _wallet, options);
    }
    /*
    emits event CashIssued(address indexed _party, bytes32 currency, uint256 amount);
    */
    notifyCashIssue(callback) {
        this.getEvent(FUNCTIONS.ISSUE, callback);
    }
    /*
    emits event CashRedeemed(address indexed _party, bytes32 currency, bytes16 amount);
    */
    notifyCashRedemption(callback) {
        this.getEvent(FUNCTIONS.REDEEM, callback);
    }
    /*
    emits event CashTransfer(address indexed from, address indexed to, uint tokens);
    */
    notifyCashTransfer(callback) {
        this.getEvent(FUNCTIONS.TRANSFER, callback);
    }
    /*
    emits event CashDeposits(address indexed depositor, bytes32 currency, bytes16 amount);
    */
    notifyCashExchange(callback) {
        this.getEvent(FUNCTIONS.EXCHANGE, callback);
    }
}
exports.default = Cash;
