"use strict";
// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
const Distribution_json_1 = require("../../../abi/L1distribution/Distribution.json");
var FUNCTIONS;
(function (FUNCTIONS) {
    FUNCTIONS["ADDREVENUESHAREHOLDER"] = "addRevenueShareholder";
    FUNCTIONS["GETREVENUESHAREHOLDER"] = "getRevenueShareholders";
    FUNCTIONS["GETPAYMENTFEECOLLECTED"] = "getPaymentFeeCollected";
    FUNCTIONS["GETLOANFEECOLLECTED"] = "getLoanFeeCollected";
    FUNCTIONS["SHAREFEE"] = "shareFee";
})(FUNCTIONS || (FUNCTIONS = {}));
class DistributionContract extends index_1.VerifiedContract {
    constructor(signer) {
        const chainId = signer.provider._network.chainId.toString();
        const address = Distribution_json_1.networks[chainId].address;
        super(address, JSON.stringify(Distribution_json_1.abi), signer);
        this.contractAddress = address;
    }
    /**
        Shares fee income with revenue shareholders
     */
    async shareFee() {
        return this.callContract(FUNCTIONS.SHAREFEE);
    }
    /**
        Gets payment fee collected
        @param  _currency   payment fee in currency collected
     */
    async getPaymentFeeCollected(_currency, options) {
        await this.validateInput(index_1.DATATYPES.STRING, _currency);
        return this.callContract(FUNCTIONS.GETPAYMENTFEECOLLECTED, this.sanitiseInput(index_1.DATATYPES.BYTE32, _currency), options);
    }
    /**
        Gets loan fee collected
        @param  _currency   loan fee in currency collected
     */
    async getLoanFeeCollected(_currency, options) {
        await this.validateInput(index_1.DATATYPES.STRING, _currency);
        return this.callContract(FUNCTIONS.GETLOANFEECOLLECTED, this.sanitiseInput(index_1.DATATYPES.BYTE32, _currency), options);
    }
    /**
        Get revenue shareholders
        @param  _type       type of shareholder, ie, 'BUSINESS' or 'OPERATOR'
        @param  _currency   currency revenue is collected
     */
    async getRevenueShareholders(_type, _currency, options) {
        await this.validateInput(index_1.DATATYPES.STRING, _type);
        await this.validateInput(index_1.DATATYPES.STRING, _currency);
        return this.callContract(FUNCTIONS.GETREVENUESHAREHOLDER, this.sanitiseInput(index_1.DATATYPES.BYTE32, _type), this.sanitiseInput(index_1.DATATYPES.BYTE32, _currency), options);
    }
    /**
        Add revenue shareholders
        @param  _type           type of shareholder, ie, 'BUSINESS' or 'OPERATOR'
        @param  _shareholder    address of shareholder to add
        @param  _currency       currency revenue is collected
     */
    async addRevenueShareholder(_type, _shareholder, _currency, options) {
        await this.validateInput(index_1.DATATYPES.STRING, _type);
        await this.validateInput(index_1.DATATYPES.STRING, _shareholder);
        await this.validateInput(index_1.DATATYPES.STRING, _currency);
        return this.callContract(FUNCTIONS.ADDREVENUESHAREHOLDER, this.sanitiseInput(index_1.DATATYPES.BYTE32, _type), _shareholder, this.sanitiseInput(index_1.DATATYPES.BYTE32, _currency), options);
    }
}
exports.default = DistributionContract;
