"use strict";
// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
const SecuritiesFactory_json_1 = require("../../../abi/securities/SecuritiesFactory.json");
var FUNCTIONS;
(function (FUNCTIONS) {
    FUNCTIONS["GETISSUES"] = "getIssues";
    FUNCTIONS["SETSIGNER"] = "setSigner";
    FUNCTIONS["ADDBALANCE"] = "addBalance";
    FUNCTIONS["ISSUESECURITY"] = "issueSecurity";
    FUNCTIONS["SECURITIESADDED"] = "securitiesAdded";
    FUNCTIONS["GETSECURITYTOKEN"] = "getSecurityToken";
    FUNCTIONS["GETHOLDER"] = "getHolder";
    FUNCTIONS["GETSECURITY"] = "getSecurity";
    FUNCTIONS["SETCUSTODIAN"] = "setCustodian";
    FUNCTIONS["GETCUSTODIAN"] = "getCustodian";
})(FUNCTIONS || (FUNCTIONS = {}));
class SecuritiesFactory extends index_1.VerifiedContract {
    constructor(signer, contractNetworkAddress) {
        const address = contractNetworkAddress;
        //const chainId: string = Object.keys(networks)
        //const address = networks[chainId].address
        super(address, JSON.stringify(SecuritiesFactory_json_1.abi), signer);
        this.contractAddress = address;
    }
    /**
        Sets signer to verify bridge
        @param  _signer  address of signer that can only be set by owner of bridge
     */
    async setSigner(_signer, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _signer);
        return this.callContract(FUNCTIONS.SETSIGNER, _signer, options);
    }
    /**
     * Get issued security token addresses
     * @param
     * @returns returns array of addresses
     */
    async getIssues() {
        return this.callContract(FUNCTIONS.GETISSUES);
    }
    async getHolder(_token, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _token);
        return this.callContract(FUNCTIONS.GETHOLDER, _token, options);
    }
    async getSecurity(_token, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _token);
        return this.callContract(FUNCTIONS.GETSECURITY, _token, options);
    }
    async issueSecurity(_security, _company, _isin, _currency, _issuer, _qualified, _hashedMessage, _v, _r, _s, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _security);
        await this.validateInput(index_1.DATATYPES.ADDRESS, _issuer);
        return this.callContract(FUNCTIONS.ISSUESECURITY, _security, this.sanitiseInput(index_1.DATATYPES.BYTE32, _company), this.sanitiseInput(index_1.DATATYPES.BYTE32, _isin), this.sanitiseInput(index_1.DATATYPES.BYTE32, _currency), _issuer, _qualified, _hashedMessage, _v, _r, _s, options);
    }
    async getSecurityToken(security, issuer, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, security);
        await this.validateInput(index_1.DATATYPES.ADDRESS, issuer);
        return this.callContract(FUNCTIONS.GETSECURITYTOKEN, security, issuer, options);
    }
    async addBalance(_security, _transferor, _transferee, _amount, _hashedMessage, _v, _r, _s, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _security);
        await this.validateInput(index_1.DATATYPES.ADDRESS, _transferor);
        await this.validateInput(index_1.DATATYPES.ADDRESS, _transferee);
        await this.validateInput(index_1.DATATYPES.NUMBER, _amount);
        return this.callContract(FUNCTIONS.ADDBALANCE, _security, _transferor, _transferee, _amount, _hashedMessage, _v, _r, _s, options);
    }
    notifySecuritiesAdded(callback) {
        this.getEvent(FUNCTIONS.SECURITIESADDED, callback);
    }
    async setCustodian(_securityToken, _issuer, _custodian, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _securityToken);
        await this.validateInput(index_1.DATATYPES.ADDRESS, _issuer);
        await this.validateInput(index_1.DATATYPES.ADDRESS, _custodian);
        return this.callContract(FUNCTIONS.SETCUSTODIAN, _securityToken, _issuer, _custodian, options);
    }
    async getCustodian(_securityToken, _issuer, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _securityToken);
        await this.validateInput(index_1.DATATYPES.ADDRESS, _issuer);
        return this.callContract(FUNCTIONS.GETCUSTODIAN, _securityToken, _issuer, options);
    }
}
exports.default = SecuritiesFactory;
