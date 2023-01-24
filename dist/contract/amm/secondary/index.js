"use strict";
// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
const SecondaryIssueManager_json_1 = require("../../../abi/assetmanager/balancer/SecondaryIssueManager.json");
var FUNCTIONS;
(function (FUNCTIONS) {
    FUNCTIONS["ISSUESECONDARY"] = "issueSecondary";
    FUNCTIONS["GETSETTLEMENTREQUESTS"] = "getSettlementRequests";
    FUNCTIONS["GETSETTLEMENTREQUEST"] = "getSettlementRequest";
    FUNCTIONS["SETSETTLEMENTSTATUS"] = "setSettlementStatus";
})(FUNCTIONS || (FUNCTIONS = {}));
class SecondaryIssueManager extends index_1.VerifiedContract {
    constructor(signer) {
        const chainId = Object.keys(SecondaryIssueManager_json_1.networks);
        const address = SecondaryIssueManager_json_1.networks[chainId].address;
        super(address, JSON.stringify(SecondaryIssueManager_json_1.abi), signer);
        this.contractAddress = address;
    }
    async issueSecondary(security, currency, securityAmount, minOrderSize, currencyAmount, _hashedMessage, _v, _r, _s, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, security);
        await this.validateInput(index_1.DATATYPES.ADDRESS, currency);
        await this.validateInput(index_1.DATATYPES.NUMBER, securityAmount);
        await this.validateInput(index_1.DATATYPES.NUMBER, minOrderSize);
        await this.validateInput(index_1.DATATYPES.NUMBER, currencyAmount);
        return this.callContract(FUNCTIONS.ISSUESECONDARY, security, currency, securityAmount, minOrderSize, currencyAmount, _hashedMessage, _v, _r, _s, options);
    }
    async getSettlementRequests(dpid, poolid, options) {
        await this.validateInput(index_1.DATATYPES.STRING, dpid);
        await this.validateInput(index_1.DATATYPES.STRING, poolid);
        return this.callContract(FUNCTIONS.GETSETTLEMENTREQUESTS, this.sanitiseInput(index_1.DATATYPES.BYTE32, dpid), this.sanitiseInput(index_1.DATATYPES.BYTE32, poolid), options);
    }
    async getSettlementRequest(ref, options) {
        await this.validateInput(index_1.DATATYPES.STRING, ref);
        return this.callContract(FUNCTIONS.GETSETTLEMENTREQUEST, this.sanitiseInput(index_1.DATATYPES.BYTE32, ref), options);
    }
    async setSettlementStatus(ref, status, options) {
        await this.validateInput(index_1.DATATYPES.STRING, ref);
        await this.validateInput(index_1.DATATYPES.STRING, status);
        return this.callContract(FUNCTIONS.SETSETTLEMENTSTATUS, this.sanitiseInput(index_1.DATATYPES.BYTE32, ref), this.sanitiseInput(index_1.DATATYPES.BYTE32, status), options);
    }
}
exports.default = SecondaryIssueManager;
