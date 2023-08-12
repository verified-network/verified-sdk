"use strict";
// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const Factory_json_1 = require("../../abi/payments/Factory.json");
var FUNCTIONS;
(function (FUNCTIONS) {
    FUNCTIONS["GETTOKENCOUNT"] = "getTokenCount";
    FUNCTIONS["GETTOKEN"] = "getToken";
    FUNCTIONS["GETNAMEANDTYPE"] = "getNameAndType";
    FUNCTIONS["GETTOKENBYNAMETYPE"] = "getTokenByNameType";
    FUNCTIONS["GETISSUER"] = "getIssuer";
    FUNCTIONS["GETADDRESSTYPE"] = "getAddressAndType";
    FUNCTIONS["GETORACLEURL"] = "getViaOracleUrl";
    FUNCTIONS["GETPAYOUTURL"] = "getFiatPayoutUrl";
    FUNCTIONS["GETORACLES"] = "getOracles";
    FUNCTIONS["SETORACLEURL"] = "setViaOracleUrl";
    FUNCTIONS["SETPAYOUTURL"] = "setFiatPayoutUrl";
    FUNCTIONS["SETCRYPTODATAURL"] = "setCryptoDataURL";
    FUNCTIONS["SETORACLES"] = "setOracles";
    FUNCTIONS["SUPPORTTOKENS"] = "supportTokens";
    FUNCTIONS["TOKENCREATED"] = "TokenCreated";
    FUNCTIONS["SETBONDTERM"] = "setBondTerm";
    FUNCTIONS["GETBONDTERM"] = "getBondTerm";
})(FUNCTIONS || (FUNCTIONS = {}));
class Factory extends index_1.VerifiedContract {
    constructor(signer, contractNetworkAddress) {
        const address = contractNetworkAddress;
        super(address, JSON.stringify(Factory_json_1.abi), signer);
        this.contractAddress = address;
    }
    /**
     * Get number of tokens [callable by client]
     * @param
     * @returns returns number of tokens
     */
    async getTokenCount() {
        return this.callContract(FUNCTIONS.GETTOKENCOUNT);
    }
    async getOracles() {
        return this.callContract(FUNCTIONS.GETORACLES);
    }
    /**
    * Get address of token by index [callable by client].
    * @param (uint256 n)
    * @returns boolean
    */
    async getToken(_n, options) {
        await this.validateInput(index_1.DATATYPES.NUMBER, _n);
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
    /*
        Watches and notifies event (TokenCreated) that is emitted when the factory creates a bond token.
    */
    notifyTokenCreated(callback) {
        this.getEvent(FUNCTIONS.TOKENCREATED, callback);
    }
    async getTokenByNameType(tokenName, tokenType, options) {
        await this.validateInput(index_1.DATATYPES.STRING, tokenName);
        await this.validateInput(index_1.DATATYPES.STRING, tokenType);
        return this.callContract(FUNCTIONS.GETTOKENBYNAMETYPE, this.sanitiseInput(index_1.DATATYPES.BYTE32, tokenName), this.sanitiseInput(index_1.DATATYPES.BYTE32, tokenType), options);
    }
    async getIssuer(tokenName, tokenType, options) {
        await this.validateInput(index_1.DATATYPES.STRING, tokenName);
        await this.validateInput(index_1.DATATYPES.STRING, tokenType);
        return this.callContract(FUNCTIONS.GETISSUER, this.sanitiseInput(index_1.DATATYPES.BYTE32, tokenName), this.sanitiseInput(index_1.DATATYPES.BYTE32, tokenType), options);
    }
    async getAddressAndType(tokenName, options) {
        await this.validateInput(index_1.DATATYPES.STRING, tokenName);
        return this.callContract(FUNCTIONS.GETADDRESSTYPE, this.sanitiseInput(index_1.DATATYPES.BYTE32, tokenName), options);
    }
    async setViaOracleUrl(_url, options) {
        await this.validateInput(index_1.DATATYPES.STRING, _url);
        return this.callContract(FUNCTIONS.SETORACLEURL, _url, options);
    }
    async setFiatPayoutUrl(_url, options) {
        await this.validateInput(index_1.DATATYPES.STRING, _url);
        return this.callContract(FUNCTIONS.SETPAYOUTURL, _url, options);
    }
    async getViaOracleUrl(options) {
        return this.callContract(FUNCTIONS.GETORACLEURL, options);
    }
    async getFiatPayoutUrl(options) {
        return this.callContract(FUNCTIONS.GETPAYOUTURL, options);
    }
    async setCryptoDataURL(_url, _fromCurrency, _toCurrency, options) {
        await this.validateInput(index_1.DATATYPES.STRING, _url);
        await this.validateInput(index_1.DATATYPES.STRING, _fromCurrency);
        await this.validateInput(index_1.DATATYPES.STRING, _toCurrency);
        return this.callContract(FUNCTIONS.SETCRYPTODATAURL, _url, this.sanitiseInput(index_1.DATATYPES.BYTE32, _fromCurrency), this.sanitiseInput(index_1.DATATYPES.BYTE32, _toCurrency), options);
    }
    async setOracles(_oracles, options) {
        return this.callContract(FUNCTIONS.SETORACLES, _oracles, options);
    }
    async supportTokens(_currency, _address, options) {
        await this.validateInput(index_1.DATATYPES.STRING, _currency);
        await this.validateInput(index_1.DATATYPES.ADDRESS, _address);
        return this.callContract(FUNCTIONS.SUPPORTTOKENS, this.sanitiseInput(index_1.DATATYPES.BYTE32, _currency), _address, options);
    }
    async setBondTerm(bondToken, term, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, bondToken);
        await this.validateInput(index_1.DATATYPES.NUMBER, term);
        return this.callContract(FUNCTIONS.SETBONDTERM, bondToken, term, options);
    }
    async getBondTerm(bondToken, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, bondToken);
        return this.callContract(FUNCTIONS.GETBONDTERM, bondToken, options);
    }
}
exports.default = Factory;
