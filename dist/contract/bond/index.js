"use strict";
// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const Bond_json_1 = require("../../abi/payments/Bond.json");
var FUNCTIONS;
(function (FUNCTIONS) {
    FUNCTIONS["REQUESTISSUE"] = "requestIssue";
    FUNCTIONS["REQUESTPURCHASE"] = "requestPurchase";
    FUNCTIONS["REQUESTREDEMPTION"] = "requestRedemption";
    FUNCTIONS["GETBONDS"] = "getBonds";
    FUNCTIONS["GETBONDISSUES"] = "getBondIssues";
    FUNCTIONS["GETBONDPURCHASES"] = "getBondPurchases";
    FUNCTIONS["ISSUE"] = "BondIssued";
    FUNCTIONS["REDEEM"] = "BondRedeemed";
    FUNCTIONS["PURCHASE"] = "BondPurchased";
    FUNCTIONS["LIQUIDATE"] = "BondLiquidated";
})(FUNCTIONS || (FUNCTIONS = {}));
class Bond extends index_1.VerifiedContract {
    constructor(signer, bondCurrencyAddress) {
        const address = bondCurrencyAddress;
        super(address, JSON.stringify(Bond_json_1.abi), signer);
        this.contractAddress = address;
    }
    async requestIssue(_amount, _payer, _currency, _cashContract, options) {
        await this.validateInput(index_1.DATATYPES.NUMBER, _amount);
        await this.validateInput(index_1.DATATYPES.ADDRESS, _payer);
        await this.validateInput(index_1.DATATYPES.STRING, _currency);
        await this.validateInput(index_1.DATATYPES.ADDRESS, _cashContract);
        return this.callContract(FUNCTIONS.REQUESTISSUE, _amount, _payer, this.sanitiseInput(index_1.DATATYPES.BYTE32, _currency), _cashContract, options);
    }
    async requestPurchase(_amount, _payer, _currency, _cashContract, options) {
        await this.validateInput(index_1.DATATYPES.NUMBER, _amount);
        await this.validateInput(index_1.DATATYPES.ADDRESS, _payer);
        await this.validateInput(index_1.DATATYPES.STRING, _currency);
        await this.validateInput(index_1.DATATYPES.ADDRESS, _cashContract);
        return this.callContract(FUNCTIONS.REQUESTPURCHASE, _amount, _payer, this.sanitiseInput(index_1.DATATYPES.BYTE32, _currency), _cashContract, options);
    }
    async requestRedemption(_amount, _payer, _currency, _tokenContract, options) {
        await this.validateInput(index_1.DATATYPES.NUMBER, _amount);
        await this.validateInput(index_1.DATATYPES.ADDRESS, _payer);
        await this.validateInput(index_1.DATATYPES.STRING, _currency);
        await this.validateInput(index_1.DATATYPES.ADDRESS, _tokenContract);
        return this.callContract(FUNCTIONS.REQUESTREDEMPTION, _amount, _payer, this.sanitiseInput(index_1.DATATYPES.BYTE32, _currency), _tokenContract, options);
    }
    /*
    * Gets bond issued address
    * @param ()
    * @returns address[] memory
    */
    async getBonds() {
        return this.callContract(FUNCTIONS.GETBONDS);
    }
    /**
    * Fetch bonds issued with their balance amounts to redeem [callable by client]
    * entries is count of results to return. Address[] has issued bond addresses, and uint[] has issued amount
    * @param ()
    * @returns (bytes16 parValue, bytes16 paidInAmount, bytes32 paidInCurrency, uint256 timeIssuedSubscribed)
    */
    async getBondIssues(_issuer, _bond, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _issuer);
        await this.validateInput(index_1.DATATYPES.ADDRESS, _bond);
        return this.callContract(FUNCTIONS.GETBONDISSUES, _issuer, _bond, options);
    }
    /**
    * Fetch bonds purchased with their purchased amounts [callable by client]
    * entries is count of results to return. Address[] has purchased bond addresses, and uint[] has purchased amount
    * @param ()
    * @returns (bytes16 parValue, bytes16 paidInAmount, bytes32 paidInCurrency, uint256 timeIssuedSubscribed)
    */
    async getBondPurchases(_issuer, _bond, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _issuer);
        await this.validateInput(index_1.DATATYPES.ADDRESS, _bond);
        return this.callContract(FUNCTIONS.GETBONDPURCHASES, _issuer, _bond, options);
    }
    /*
    emits event BondIssued(address indexed _token, address issuer, uint256 issuedAmount, bytes32 collateralCurrency, uint256 collateralValue);
    */
    notifyBondIssue(callback) {
        this.getEvent(FUNCTIONS.ISSUE, callback);
    }
    /*
    emits event BondRedeemed(address indexed _token, address redeemedBy, uint256 redemptionAmount, bytes32 redemptionCurrency);
    */
    notifyBondRedemption(callback) {
        this.getEvent(FUNCTIONS.REDEEM, callback);
    }
    /*
    emits event BondPurchased(address indexed _token, address purchaser, uint256 purchasedAmount, bytes32 paidInCurrency, uint256 paidInAmount);
    */
    notifyBondPurchase(callback) {
        this.getEvent(FUNCTIONS.PURCHASE, callback);
    }
    /*
    emits event BondLiquidated(address indexed _token, address redeemedBy, uint256 redemptionAmount, bytes32 redemptionCurrency);
    */
    notifyBondLiquidation(callback) {
        this.getEvent(FUNCTIONS.LIQUIDATE, callback);
    }
}
exports.default = Bond;
