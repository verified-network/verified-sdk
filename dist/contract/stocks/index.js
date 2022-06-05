"use strict";
// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const Stocks_json_1 = require("../../abi/securities/Stocks.json");
var FUNCTIONS;
(function (FUNCTIONS) {
    FUNCTIONS["GETSHARE"] = "getShare";
    FUNCTIONS["STARTISSUE"] = "startIssue";
    FUNCTIONS["ASKOFFERS"] = "askOffers";
    FUNCTIONS["GETSUBSCRIBERS"] = "getSubscribers";
    FUNCTIONS["ALLOTISSUE"] = "allotIssue";
    FUNCTIONS["GETPAYMENTSTATUS"] = "getPaymentStatusFor";
    FUNCTIONS["ISALLPAIDFOR"] = "isAllPaidFor";
    FUNCTIONS["GETISSUEDATE"] = "getDateOfIssue";
    FUNCTIONS["PAYOUT"] = "payOut";
    FUNCTIONS["ISSUESHARE"] = "issueShare";
    FUNCTIONS["GETBENEFICIARIES"] = "getBeneficiaries";
})(FUNCTIONS || (FUNCTIONS = {}));
class StocksContract extends index_1.VerifiedContract {
    constructor(signer, issue) {
        const address = issue;
        super(address, JSON.stringify(Stocks_json_1.abi), signer);
        this.contractAddress = address;
    }
    async getShare() {
        return this.callContract(FUNCTIONS.GETSHARE);
    }
    async askOffers() {
        return this.callContract(FUNCTIONS.ASKOFFERS);
    }
    async getBeneficiaries() {
        return this.callContract(FUNCTIONS.GETBENEFICIARIES);
    }
    async startIssue(cutOffTime, options) {
        await this.validateInput(index_1.DATATYPES.NUMBER, cutOffTime);
        return this.callContract(FUNCTIONS.STARTISSUE, cutOffTime, options);
    }
    async getSubscribers() {
        return this.callContract(FUNCTIONS.GETSUBSCRIBERS);
    }
    async allotIssue(_allotment, _platform, _pool, _investor, _amount, _asset, options) {
        await this.validateInput(index_1.DATATYPES.STRING, _allotment);
        await this.validateInput(index_1.DATATYPES.ADDRESS, _platform);
        await this.validateInput(index_1.DATATYPES.STRING, _pool);
        await this.validateInput(index_1.DATATYPES.ADDRESS, _investor);
        await this.validateInput(index_1.DATATYPES.NUMBER, _amount);
        await this.validateInput(index_1.DATATYPES.ADDRESS, _asset);
        return this.callContract(FUNCTIONS.ALLOTISSUE, this.sanitiseInput(index_1.DATATYPES.BYTE32, _allotment), _platform, this.sanitiseInput(index_1.DATATYPES.BYTE32, _pool), _investor, _amount, _asset, options);
    }
    async getPaymentStatusFor(_beneficiary, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _beneficiary);
        return this.callContract(FUNCTIONS.GETPAYMENTSTATUS, _beneficiary, options);
    }
    async isAllPaidFor(_byTime, options) {
        await this.validateInput(index_1.DATATYPES.NUMBER, _byTime);
        return this.callContract(FUNCTIONS.ISALLPAIDFOR, _byTime, options);
    }
    async getDateOfIssue() {
        return this.callContract(FUNCTIONS.GETISSUEDATE);
    }
    async payOut(_beneficiary, _currency, _amount, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _beneficiary);
        await this.validateInput(index_1.DATATYPES.STRING, _currency);
        await this.validateInput(index_1.DATATYPES.NUMBER, _amount);
        return this.callContract(FUNCTIONS.PAYOUT, _beneficiary, this.sanitiseInput(index_1.DATATYPES.BYTE32, _currency), _amount, options);
    }
    async issueShare(_issueSize, _offerPrice, _minAskPrice, _minSubscription, _currency, _offerType, _isin, _offeringDocuments, options) {
        await this.validateInput(index_1.DATATYPES.NUMBER, _issueSize);
        await this.validateInput(index_1.DATATYPES.NUMBER, _offerPrice);
        await this.validateInput(index_1.DATATYPES.NUMBER, _minAskPrice);
        await this.validateInput(index_1.DATATYPES.NUMBER, _minSubscription);
        await this.validateInput(index_1.DATATYPES.STRING, _currency);
        await this.validateInput(index_1.DATATYPES.STRING, _offerType);
        await this.validateInput(index_1.DATATYPES.STRING, _offeringDocuments);
        await this.validateInput(index_1.DATATYPES.STRING, _isin);
        return this.callContract(FUNCTIONS.ISSUESHARE, _issueSize, _offerPrice, _minAskPrice, _minSubscription, this.sanitiseInput(index_1.DATATYPES.BYTE32, _currency), this.sanitiseInput(index_1.DATATYPES.BYTE32, _offerType), this.sanitiseInput(index_1.DATATYPES.BYTE32, _isin), _offeringDocuments, options);
    }
}
exports.default = StocksContract;
