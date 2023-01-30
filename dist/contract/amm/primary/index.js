"use strict";
// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
const PrimaryIssueManager_json_1 = require("../../../abi/assetmanager/balancer/PrimaryIssueManager.json");
const PrimaryIssueManager_json_2 = require("../../../abi/assetmanager/kyber/PrimaryIssueManager.json");
var FUNCTIONS;
(function (FUNCTIONS) {
    FUNCTIONS["OFFER"] = "offer";
    FUNCTIONS["OFFERTERMS"] = "setOfferTerms";
    FUNCTIONS["GETOFFERED"] = "getOffered";
    FUNCTIONS["GETOFFERMADE"] = "getOfferMade";
    FUNCTIONS["GETALLOTTEDSTAKE"] = "getAllotedStake";
    FUNCTIONS["GETLIQUIDITYPROVIDERS"] = "getLiquidityProviders";
    FUNCTIONS["ISSUE"] = "issue";
    FUNCTIONS["ONSUBSCRIPTION"] = "onSubscription";
    FUNCTIONS["SUBSCRIBE"] = "subscribe";
    FUNCTIONS["GETSUBSCRIBERS"] = "getSubscribers";
    FUNCTIONS["CLOSE"] = "close";
    FUNCTIONS["ACCEPT"] = "accept";
    FUNCTIONS["REJECT"] = "reject";
    FUNCTIONS["SETTLE"] = "settle";
})(FUNCTIONS || (FUNCTIONS = {}));
class PrimaryIssueManager extends index_1.VerifiedContract {
    constructor(signer, platformAddress, platform) {
        const address = platformAddress;
        if (platform == "balancer")
            super(address, JSON.stringify(PrimaryIssueManager_json_1.abi), signer);
        else if (platform == "kyber")
            super(address, JSON.stringify(PrimaryIssueManager_json_2.abi), signer);
        this.contractAddress = address;
    }
    async offer(owned, isin, offered, tomatch, desired, min, issuer, docs, 
    // _hashedMessage: string,
    // _v: string,
    // _r: string,
    // _s: string,
    options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, owned);
        await this.validateInput(index_1.DATATYPES.ADDRESS, tomatch);
        await this.validateInput(index_1.DATATYPES.ADDRESS, issuer);
        await this.validateInput(index_1.DATATYPES.STRING, isin);
        await this.validateInput(index_1.DATATYPES.STRING, docs);
        await this.validateInput(index_1.DATATYPES.NUMBER, offered);
        await this.validateInput(index_1.DATATYPES.NUMBER, desired);
        await this.validateInput(index_1.DATATYPES.NUMBER, min);
        return this.callContract(FUNCTIONS.OFFER, owned, this.sanitiseInput(index_1.DATATYPES.BYTE32, isin), offered, tomatch, desired, min, issuer, docs, 
        /*_hashedMessage, _v, _r, _s,*/ options);
    }
    /**
     * Lets issuer or manager set minimum order size for issue
     * @param owner         address of issuer
     * @param offered       address of security issued
     * @param tomatch       address of currency paired
     * @param ordersize     minimum order value
     * @param options
     * @returns
     */
    async setOfferTerms(owner, offered, tomatch, ordersize, _hashedMessage, _v, _r, _s, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, owner);
        await this.validateInput(index_1.DATATYPES.ADDRESS, offered);
        await this.validateInput(index_1.DATATYPES.ADDRESS, tomatch);
        await this.validateInput(index_1.DATATYPES.NUMBER, ordersize);
        return this.callContract(FUNCTIONS.OFFERTERMS, owner, offered, tomatch, ordersize, _hashedMessage, _v, _r, _s, options);
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
    async getAllotedStake(offered, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, offered);
        return this.callContract(FUNCTIONS.GETALLOTTEDSTAKE, offered, options);
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
    async onSubscription(pool, _hashedMessage, _v, _r, _s, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, pool);
        return this.callContract(FUNCTIONS.ONSUBSCRIPTION, pool, _hashedMessage, _v, _r, _s, options);
    }
    async subscribe(security, asset, assetName, amount, investor, price, paidIn, _hashedMessage, _v, _r, _s, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, security);
        await this.validateInput(index_1.DATATYPES.ADDRESS, asset);
        await this.validateInput(index_1.DATATYPES.STRING, assetName);
        await this.validateInput(index_1.DATATYPES.ADDRESS, investor);
        await this.validateInput(index_1.DATATYPES.NUMBER, amount);
        await this.validateInput(index_1.DATATYPES.NUMBER, price);
        await this.validateInput(index_1.DATATYPES.STRING, paidIn);
        return this.callContract(FUNCTIONS.SUBSCRIBE, security, asset, assetName, amount, investor, price, paidIn, _hashedMessage, _v, _r, _s, options);
    }
    async getSubscribers(poolId, _hashedMessage, _v, _r, _s, options) {
        await this.validateInput(index_1.DATATYPES.STRING, poolId);
        return this.callContract(FUNCTIONS.GETSUBSCRIBERS, poolId, _hashedMessage, _v, _r, _s, options);
    }
    async close(security, redeem, _hashedMessage, _v, _r, _s, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, security);
        return this.callContract(FUNCTIONS.CLOSE, security, redeem, _hashedMessage, _v, _r, _s, options);
    }
    async accept(poolid, investor, amnt, asset, _hashedMessage, _v, _r, _s, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, investor);
        await this.validateInput(index_1.DATATYPES.ADDRESS, asset);
        await this.validateInput(index_1.DATATYPES.NUMBER, amnt);
        await this.validateInput(index_1.DATATYPES.STRING, poolid);
        return this.callContract(FUNCTIONS.ACCEPT, poolid, investor, amnt, asset, _hashedMessage, _v, _r, _s, options);
    }
    async reject(poolid, investor, _hashedMessage, _v, _r, _s, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, investor);
        await this.validateInput(index_1.DATATYPES.STRING, poolid);
        return this.callContract(FUNCTIONS.REJECT, poolid, investor, _hashedMessage, _v, _r, _s, options);
    }
    async settle(poolId, _hashedMessage, _v, _r, _s, options) {
        await this.validateInput(index_1.DATATYPES.STRING, poolId);
        return this.callContract(FUNCTIONS.SETTLE, poolId, _hashedMessage, _v, _r, _s, options);
    }
}
exports.default = PrimaryIssueManager;
