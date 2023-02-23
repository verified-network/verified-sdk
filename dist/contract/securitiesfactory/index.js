"use strict";
// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
const Factory_json_1 = require("../../../abi/securities/Factory.json");
var FUNCTIONS;
(function (FUNCTIONS) {
    FUNCTIONS["GETNAME"] = "getName";
    FUNCTIONS["GETTYPE"] = "getType";
    FUNCTIONS["GETTOKENBYNAMETYPE"] = "getTokenByNameType";
    FUNCTIONS["GETISSUER"] = "getIssuer";
    FUNCTIONS["GETISSUES"] = "getIssues";
    FUNCTIONS["GETTOKENCOUNT"] = "getTokenCount";
    FUNCTIONS["GETTOKEN"] = "getToken";
    FUNCTIONS["GETNAMEANDTYPE"] = "getNameAndType";
    FUNCTIONS["SETSIGNER"] = "setSigner";
    FUNCTIONS["ADDBALANCE"] = "addBalance";
    FUNCTIONS["ISSUESECURITY"] = "issueSecurity";
    FUNCTIONS["SECURITIESADDED"] = "securitiesAdded";
    FUNCTIONS["GETSECURITYTOKEN"] = "getSecurityToken";
    FUNCTIONS["GETHOLDER"] = "getHolder";
    FUNCTIONS["GETSECURITY"] = "getSecurity";
})(FUNCTIONS || (FUNCTIONS = {}));
class SecuritiesFactory extends index_1.VerifiedContract {
    constructor(signer) {
        const chainId = Object.keys(Factory_json_1.networks);
        const address = Factory_json_1.networks[chainId].address;
        super(address, JSON.stringify(Factory_json_1.abi), signer);
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
     * Get number of tokens [callable by client]
     * @param
     * @returns returns number of tokens
     */
    async getTokenCount() {
        return this.callContract(FUNCTIONS.GETTOKENCOUNT);
    }
    /**
    * Get address of token by index [callable by client].
    * @param (uint256 n)
    * @returns boolean
    */
    async getToken(_n, options) {
        //await this.validateInput(DATATYPES.NUMBER, _n)
        return this.callContract(FUNCTIONS.GETTOKEN, _n, options);
    }
    /**
    * Get name and type of token by its address callable by client
    * @param (address _viaAddress)
    * @returns boolean
    * returns name and type of token by its address passed as parameter.
    */
    async getNameAndType(_viaAddress, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _viaAddress);
        return this.callContract(FUNCTIONS.GETNAMEANDTYPE, _viaAddress, options);
    }
    /**
     * Get name of token
     * @param   _token  address of token for which name is required
     * @returns         returns name of token
     */
    async getName(_token, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _token);
        return this.callContract(FUNCTIONS.GETNAME, _token, options);
    }
    /**
     * Get type of token
     * @param   _token  address of token for which type is required
     * @returns         returns name of token
     */
    async getType(_token, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _token);
        return this.callContract(FUNCTIONS.GETTYPE, _token, options);
    }
    /**
     * Get name and type of token
     * @param   _tokenName  string name of token
     * @param   _tokenType  string type of token
     * @returns             returns address of token
     */
    async getTokenByNameType(tokenName, tokenType, options) {
        await this.validateInput(index_1.DATATYPES.STRING, tokenName);
        await this.validateInput(index_1.DATATYPES.STRING, tokenType);
        return this.callContract(FUNCTIONS.GETTOKENBYNAMETYPE, this.sanitiseInput(index_1.DATATYPES.BYTE32, tokenName), this.sanitiseInput(index_1.DATATYPES.BYTE32, tokenType), options);
    }
    /**
     * Get name and type of token issuer
     * @param   _tokenName  string name of token
     * @param   _tokenType  string type of token
     * @returns             returns address of token issuer
     */
    async getIssuer(tokenName, tokenType, options) {
        await this.validateInput(index_1.DATATYPES.STRING, tokenName);
        await this.validateInput(index_1.DATATYPES.STRING, tokenType);
        return this.callContract(FUNCTIONS.GETISSUER, this.sanitiseInput(index_1.DATATYPES.BYTE32, tokenType), this.sanitiseInput(index_1.DATATYPES.BYTE32, tokenName), options);
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
    async issueSecurity(_security, _company, _isin, _currency, _issuer, _hashedMessage, _v, _r, _s, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _security);
        await this.validateInput(index_1.DATATYPES.ADDRESS, _issuer);
        return this.callContract(FUNCTIONS.ISSUESECURITY, _security, this.sanitiseInput(index_1.DATATYPES.BYTE32, _company), this.sanitiseInput(index_1.DATATYPES.BYTE32, _isin), this.sanitiseInput(index_1.DATATYPES.BYTE32, _currency), _issuer, _hashedMessage, _v, _r, _s, options);
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
}
exports.default = SecuritiesFactory;
