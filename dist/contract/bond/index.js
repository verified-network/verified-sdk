"use strict";
// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const Bond_json_1 = require("../../abi/payments/Bond.json");
var FUNCTIONS;
(function (FUNCTIONS) {
    FUNCTIONS["GETBONDS"] = "getBonds";
    FUNCTIONS["GETBONDISSUES"] = "getBondIssues";
    FUNCTIONS["GETBONDPURCHASES"] = "getBondPurchases";
    FUNCTIONS["ISSUE"] = "BondIssued";
    FUNCTIONS["REDEEM"] = "BondRedeemed";
    FUNCTIONS["PURCHASE"] = "BondPurchased";
    FUNCTIONS["LIQUIDATE"] = "BondLiquidated";
    FUNCTIONS["SETSIGNER"] = "setSigner";
    FUNCTIONS["REQUESTISSUEFROML1"] = "requestIssueFromL1";
})(FUNCTIONS || (FUNCTIONS = {}));
class BondContract extends index_1.VerifiedContract {
    constructor(signer, bondCurrencyAddress) {
        const address = bondCurrencyAddress;
        super(address, JSON.stringify(Bond_json_1.abi), signer);
        this.contractAddress = address;
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
    /**
        Sets signer to verify bridge
        @param  _signer  address of signer that can only be set by owner of bridge
     */
    async setSigner(_signer, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _signer);
        return this.callContract(FUNCTIONS.SETSIGNER, _signer, options);
    }
    async requestIssueFromL1(_amount, _buyer, _currency, _hashedMessage, _v, _r, _s, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _buyer);
        await this.validateInput(index_1.DATATYPES.NUMBER, _amount);
        return this.callContract(FUNCTIONS.REQUESTISSUEFROML1, _amount, _buyer, this.sanitiseInput(index_1.DATATYPES.BYTE32, _currency), _hashedMessage, _v, _r, _s, options);
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
exports.default = BondContract;
