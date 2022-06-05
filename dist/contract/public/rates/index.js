"use strict";
// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
const Rates_json_1 = require("../../../abi/deposits/Rates.json");
var FUNCTIONS;
(function (FUNCTIONS) {
    FUNCTIONS["SETFEETO"] = "setFeeTo";
    FUNCTIONS["SETFEETOSETTER"] = "setFeeToSetter";
    FUNCTIONS["SETMARGIN"] = "setMargin";
    FUNCTIONS["SETTREASURY"] = "setTreasury";
    FUNCTIONS["SETCUSTODIAN"] = "setCustodian";
    FUNCTIONS["GETMARGIN"] = "getMargin";
    FUNCTIONS["GETFEE"] = "getFee";
    FUNCTIONS["GETFEETOSETTER"] = "getFeeToSetter";
    FUNCTIONS["GETCUSTODIAN"] = "getCustodian";
    FUNCTIONS["TRANSFERTOCUSTODY"] = "transferToCustody";
})(FUNCTIONS || (FUNCTIONS = {}));
class VerifiedRates extends index_1.VerifiedContract {
    constructor(signer) {
        const chainId = Object.keys(Rates_json_1.networks);
        const address = Rates_json_1.networks[chainId].address;
        super(address, JSON.stringify(Rates_json_1.abi), signer);
        this.contractAddress = address;
    }
    async setFeeTo(_feeTo, _fee, _feeType, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _feeTo);
        await this.validateInput(index_1.DATATYPES.NUMBER, _fee);
        await this.validateInput(index_1.DATATYPES.STRING, _feeType);
        return this.callContract(FUNCTIONS.SETFEETO, _feeTo, _fee, this.sanitiseInput(index_1.DATATYPES.BYTE32, _feeType), options);
    }
    async setFeeToSetter(_feeToSetter, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _feeToSetter);
        return this.callContract(FUNCTIONS.SETFEETOSETTER, _feeToSetter, options);
    }
    async setMargin(_margin, _asset, options) {
        await this.validateInput(index_1.DATATYPES.NUMBER, _margin);
        await this.validateInput(index_1.DATATYPES.STRING, _asset);
        return this.callContract(FUNCTIONS.SETMARGIN, _margin, this.sanitiseInput(index_1.DATATYPES.BYTE32, _asset), options);
    }
    async setTreasury(_treasury, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _treasury);
        return this.callContract(FUNCTIONS.SETTREASURY, _treasury, options);
    }
    async setCustodian(_custodian, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _custodian);
        return this.callContract(FUNCTIONS.SETCUSTODIAN, _custodian, options);
    }
    async getMargin(_asset, options) {
        await this.validateInput(index_1.DATATYPES.STRING, _asset);
        return this.callContract(FUNCTIONS.GETMARGIN, this.sanitiseInput(index_1.DATATYPES.BYTE32, _asset), options);
    }
    async getFee(_feeType, options) {
        await this.validateInput(index_1.DATATYPES.STRING, _feeType);
        return this.callContract(FUNCTIONS.GETFEE, this.sanitiseInput(index_1.DATATYPES.BYTE32, _feeType), options);
    }
    async getFeeToSetter() {
        return this.callContract(FUNCTIONS.GETFEETOSETTER);
    }
    async getCustodian() {
        return this.callContract(FUNCTIONS.GETCUSTODIAN);
    }
    async transferToCustody(_percent, _transferFrom, options) {
        await this.validateInput(index_1.DATATYPES.NUMBER, _percent);
        await this.validateInput(index_1.DATATYPES.ADDRESS, _transferFrom);
        return this.callContract(FUNCTIONS.TRANSFERTOCUSTODY, _percent, _transferFrom, options);
    }
}
exports.default = VerifiedRates;
