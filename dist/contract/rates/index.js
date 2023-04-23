"use strict";
// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const Rates_json_1 = require("../../abi/payments/Rates.json");
var FUNCTIONS;
(function (FUNCTIONS) {
    FUNCTIONS["SETFEETO"] = "setFeeTo";
    FUNCTIONS["GETFEE"] = "getFee";
    FUNCTIONS["SETFEETOSETTER"] = "setFeeToSetter";
    FUNCTIONS["SETCUSTODIAN"] = "setCustodian";
    FUNCTIONS["GETFEETOSETTER"] = "getFeeToSetter";
    FUNCTIONS["GETCUSTODIAN"] = "getCustodian";
})(FUNCTIONS || (FUNCTIONS = {}));
class Rates extends index_1.VerifiedContract {
    constructor(signer, contractNetworkAddress) {
        const address = contractNetworkAddress;
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
    async setCustodian(_custodian, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _custodian);
        return this.callContract(FUNCTIONS.SETCUSTODIAN, _custodian, options);
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
}
exports.default = Rates;
