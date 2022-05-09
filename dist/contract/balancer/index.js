"use strict";
// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const BalancerManager_json_1 = require("../../abi/balancer/BalancerManager.json");
var FUNCTIONS;
(function (FUNCTIONS) {
    FUNCTIONS["OFFER"] = "offer";
    FUNCTIONS["GETOFFERED"] = "getOffered";
    FUNCTIONS["GETALLOTTEDSTAKE"] = "getAllotedStake";
})(FUNCTIONS || (FUNCTIONS = {}));
class BalancerManager extends index_1.VerifiedContract {
    constructor(signer) {
        const chainId = signer.provider._network.chainId.toString();
        const address = BalancerManager_json_1.networks[chainId].address;
        super(address, JSON.stringify(BalancerManager_json_1.abi), signer);
        this.contractAddress = address;
    }
    async offer(owned, isin, offered, tomatch, desired, min, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, owned);
        await this.validateInput(index_1.DATATYPES.ADDRESS, tomatch);
        await this.validateInput(index_1.DATATYPES.STRING, isin);
        await this.validateInput(index_1.DATATYPES.NUMBER, offered);
        await this.validateInput(index_1.DATATYPES.NUMBER, desired);
        await this.validateInput(index_1.DATATYPES.NUMBER, min);
        return this.callContract(FUNCTIONS.OFFER, owned, this.sanitiseInput(index_1.DATATYPES.BYTE32, isin), offered, tomatch, desired, min, options);
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
     * Gets allotted liquidity stake for caller (asset manager) that is available to invest
     * @param options
     * @returns         amount of available liquidity for caller (asset manager)
     */
    async getAllotedStake(options) {
        return this.callContract(FUNCTIONS.GETALLOTTEDSTAKE, options);
    }
}
exports.default = BalancerManager;
