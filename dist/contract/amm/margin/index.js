"use strict";
// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
const MarginIssueManager_json_1 = require("../../../abi/assetmanager/balancer/MarginIssueManager.json");
var FUNCTIONS;
(function (FUNCTIONS) {
    FUNCTIONS["ISSUEPRODUCT"] = "issueProduct";
    FUNCTIONS["CLOSE"] = "close";
    FUNCTIONS["OFFERCOLLATERAL"] = "offerCollateral";
    FUNCTIONS["SENDCOLLATERAL"] = "sendCollateral";
    FUNCTIONS["GETCOLLATERAL"] = "getCollateral";
    FUNCTIONS["GETUSERCOLLATERAL"] = "getUserCollateral";
    FUNCTIONS["ONMATCH"] = "onMatch";
    FUNCTIONS["ONTRADE"] = "onTrade";
    FUNCTIONS["ONSETTLE"] = "onSettle";
    FUNCTIONS["WITHDRAW"] = "withdraw";
    FUNCTIONS["GETPOOL"] = "getPool";
})(FUNCTIONS || (FUNCTIONS = {}));
class MarginIssueManager extends index_1.VerifiedContract {
    constructor(signer, contractNetworkAddress) {
        const address = contractNetworkAddress;
        super(address, JSON.stringify(MarginIssueManager_json_1.abi), signer);
        this.contractAddress = address;
    }
    async issueProduct(security, securityType, currency, cficode, securityAmount, minOrderSize, currencyAmount, margin, collateral, tradeFee, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, security);
        await this.validateInput(index_1.DATATYPES.STRING, securityType);
        await this.validateInput(index_1.DATATYPES.ADDRESS, currency);
        await this.validateInput(index_1.DATATYPES.STRING, cficode);
        await this.validateInput(index_1.DATATYPES.NUMBER, securityAmount);
        await this.validateInput(index_1.DATATYPES.NUMBER, minOrderSize);
        await this.validateInput(index_1.DATATYPES.NUMBER, currencyAmount);
        await this.validateInput(index_1.DATATYPES.NUMBER, margin);
        await this.validateInput(index_1.DATATYPES.NUMBER, collateral);
        await this.validateInput(index_1.DATATYPES.NUMBER, tradeFee);
        return this.callContract(FUNCTIONS.ISSUEPRODUCT, security, this.sanitiseInput(index_1.DATATYPES.BYTE32, securityType), currency, this.sanitiseInput(index_1.DATATYPES.BYTE32, cficode), securityAmount, minOrderSize, currencyAmount, margin, collateral, tradeFee, options);
    }
    async close(security, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, security);
        return this.callContract(FUNCTIONS.CLOSE, security, options);
    }
    async offerCollateral(currency, amount, security, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, currency);
        await this.validateInput(index_1.DATATYPES.NUMBER, amount);
        await this.validateInput(index_1.DATATYPES.ADDRESS, security);
        return this.callContract(FUNCTIONS.OFFERCOLLATERAL, currency, amount, security, options);
    }
    async sendCollateral(currency, amount, security, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, currency);
        await this.validateInput(index_1.DATATYPES.NUMBER, amount);
        await this.validateInput(index_1.DATATYPES.ADDRESS, security);
        return this.callContract(FUNCTIONS.SENDCOLLATERAL, currency, amount, security, options);
    }
    async getCollateral(poolId, currency, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, currency);
        await this.validateInput(index_1.DATATYPES.STRING, poolId);
        return this.callContract(FUNCTIONS.GETCOLLATERAL, this.sanitiseInput(index_1.DATATYPES.BYTE32, poolId), currency, options);
    }
    async getUserCollateral(party, currency, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, currency);
        await this.validateInput(index_1.DATATYPES.ADDRESS, party);
        return this.callContract(FUNCTIONS.GETUSERCOLLATERAL, party, currency, options);
    }
    async getPool(poolId, options) {
        await this.validateInput(index_1.DATATYPES.STRING, poolId);
        return this.callContract(FUNCTIONS.GETCOLLATERAL, this.sanitiseInput(index_1.DATATYPES.BYTE32, poolId), options);
    }
    async onMatch(party, counterparty, orderRef, security, securityTraded, currency, cashTraded, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, party);
        await this.validateInput(index_1.DATATYPES.ADDRESS, counterparty);
        //await this.validateInput(DATATYPES.STRING, orderRef);
        await this.validateInput(index_1.DATATYPES.ADDRESS, security);
        await this.validateInput(index_1.DATATYPES.NUMBER, securityTraded);
        await this.validateInput(index_1.DATATYPES.ADDRESS, currency);
        await this.validateInput(index_1.DATATYPES.NUMBER, cashTraded);
        return this.callContract(FUNCTIONS.ONMATCH, party, counterparty, orderRef, security, securityTraded, currency, cashTraded, options);
    }
    async onTrade(ref, cref, security, securityTraded, currency, currencyTraded, executionTime, options) {
        //await this.validateInput(DATATYPES.STRING, ref);
        //await this.validateInput(DATATYPES.STRING, cref);
        await this.validateInput(index_1.DATATYPES.ADDRESS, security);
        await this.validateInput(index_1.DATATYPES.NUMBER, securityTraded);
        await this.validateInput(index_1.DATATYPES.ADDRESS, currency);
        await this.validateInput(index_1.DATATYPES.NUMBER, currencyTraded);
        await this.validateInput(index_1.DATATYPES.NUMBER, executionTime);
        return this.callContract(FUNCTIONS.ONTRADE, ref, cref, security, securityTraded, currency, currencyTraded, executionTime, options);
    }
    /*public async onSettle(
        security: string,
        currency: string,
        financingPerSec:string,
        charge: string,
        dividendPerSec:string,
        payout: string,
        settlementTime:string,
        options?: { gasPrice, gasLimit }): any {
        await this.validateInput(DATATYPES.ADDRESS, security);
        await this.validateInput(DATATYPES.ADDRESS, currency);
        await this.validateInput(DATATYPES.NUMBER, financingPerSec);
        await this.validateInput(DATATYPES.BOOLEAN, charge);
        await this.validateInput(DATATYPES.NUMBER, dividendPerSec);
        await this.validateInput(DATATYPES.BOOLEAN, payout);
        await this.validateInput(DATATYPES.NUMBER, settlementTime);
        return this.callContract(FUNCTIONS.ONSETTLE, security, currency, financingPerSec, charge, dividendPerSec, payout, settlementTime, options);
    }*/
    async onSettle(security, currency, financingBid, financingOffer, dividendBid, dividendOffer, swapLong, swapShort, settlementTime, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, security);
        await this.validateInput(index_1.DATATYPES.ADDRESS, currency);
        await this.validateInput(index_1.DATATYPES.NUMBER, financingBid);
        await this.validateInput(index_1.DATATYPES.NUMBER, financingOffer);
        await this.validateInput(index_1.DATATYPES.NUMBER, dividendBid);
        await this.validateInput(index_1.DATATYPES.NUMBER, dividendOffer);
        await this.validateInput(index_1.DATATYPES.NUMBER, swapLong);
        await this.validateInput(index_1.DATATYPES.NUMBER, swapShort);
        await this.validateInput(index_1.DATATYPES.NUMBER, settlementTime);
        return this.callContract(FUNCTIONS.ONSETTLE, security, currency, financingBid, financingOffer, dividendBid, dividendOffer, swapLong, swapShort, settlementTime, options);
    }
    async withdraw(security, currency, amount, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, security);
        await this.validateInput(index_1.DATATYPES.ADDRESS, currency);
        await this.validateInput(index_1.DATATYPES.NUMBER, amount);
        return this.callContract(FUNCTIONS.WITHDRAW, security, currency, amount, options);
    }
}
exports.default = MarginIssueManager;
