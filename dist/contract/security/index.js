"use strict";
// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const Security_json_1 = require("../../abi/securities/Security.json");
var FUNCTIONS;
(function (FUNCTIONS) {
    FUNCTIONS["WHITELIST"] = "whiteList";
    FUNCTIONS["TRANSFER"] = "transfer";
    FUNCTIONS["APPROVE"] = "approve";
    FUNCTIONS["TRANSFERFROM"] = "transferFrom";
    FUNCTIONS["INCREASEALLOWANCE"] = "increaseAllowance";
    FUNCTIONS["DECREASEALLOWANCE"] = "decreaseAllowance";
    FUNCTIONS["FREEZE"] = "freeze";
    FUNCTIONS["UNFREEZE"] = "unfreeze";
    FUNCTIONS["FROZEN"] = "frozen";
    FUNCTIONS["BURN"] = "burn";
    FUNCTIONS["BURNALL"] = "burnAll";
    FUNCTIONS["SCHEDULE"] = "scheduleSnapshot";
    FUNCTIONS["RESCHEDULE"] = "rescheduleSnapshot";
    FUNCTIONS["UNSCHEDULE"] = "unscheduleSnapshot";
    FUNCTIONS["CREATERESOLUTION"] = "createResolution";
    FUNCTIONS["COUNTVOTES"] = "countVotes";
    FUNCTIONS["PAYOUTPRORATA"] = "payoutProrata";
    FUNCTIONS["PAYOUT"] = "payout";
    FUNCTIONS["PAUSE"] = "pause";
    FUNCTIONS["UNPAUSE"] = "unpause";
    FUNCTIONS["WITHDRAWFUNDS"] = "withdrawFunds";
    FUNCTIONS["PUSHFUNDS"] = "pushFunds";
    FUNCTIONS["UPDATEFUNDSRECEIVED"] = "updateFundsReceived";
    FUNCTIONS["WITHDRAWABLEFUNDSOF"] = "withdrawableFundsOf";
    FUNCTIONS["WITHDRAWNFUNDSOF"] = "withdrawnFundsOf";
    FUNCTIONS["ACCUMULATIVEFUNDSOF"] = "accumulativeFundsOf";
})(FUNCTIONS || (FUNCTIONS = {}));
class Security extends index_1.VerifiedContract {
    constructor(signer, tokenAddress) {
        const address = tokenAddress;
        super(address, JSON.stringify(Security_json_1.abi), signer);
        this.contractAddress = address;
    }
    async whiteList(_spender, _amount, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _spender);
        await this.validateInput(index_1.DATATYPES.NUMBER, _amount);
        return this.callContract(FUNCTIONS.WHITELIST, _spender, _amount, options);
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
    async transferFrom(_spender, _recipient, _amount, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _spender);
        await this.validateInput(index_1.DATATYPES.ADDRESS, _recipient);
        await this.validateInput(index_1.DATATYPES.NUMBER, _amount);
        return this.callContract(FUNCTIONS.TRANSFERFROM, _spender, _recipient, _amount, options);
    }
    async increaseAllowance(_spender, _amount, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _spender);
        await this.validateInput(index_1.DATATYPES.NUMBER, _amount);
        return this.callContract(FUNCTIONS.INCREASEALLOWANCE, _spender, _amount, options);
    }
    async decreaseAllowance(_spender, _amount, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _spender);
        await this.validateInput(index_1.DATATYPES.NUMBER, _amount);
        return this.callContract(FUNCTIONS.DECREASEALLOWANCE, _spender, _amount, options);
    }
    async freeze(_holder, _amount, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _holder);
        await this.validateInput(index_1.DATATYPES.NUMBER, _amount);
        return this.callContract(FUNCTIONS.FREEZE, _holder, _amount, options);
    }
    async unfreeze(_holder, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _holder);
        return this.callContract(FUNCTIONS.UNFREEZE, _holder, options);
    }
    async frozen(_account, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _holder);
        return this.callContract(FUNCTIONS.FROZEN, _account, options);
    }
    async burn(_holder, _amount, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _holder);
        await this.validateInput(index_1.DATATYPES.NUMBER, _amount);
        return this.callContract(FUNCTIONS.BURN, _holder, _amount, options);
    }
    async burnAll(options) {
        return this.callContract(FUNCTIONS.BURNALL, options);
    }
    async schedule(_time, options) {
        await this.validateInput(index_1.DATATYPES.NUMBER, _time);
        return this.callContract(FUNCTIONS.SCHEDULE, _time, options);
    }
    async reschedule(_oldtime, _newtime, options) {
        await this.validateInput(index_1.DATATYPES.NUMBER, _oldtime);
        await this.validateInput(index_1.DATATYPES.NUMBER, _newtime);
        return this.callContract(FUNCTIONS.RESCHEDULE, _oldtime, _newtime, options);
    }
    async unschedule(_time, options) {
        await this.validateInput(index_1.DATATYPES.NUMBER, _time);
        return this.callContract(FUNCTIONS.UNSCHEDULE, _time, options);
    }
    async createResolution(_time, _votes, _ipfslink, options) {
        await this.validateInput(index_1.DATATYPES.NUMBER, _time);
        await this.validateInput(index_1.DATATYPES.BOOLEAN, _votes);
        await this.validateInput(index_1.DATATYPES.STRING, _ipfslink);
        return this.callContract(FUNCTIONS.CREATERESOLUTION, _time, _votes, _ipfslink, options);
    }
    async countVotes(_time, options) {
        await this.validateInput(index_1.DATATYPES.NUMBER, _time);
        return this.callContract(FUNCTIONS.COUNTVOTES, _time, options);
    }
    async payoutProrata(_time, _wallet, _token, _amount, options) {
        await this.validateInput(index_1.DATATYPES.NUMBER, _time);
        await this.validateInput(index_1.DATATYPES.ADDRESS, _wallet);
        await this.validateInput(index_1.DATATYPES.ADDRESS, _token);
        await this.validateInput(index_1.DATATYPES.NUMBER, _amount);
        return this.callContract(FUNCTIONS.PAYOUTPRORATA, _time, _wallet, _token, _amount, options);
    }
    async payout(_time, _holder, _wallet, _token, _amount, options) {
        await this.validateInput(index_1.DATATYPES.NUMBER, _time);
        await this.validateInput(index_1.DATATYPES.ADDRESS, _holder);
        await this.validateInput(index_1.DATATYPES.ADDRESS, _wallet);
        await this.validateInput(index_1.DATATYPES.ADDRESS, _token);
        await this.validateInput(index_1.DATATYPES.NUMBER, _amount);
        return this.callContract(FUNCTIONS.PAYOUT, _time, _holder, _wallet, _token, _amount, options);
    }
    async pause(options) {
        return this.callContract(FUNCTIONS.PAUSE, options);
    }
    async unpause(options) {
        return this.callContract(FUNCTIONS.UNPAUSE, options);
    }
    async withdrawableFundsOf(_holder, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _holder);
        return this.callContract(FUNCTIONS.WITHDRAWABLEFUNDSOF, _holder, options);
    }
    async withdrawnFundsOf(_holder, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _holder);
        return this.callContract(FUNCTIONS.WITHDRAWNFUNDSOF, _holder, options);
    }
    async accumulativeFundsOf(_holder, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _holder);
        return this.callContract(FUNCTIONS.ACCUMULATIVEFUNDSOF, _holder, options);
    }
    async withdrawFunds(options) {
        return this.callContract(FUNCTIONS.WITHDRAWFUNDS, options);
    }
    async pushFunds(_holder, options) {
        return this.callContract(FUNCTIONS.PUSHFUNDS, _holder, options);
    }
    async updateFundsReceived(options) {
        return this.callContract(FUNCTIONS.UPDATEFUNDSRECEIVED, options);
    }
}
exports.default = Security;
