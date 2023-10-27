"use strict";
// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const VerifiedMarkets_json_1 = require("../../../abi/loans/compound/VerifiedMarkets.json");
var FUNCTIONS;
(function (FUNCTIONS) {
    FUNCTIONS["NEWRWA"] = "submitNewRWA";
    FUNCTIONS["POSTCOLLATERAL"] = "postCollateral";
    FUNCTIONS["BORROW"] = "borrowBase";
    FUNCTIONS["REPAY"] = "repayBase";
})(FUNCTIONS || (FUNCTIONS = {}));
class Compound extends index_1.VerifiedContract {
    constructor(signer, contractNetworkAddress) {
        const address = contractNetworkAddress;
        super(address, JSON.stringify(VerifiedMarkets_json_1.abi), signer);
        this.contractAddress = address;
    }
    setSigner(_address) {
        return this.callContract(FUNCTIONS.SETSIGNER, _address);
    }
    /**
   * Submits new RWA to Compound
   * @params (address asset, address bond, uint256 apy, string memory issuingDocs, uint256 faceValue)
   * @returns
   */
    async submitNewRWA(asset, bond, apy, issuingDocs, faceValue, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, asset);
        await this.validateInput(index_1.DATATYPES.ADDRESS, bond);
        await this.validateInput(index_1.DATATYPES.NUMBER, apy);
        await this.validateInput(index_1.DATATYPES.STRING, issuingDocs);
        await this.validateInput(index_1.DATATYPES.NUMBER, faceValue);
        return this.callContract(FUNCTIONS.NEWRWA, asset, bond, apy, issuingDocs, faceValue, options);
    }
    /**
     * Posts collateral to Compound
     * @params (address asset, address collateral, uint256 amount)
     * @returns
     */
    async postCollateral(asset, collateral, amount, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, asset);
        await this.validateInput(index_1.DATATYPES.ADDRESS, collateral);
        await this.validateInput(index_1.DATATYPES.NUMBER, amount);
        return this.callContract(FUNCTIONS.POSTCOLLATERAL, asset, collateral, amount, options);
    }
    /**
     * Borrows from Compound
     * @params (address base, uint256 amount)
     * @returns
     */
    async borrowBase(base, amount, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, base);
        await this.validateInput(index_1.DATATYPES.NUMBER, amount);
        return this.callContract(FUNCTIONS.BORROW, base, amount, options);
    }
    /**
     * Repays to Compound
     * @params (address base, uint256 amount)
     * @returns
     */
    async repayBase(base, amount, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, base);
        await this.validateInput(index_1.DATATYPES.NUMBER, amount);
        return this.callContract(FUNCTIONS.REPAY, base, amount, options);
    }
}
exports.default = Compound;
