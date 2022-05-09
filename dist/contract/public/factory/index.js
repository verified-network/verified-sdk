"use strict";
// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
const L1Factory_json_1 = require("../../../abi/deposits/L1Factory.json");
var FUNCTIONS;
(function (FUNCTIONS) {
    FUNCTIONS["GETNAME"] = "getName";
    FUNCTIONS["GETTYPE"] = "getType";
    FUNCTIONS["GETTOKENBYNAMETYPE"] = "getTokenByNameType";
    FUNCTIONS["GETISSUER"] = "getIssuer";
})(FUNCTIONS || (FUNCTIONS = {}));
class VerifiedFactory extends index_1.VerifiedContract {
    constructor(signer) {
        const chainId = signer.provider._network.chainId.toString();
        const address = L1Factory_json_1.networks[chainId].address;
        super(address, JSON.stringify(L1Factory_json_1.abi), signer);
        this.contractAddress = address;
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
}
exports.default = VerifiedFactory;
