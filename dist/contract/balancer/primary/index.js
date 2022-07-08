"use strict";
// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
const PrimaryIssueManager_json_1 = require("../../../abi/assetmanager/PrimaryIssueManager.json");
var FUNCTIONS;
(function (FUNCTIONS) {
    FUNCTIONS["OFFER"] = "offer";
    FUNCTIONS["GETOFFERED"] = "getOffered";
    FUNCTIONS["GETOFFERMADE"] = "getOfferMade";
    FUNCTIONS["GETALLOTTEDSTAKE"] = "getAllotedStake";
    FUNCTIONS["GETLIQUIDITYPROVIDERS"] = "getLiquidityProviders";
    FUNCTIONS["ISSUE"] = "issue";
    FUNCTIONS["GETSUBSCRIBERS"] = "getSubscribers";
    FUNCTIONS["CLOSE"] = "close";
    FUNCTIONS["ACCEPT"] = "accept";
    FUNCTIONS["REJECT"] = "reject";
    FUNCTIONS["SETTLE"] = "settle";
})(FUNCTIONS || (FUNCTIONS = {}));
class BalancerPrimaryIssueManager extends index_1.VerifiedContract {
    constructor(signer, platformAddress) {
        const address = platformAddress;
        super(address, JSON.stringify(PrimaryIssueManager_json_1.abi), signer);
        this.contractAddress = address;
    }
    async offer(owned, isin, offered, tomatch, desired, min, issuer, 
    //_hashedMessage: string,
    //_v: string,
    //_r: string,
    //_s: string,
    options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, owned);
        await this.validateInput(index_1.DATATYPES.ADDRESS, tomatch);
        await this.validateInput(index_1.DATATYPES.ADDRESS, issuer);
        await this.validateInput(index_1.DATATYPES.STRING, isin);
        await this.validateInput(index_1.DATATYPES.NUMBER, offered);
        await this.validateInput(index_1.DATATYPES.NUMBER, desired);
        await this.validateInput(index_1.DATATYPES.NUMBER, min);
        return this.callContract(FUNCTIONS.OFFER, owned, this.sanitiseInput(index_1.DATATYPES.BYTE32, isin), offered, tomatch, desired, min, issuer, 
        /*_hashedMessage, _v, _r, _s,*/ options);
    }
    /**
     * Gets security tokens offered for passed token parameter
     * @param offered   address of liquidity token offered by asset manager
     * @param options
     * @returns         array of structs of security tokens matching with offered liquidity token
     */
    async getOffered(offered, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, offered);
        return this.callContract(FUNCTIONS.GETOFFERED, offered, options);
    }
    /**
     * Gets offer made previously with offered token and token to match
     * @param offered address of offered token
     * @param tomatch address of token to match
     * @param options
     * @returns       token struct
     */
    async getOfferMade(offered, tomatch, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, offered);
        await this.validateInput(index_1.DATATYPES.ADDRESS, tomatch);
        return this.callContract(FUNCTIONS.GETOFFERMADE, offered, tomatch, options);
    }
    /**
     * Gets allotted liquidity stake for caller (asset manager) that is available to invest
     * @param options
     * @returns         amount of available liquidity for caller (asset manager)
     */
    async getAllotedStake() {
        return this.callContract(FUNCTIONS.GETALLOTTEDSTAKE);
    }
    /**
     * Gets liquidity providers for a security token offering
     * @param security  address of security token
     * @param options
     * @returns         array of structs of liquidity providers
     */
    async getLiquidityProviders(security, 
    //_hashedMessage: string,
    //_v: string,
    //_r: string,
    //_s: string,
    options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, security);
        return this.callContract(FUNCTIONS.GETLIQUIDITYPROVIDERS, security, 
        //_hashedMessage, _v, _r, _s, 
        options);
    }
    async issue(security, cutoffTime, issuer, _hashedMessage, _v, _r, _s, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, security);
        await this.validateInput(index_1.DATATYPES.ADDRESS, issuer);
        await this.validateInput(index_1.DATATYPES.NUMBER, cutoffTime);
        return this.callContract(FUNCTIONS.ISSUE, security, cutoffTime, issuer, _hashedMessage, _v, _r, _s, options);
    }
    async getSubscribers(poolId, _hashedMessage, _v, _r, _s, options) {
        await this.validateInput(index_1.DATATYPES.STRING, poolId);
        return this.callContract(FUNCTIONS.GETSUBSCRIBERS, this.sanitiseInput(index_1.DATATYPES.BYTE32, poolId), _hashedMessage, _v, _r, _s, options);
    }
    async close(security, _hashedMessage, _v, _r, _s, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, security);
        return this.callContract(FUNCTIONS.CLOSE, security, _hashedMessage, _v, _r, _s, options);
    }
    async accept(poolid, investor, amnt, asset, _hashedMessage, _v, _r, _s, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, investor);
        await this.validateInput(index_1.DATATYPES.ADDRESS, asset);
        await this.validateInput(index_1.DATATYPES.NUMBER, amnt);
        await this.validateInput(index_1.DATATYPES.STRING, poolid);
        return this.callContract(FUNCTIONS.ACCEPT, this.sanitiseInput(index_1.DATATYPES.BYTE32, poolId), investor, amnt, asset, _hashedMessage, _v, _r, _s, options);
    }
    async reject(poolid, investor, _hashedMessage, _v, _r, _s, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, investor);
        await this.validateInput(index_1.DATATYPES.STRING, poolid);
        return this.callContract(FUNCTIONS.REJECT, this.sanitiseInput(index_1.DATATYPES.BYTE32, poolId), investor, _hashedMessage, _v, _r, _s, options);
    }
    async settle(poolId, _hashedMessage, _v, _r, _s, options) {
        await this.validateInput(index_1.DATATYPES.STRING, poolId);
        return this.callContract(FUNCTIONS.SETTLE, this.sanitiseInput(index_1.DATATYPES.BYTE32, poolId), _hashedMessage, _v, _r, _s, options);
    }
}
exports.default = BalancerPrimaryIssueManager;
