"use strict";
// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const ERC20_json_1 = require("../../abi/payments/ERC20.json");
var FUNCTIONS;
(function (FUNCTIONS) {
    FUNCTIONS["NAME"] = "name";
    FUNCTIONS["SYMBOL"] = "symbol";
    FUNCTIONS["TOTALSUPPLY"] = "totalSupply";
    FUNCTIONS["BALANCE"] = "balanceOf";
    FUNCTIONS["TRANSFER"] = "transfer";
    FUNCTIONS["APPROVE"] = "approve";
    FUNCTIONS["ALLOWANCE"] = "allowance";
    FUNCTIONS["TRANSFERFROM"] = "transferFrom";
    FUNCTIONS["INCREASEALLOWANCE"] = "increaseAllowance";
    FUNCTIONS["DECREASEALLOWANCE"] = "decreaseAllowance";
})(FUNCTIONS || (FUNCTIONS = {}));
class ERC20 extends index_1.VerifiedContract {
    constructor(signer, contractNetworkAddress) {
        const address = contractNetworkAddress;
        super(address, JSON.stringify(ERC20_json_1.abi), signer);
        this.contractAddress = address;
    }
    async name() {
        return this.callContract(FUNCTIONS.NAME);
    }
    async symbol() {
        return this.callContract(FUNCTIONS.SYMBOL);
    }
    async totalSupply() {
        return this.callContract(FUNCTIONS.TOTALSUPPLY);
    }
    async balanceOf(_account, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _account);
        return this.callContract(FUNCTIONS.BALANCE, _account, options);
    }
    async transfer(_recipient, _amount, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _recipient);
        await this.validateInput(index_1.DATATYPES.NUMBER, _amount);
        return this.callContract(FUNCTIONS.TRANSFER, _recipient, _amount, options);
    }
    async approve(_spender, _amount, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _spender);
        await this.validateInput(index_1.DATATYPES.NUMBER, _amount);
        return this.callContract(FUNCTIONS.APPROVE, _spender, _amount, options);
    }
    async allowance(_owner, _spender, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _spender);
        await this.validateInput(index_1.DATATYPES.ADDRESS, _owner);
        return this.callContract(FUNCTIONS.ALLOWANCE, _owner, _spender, options);
    }
    async increaseAllowance(_spender, _addedValue, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _spender);
        await this.validateInput(index_1.DATATYPES.NUMBER, _addedValue);
        return this.callContract(FUNCTIONS.INCREASEALLOWANCE, _spender, _addedValue, options);
    }
    async decreaseAllowance(_spender, _subtractedValue, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _spender);
        await this.validateInput(index_1.DATATYPES.NUMBER, _subtractedValue);
        return this.callContract(FUNCTIONS.DECREASEALLOWANCE, _spender, _subtractedValue, options);
    }
    async transferFrom(_senderAddress, _recieverAddress, _tokens, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _senderAddress);
        await this.validateInput(index_1.DATATYPES.ADDRESS, _recieverAddress);
        await this.validateInput(index_1.DATATYPES.NUMBER, _tokens);
        return this.callContract(FUNCTIONS.TRANSFERFROM, _senderAddress, _recieverAddress, _tokens, options);
    }
}
exports.default = ERC20;
